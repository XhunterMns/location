const { pool } = require('../db_config/database');

function toSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || `agency-${Date.now()}`;
}

async function findAgencyByOwner(userId) {
  const [rows] = await pool.query('SELECT * FROM agencies WHERE owner_user_id = ? LIMIT 1', [userId]);
  return rows[0] || null;
}

async function findAgencyForUser(userId) {
  if (!userId) return null;

  const [userRows] = await pool.query('SELECT agency_id FROM users WHERE id = ? LIMIT 1', [userId]);
  const userAgencyId = userRows?.[0]?.agency_id ?? null;

  if (userAgencyId) {
    const agency = await findAgencyById(userAgencyId);
    if (agency) {
      return agency;
    }
  }

  const ownerAgency = await findAgencyByOwner(userId);
  if (ownerAgency) {
    return ownerAgency;
  }

  const [memberRows] = await pool.query(
    `SELECT a.*
     FROM agencies a
     INNER JOIN agency_members am ON am.agency_id = a.id
     WHERE am.user_id = ?
       AND am.status = 'active'
     ORDER BY a.id DESC
     LIMIT 1`,
    [userId]
  );

  return memberRows?.[0] || null;
}

async function findAgencyById(id) {
  const [rows] = await pool.query('SELECT * FROM agencies WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

async function findAgencyByBusinessEmail(email) {
  const [rows] = await pool.query('SELECT * FROM agencies WHERE business_email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

async function createAgency({ name, businessEmail, phone, address, city, description, logoUrl, ownerUserId }) {
  const slug = `${toSlug(name)}-${Date.now()}`;
  const [result] = await pool.query(
    `INSERT INTO agencies (name, slug, business_email, phone, address, city, description, logo_url, owner_user_id, status, subscription_plan, subscription_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'free', 'manual_review')`,
    [name, slug, businessEmail, phone || null, address || null, city || null, description || null, logoUrl || null, ownerUserId]
  );

  return { id: result.insertId };
}

async function listAgenciesForAdmin() {
  const [rows] = await pool.query(`
    SELECT a.*, u.name AS owner_name, u.email AS owner_email,
      (SELECT COUNT(*) FROM locals l WHERE l.agency_id = a.id AND l.status = 'published') AS active_listings,
      (SELECT COUNT(*) FROM agency_members am WHERE am.agency_id = a.id AND am.status = 'active') AS team_members
    FROM agencies a
    LEFT JOIN users u ON u.id = a.owner_user_id
    ORDER BY a.created_at DESC
  `);
  return rows;
}

async function updateAgencyStatus({ agencyId, status, isVerified }) {
  const [result] = await pool.query(
    'UPDATE agencies SET status = ?, is_verified = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, isVerified ?? 0, agencyId]
  );
  return { affectedRows: result.affectedRows };
}

async function getAgencyPlans() {
  const [rows] = await pool.query('SELECT * FROM agency_plans ORDER BY id ASC');
  return rows;
}

async function getPlanByKey(planKey) {
  const [rows] = await pool.query('SELECT * FROM agency_plans WHERE key_name = ? LIMIT 1', [planKey]);
  return rows[0] || null;
}

async function createAgencyPlan({ keyName, name, description, maxListings, maxTeamMembers, price, status = 'active' }) {
  const [result] = await pool.query(
    'INSERT INTO agency_plans (key_name, name, description, max_listings, max_team_members, price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [keyName, name, description, maxListings, maxTeamMembers, price, status]
  );
  return { id: result.insertId };
}

async function updateAgencyPlan(id, payload) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (!fields.length) return { affectedRows: 0 };
  values.push(id);

  const [result] = await pool.query(`UPDATE agency_plans SET ${fields.join(', ')} WHERE id = ?`, values);
  return { affectedRows: result.affectedRows };
}

async function getAgencySubscription(agencyId) {
  const [rows] = await pool.query(
    'SELECT * FROM agency_subscriptions WHERE agency_id = ? ORDER BY id DESC LIMIT 1',
    [agencyId]
  );
  return rows[0] || null;
}

async function activateAgencySubscription({ agencyId, planKey, status = 'active', expiresAt }) {
  const plan = await getPlanByKey(planKey);
  if (!plan) throw Object.assign(new Error('Plan not found'), { statusCode: 404 });

  await pool.query(
    'INSERT INTO agency_subscriptions (agency_id, plan_key, status, expires_at) VALUES (?, ?, ?, ?)',
    [agencyId, planKey, status, expiresAt || null]
  );

  await pool.query(
    'UPDATE agencies SET subscription_plan = ?, subscription_status = ?, subscription_expires_at = ? WHERE id = ?',
    [planKey, status, expiresAt || null, agencyId]
  );

  return { message: 'Subscription updated' };
}

async function createAgencyMember({ agencyId, userId, role }) {
  const [result] = await pool.query(
    'INSERT INTO agency_members (agency_id, user_id, role, status) VALUES (?, ?, ?, "active") ON DUPLICATE KEY UPDATE role = VALUES(role), status = "active"',
    [agencyId, userId, role]
  );
  return { affectedRows: result.affectedRows };
}

async function getAgencyMembers(agencyId) {
  const [rows] = await pool.query(
    `SELECT am.*, u.name, u.email FROM agency_members am LEFT JOIN users u ON u.id = am.user_id WHERE am.agency_id = ? ORDER BY am.id DESC`,
    [agencyId]
  );
  return rows;
}

async function getAgencyInquiries(agencyId) {
  const [rows] = await pool.query('SELECT * FROM agency_inquiries WHERE agency_id = ? ORDER BY id DESC', [agencyId]);
  return rows;
}

async function getPublicAgencyProfile(slug) {
  const [rows] = await pool.query(
    `SELECT a.*, 
      (SELECT COUNT(*) FROM locals l WHERE l.agency_id = a.id AND l.status = 'published') AS active_listing_count
    FROM agencies a WHERE a.slug = ? LIMIT 1`,
    [slug]
  );

  if (!rows[0]) return null;

  const agency = rows[0];
  const [properties] = await pool.query(
    'SELECT * FROM locals WHERE agency_id = ? AND status = "published" ORDER BY id DESC',
    [agency.id]
  );

  return { ...agency, properties };
}

async function addAgencyInquiry({ agencyId, senderName, senderEmail, senderPhone, message }) {
  const [result] = await pool.query(
    'INSERT INTO agency_inquiries (agency_id, sender_name, sender_email, sender_phone, message, status) VALUES (?, ?, ?, ?, ?, "new")',
    [agencyId, senderName, senderEmail, senderPhone || null, message]
  );
  return { id: result.insertId };
}

module.exports = {
  findAgencyByOwner,
  findAgencyForUser,
  findAgencyById,
  findAgencyByBusinessEmail,
  createAgency,
  listAgenciesForAdmin,
  updateAgencyStatus,
  getAgencyPlans,
  getPlanByKey,
  createAgencyPlan,
  updateAgencyPlan,
  getAgencySubscription,
  activateAgencySubscription,
  createAgencyMember,
  getAgencyMembers,
  getAgencyInquiries,
  addAgencyInquiry,
};

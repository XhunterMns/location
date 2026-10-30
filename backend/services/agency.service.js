const {
  findAgencyByOwner,
  findAgencyForUser,
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
  getAgencyInquiries,
  addAgencyInquiry,
  createAgencyMember,
  getAgencyMembers,
  findAgencyById,
  getPublicAgencyProfile,
} = require('../repositories/agency.repository');
const { findUserById, updateUserById } = require('../repositories/users.repository');
const { getActiveListingCountForAgency } = require('../repositories/properties.repository');

async function registerAgency({ userId, payload }) {
  const requiredFields = ['name', 'business_email', 'phone', 'address', 'city', 'description'];
  const missing = requiredFields.filter((field) => !String(payload?.[field] || '').trim());

  if (missing.length) {
    throw Object.assign(new Error('Missing required agency fields'), { statusCode: 400, details: missing });
  }

  const existingAgency = await findAgencyByBusinessEmail(payload.business_email.trim().toLowerCase());
  if (existingAgency) {
    throw Object.assign(new Error('Agency already registered with this business email'), { statusCode: 409 });
  }

  const owner = await findUserById(userId);
  if (!owner) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 });
  }

  const agency = await createAgency({
    name: payload.name,
    businessEmail: payload.business_email,
    phone: payload.phone,
    address: payload.address,
    city: payload.city,
    description: payload.description,
    logoUrl: payload.logo_url || null,
    ownerUserId: userId,
  });

  await createAgencyMember({ agencyId: agency.id, userId, role: 'agency_owner' });
  await updateUserById(userId, { agency_id: agency.id, agency_role: 'agency_owner' });

  return {
    id: agency.id,
    message: 'Agency registration submitted for review',
    status: 'pending',
  };
}

async function getMyAgency(userId) {
  const agency = await findAgencyForUser(userId);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }

  const listingCount = await getActiveListingCountForAgency(agency.id);
  const teamMembers = await getAgencyMembers(agency.id);
  const subscription = await getAgencySubscription(agency.id);

  return {
    ...agency,
    active_listing_count: listingCount,
    team_members: teamMembers,
    subscription,
  };
}

async function listAgenciesForReview() {
  return listAgenciesForAdmin();
}

async function updateAgencyReview({ agencyId, status }) {
  const validStatus = ['pending', 'approved', 'rejected'];
  if (!validStatus.includes(status)) {
    throw Object.assign(new Error('Invalid agency review status'), { statusCode: 400 });
  }

  const agency = await findAgencyById(agencyId);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }

  const isVerified = status === 'approved' ? 1 : 0;
  await updateAgencyStatus({ agencyId, status, isVerified });
  return { message: 'Agency status updated' };
}

async function getPlanCatalog() {
  return getAgencyPlans();
}

async function createPlan({ payload }) {
  const { key_name, name, description, max_listings, max_team_members, price, status } = payload || {};

  if (!key_name || !name) {
    throw Object.assign(new Error('Plan key and name are required'), { statusCode: 400 });
  }

  const plan = await getPlanByKey(key_name);
  if (plan) {
    throw Object.assign(new Error('Plan key already exists'), { statusCode: 409 });
  }

  const result = await createAgencyPlan({
    keyName: key_name,
    name,
    description,
    maxListings: Number(max_listings || 0),
    maxTeamMembers: Number(max_team_members || 0),
    price: Number(price || 0),
    status: status || 'active',
  });

  return { id: result.id, message: 'Plan created' };
}

async function updatePlan({ planId, payload }) {
  const result = await updateAgencyPlan(planId, payload);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Plan not found'), { statusCode: 404 });
  }

  return { message: 'Plan updated' };
}

async function activateSubscription({ agencyId, planKey, expiresAt }) {
  const agency = await findAgencyById(agencyId);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }

  const result = await activateAgencySubscription({
    agencyId,
    planKey,
    status: 'active',
    expiresAt: expiresAt || null,
  });

  return result;
}

async function getAgencyDashboard(userId) {
  const agency = await findAgencyForUser(userId);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }

  const listingCount = await getActiveListingCountForAgency(agency.id);
  const inquiries = await getAgencyInquiries(agency.id);
  const members = await getAgencyMembers(agency.id);
  const subscription = await getAgencySubscription(agency.id);

  return {
    agency,
    listing_count: listingCount,
    inquiries,
    members,
    subscription,
  };
}

async function addInquiry({ agencyId, payload }) {
  const { sender_name, sender_email, sender_phone, message } = payload || {};
  if (!sender_name || !sender_email || !message) {
    throw Object.assign(new Error('Missing inquiry fields'), { statusCode: 400 });
  }

  const agency = await findAgencyById(agencyId);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }

  return addAgencyInquiry({
    agencyId,
    senderName: sender_name,
    senderEmail: sender_email,
    senderPhone: sender_phone,
    message,
  });
}

async function getPublicAgency(slug) {
  const agency = await getPublicAgencyProfile(slug);
  if (!agency) {
    throw Object.assign(new Error('Agency not found'), { statusCode: 404 });
  }
  return agency;
}

module.exports = {
  registerAgency,
  getMyAgency,
  listAgenciesForReview,
  updateAgencyReview,
  getPlanCatalog,
  createPlan,
  updatePlan,
  activateSubscription,
  getAgencyDashboard,
  addInquiry,
  getPublicAgency,
};

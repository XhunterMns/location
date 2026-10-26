const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('../config/app.config');

const pool = mysql.createPool(DB_CONFIG);

async function ensureTable(sql, label) {
  try {
    const connection = await pool.getConnection();
    await connection.execute(sql);
    connection.release();
  } catch (error) {
    console.error(`Error creating ${label} table:`, error);
    throw error;
  }
}

async function ensureLocalsTable() {
  await ensureTable(
    `
      CREATE TABLE IF NOT EXISTS locals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(80) DEFAULT NULL,
        delegation VARCHAR(80) DEFAULT NULL,
        country VARCHAR(80) DEFAULT 'Tunisia',
        phone_number VARCHAR(20) DEFAULT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        availability TINYINT(1) DEFAULT 1,
        is_colocation TINYINT(1) DEFAULT 0,
        room_type VARCHAR(40) DEFAULT NULL,
        available_places INT DEFAULT NULL,
        gender_preference VARCHAR(40) DEFAULT NULL,
        colocation_rules TEXT DEFAULT NULL,
        user_id INT NOT NULL,
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id)
      )
    `,
    'locals'
  );
  

  const [statusRows] = await pool.query("SHOW COLUMNS FROM locals LIKE 'status'");
  if (statusRows.length === 0) {
    await pool.query("ALTER TABLE locals ADD COLUMN status VARCHAR(20) DEFAULT 'published'");
  }

  const columnChecks = [
    ['city', "ALTER TABLE locals ADD COLUMN city VARCHAR(80) DEFAULT NULL"],
    ['delegation', "ALTER TABLE locals ADD COLUMN delegation VARCHAR(80) DEFAULT NULL"],
    ['country', "ALTER TABLE locals ADD COLUMN country VARCHAR(80) DEFAULT 'Tunisia'"],
    ['phone_number', "ALTER TABLE locals ADD COLUMN phone_number VARCHAR(20) DEFAULT NULL"],
    ['is_colocation', "ALTER TABLE locals ADD COLUMN is_colocation TINYINT(1) DEFAULT 0"],
    ['room_type', "ALTER TABLE locals ADD COLUMN room_type VARCHAR(40) DEFAULT NULL"],
    ['available_places', "ALTER TABLE locals ADD COLUMN available_places INT DEFAULT NULL"],
    ['gender_preference', "ALTER TABLE locals ADD COLUMN gender_preference VARCHAR(40) DEFAULT NULL"],
    ['colocation_rules', "ALTER TABLE locals ADD COLUMN colocation_rules TEXT DEFAULT NULL"],
  ];

  for (const [columnName, alterSql] of columnChecks) {
    const [rows] = await pool.query(`SHOW COLUMNS FROM locals LIKE ?`, [columnName]);
    if (rows.length === 0) {
      await pool.query(alterSql);
    }
  }
}

async function ensureLocalImagesTable() {
  await ensureTable(
    `
      CREATE TABLE IF NOT EXISTS local_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        local_id INT NOT NULL,
        image_url LONGTEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_local_id (local_id)
      )
    `,
    'local_images'
  );
}

async function ensureReservationsTable() {
  await ensureTable(
    `
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'reserved',
        user_id INT NOT NULL,
        local_id INT NOT NULL,
        INDEX idx_reservations_local_id (local_id),
        INDEX idx_reservations_user_id (user_id)
      )
    `,
    'reservations'
  );
}

async function ensureEvaluationsTable() {
  await ensureTable(
    `
      CREATE TABLE IF NOT EXISTS evaluations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        local_id INT NOT NULL,
        renter_id INT NOT NULL,
        rating INT NOT NULL,
        comment TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_local_renter (local_id, renter_id),
        INDEX idx_evaluations_local_id (local_id),
        INDEX idx_evaluations_renter_id (renter_id)
      )
    `,
    'evaluations'
  );
}

async function ensureNotificationsTable() {
  await ensureTable(
    `
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'reservation',
        reference_id INT DEFAULT NULL,
        reference_type VARCHAR(50) DEFAULT NULL,
        is_read TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_notifications_user_id (user_id),
        INDEX idx_notifications_is_read (is_read)
      )
    `,
    'notifications'
  );
}

async function detectUserColumn(tableName, targetKey, fallback = 'renter_id') {
  const [rows] = await pool.query(
    `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME IN ('renter_id', 'user_id')
      ORDER BY FIELD(COLUMN_NAME, 'renter_id', 'user_id')
      LIMIT 1
    `,
    [tableName]
  );

  return rows?.[0]?.COLUMN_NAME || fallback;
}

async function ensureDatabaseSchema() {
  await ensureLocalsTable();
  await ensureLocalImagesTable();
  await ensureReservationsTable();
  await ensureEvaluationsTable();
  await ensureNotificationsTable();
  return { schemaReady: true };
}

module.exports = {
  pool,
  ensureDatabaseSchema,
  detectUserColumn,
};

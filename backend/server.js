const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --- MySQL pool (adjust credentials as needed) ---
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'location_db',
  waitForConnections: true,
  connectionLimit: 10,
});

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const schemaColumns = {
  evaluationsUserColumn: 'renter_id'
};

// ---------- Helpers / Middleware ----------
function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

function ensureTable(sql, label) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err) => {
      if (err) {
        console.error(`Error creating ${label} table:`, err);
        return reject(err);
      }
      resolve();
    });
  });
}

function ensureLocalsTable() {
  return ensureTable(
    `
      CREATE TABLE IF NOT EXISTS locals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        availability TINYINT(1) DEFAULT 1,
        user_id INT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id)
      )
    `,
    'locals'
  ).then(() => {
    // Also ensure status column exists if table was already there
    return new Promise((resolve) => {
      db.query("SHOW COLUMNS FROM locals LIKE 'status'", (err, rows) => {
        if (!err && rows.length === 0) {
          db.query("ALTER TABLE locals ADD COLUMN status VARCHAR(20) DEFAULT 'pending'", () => resolve());
        } else {
          resolve();
        }
      });
    });
  });
}

function ensureLocalImagesTable() {
  return ensureTable(
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

function ensureReservationsTable() {
  return ensureTable(
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

function ensureEvaluationsTable() {
  return ensureTable(
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

function sendDbError(res, err) {
  console.error(err);
  return res.status(500).json({ message: err?.sqlMessage || err?.message || 'DB error' });
}

function detectUserColumn(tableName, targetKey) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME IN ('renter_id', 'user_id')
      ORDER BY FIELD(COLUMN_NAME, 'renter_id', 'user_id')
      LIMIT 1
    `;

    db.query(sql, [tableName], (err, rows) => {
      if (err) return reject(err);
      schemaColumns[targetKey] = rows?.[0]?.COLUMN_NAME || 'renter_id';
      resolve(schemaColumns[targetKey]);
    });
  });
}

function assertLocalOwnership(localId, userId, onSuccess, onFail) {
  const sql = 'SELECT id FROM locals WHERE id = ? AND user_id = ? LIMIT 1';
  db.query(sql, [localId, userId], (err, rows) => {
    if (err) return onFail(500, { message: 'DB error', err });
    if (!rows || rows.length === 0) return onFail(404, { message: 'Local not found or not owned' });
    return onSuccess();
  });
}

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });

  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid auth format' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

function isLandlord(req, res, next) {
  const role = normalizeRole(req.user?.role);
  if (role !== 'landlord') return res.status(403).json({ message: 'Access denied' });
  next();
}

function isRenter(req, res, next) {
  const role = normalizeRole(req.user?.role);
  if (role !== 'renter') return res.status(403).json({ message: 'Access denied' });
  next();
}

function isAdmin(req, res, next) {
  const role = normalizeRole(req.user?.role);
  if (role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  next();
}

// ---------- Auth routes ----------
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const normalizedRole = normalizeRole(role);
  if (!email || !password || !normalizedRole) return res.status(400).json({ message: 'Missing fields' });
  if (!['landlord', 'renter'].includes(normalizedRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name || null, email, hashed, normalizedRole], (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error', err });
      return res.json({ message: 'User created', id: result.insertId });
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', err });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });

  const sql = 'SELECT * FROM users WHERE email = ? LIMIT 1';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', err });

    // --- EMERGENCY ADMIN AUTO-CREATION ---
    // If login is "admin/admin" and user not found, create it on the fly
    if ((!results || results.length === 0) && email === 'admin' && password === 'admin') {
      try {
        const hashed = await bcrypt.hash('admin', 10);
        const insertSql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(insertSql, ['admin', 'admin', hashed, 'admin'], (insErr, insRes) => {
          if (insErr) return res.status(500).json({ message: 'Error creating admin', insErr });
          
          // Now log them in immediately
          const token = jwt.sign({ id: insRes.insertId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
          return res.json({ token, role: 'admin' });
        });
        return; // Wait for async query
      } catch (e) {
        return res.status(500).json({ message: 'Server error during admin setup' });
      }
    }

    if (!results || results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const normalizedRole = normalizeRole(user.role);
    const token = jwt.sign({ id: user.id, role: normalizedRole }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: normalizedRole });
  });
});

// Route to setup admin user (one-time use or utility)
app.get('/setup-admin', async (req, res) => {
  const name = 'admin';
  const email = 'admin';
  const password = 'admin';
  const role = 'admin';

  try {
    const hashed = await bcrypt.hash(password, 10);
    
    // Check if exists first
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'DB error checking existence', err });
      
      if (results.length > 0) {
        // Update existing
        db.query('UPDATE users SET password = ?, role = ?, name = ? WHERE email = ?', [hashed, role, name, email], (err) => {
          if (err) return res.status(500).json({ error: 'DB error updating admin', err });
          return res.send('<h1>Admin user updated successfully!</h1><p>Email: admin<br>Password: admin</p><a href="http://localhost:4200/login">Go to Login</a>');
        });
      } else {
        // Create new
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, email, hashed, role], (err) => {
          if (err) return res.status(500).json({ error: 'DB error creating admin', err });
          return res.send('<h1>Admin user created successfully!</h1><p>Email: admin<br>Password: admin</p><a href="http://localhost:4200/login">Go to Login</a>');
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', err });
  }
});

// ---------- Locals routes (protected) ----------
// Create local
app.post('/locals', verifyToken, isLandlord, (req, res) => {
  const { title, address, description, price, availability } = req.body;
  const sql = 'INSERT INTO locals (title, address, description, price, availability, user_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, address, description, price, availability ? 1 : 1, req.user.id, 'pending'], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    return res.json({ message: 'Local created', id: result.insertId });
  });
});

// Get my locals
app.get('/locals/my', verifyToken, isLandlord, (req, res) => {
  const sql = `
    SELECT 
      l.*,
      EXISTS(SELECT 1 FROM reservations r WHERE r.local_id = l.id AND r.status = 'reserved') as is_reserved,

      -- latest image
      (
        SELECT li.image_url
        FROM local_images li
        WHERE li.local_id = l.id
        ORDER BY li.id DESC
        LIMIT 1
      ) AS cover_image,

      -- average rating
      (
        SELECT AVG(e.rating)
        FROM evaluations e
        WHERE e.local_id = l.id
      ) AS evaluation,

      -- total reviews
      (
        SELECT COUNT(*)
        FROM evaluations e
        WHERE e.local_id = l.id
      ) AS total_reviews

    FROM locals l
    WHERE l.user_id = ?
    ORDER BY l.id DESC;
  `;

  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error(err); // 🔥 keep this for debugging
      return res.status(500).json({ message: 'DB error', err });
    }
    return res.json(results);
  });
});

//delete reservation
app.delete('/reservations/:id', verifyToken, isRenter, (req, res) => {
  const reservationId = req.params.id;

  // Get local_id first to restore availability
  db.query('SELECT local_id FROM reservations WHERE id = ?', [reservationId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (rows.length === 0) return res.status(404).json({ message: 'Reservation not found' });
    
    const localId = rows[0].local_id;

    db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err, result) => {
      if (err) return res.status(500).json({ message: 'DB error', err });
      
      // Update local availability back to 1
      db.query('UPDATE locals SET availability = 1 WHERE id = ?', [localId], (updateErr) => {
        if (updateErr) console.error('Error restoring availability:', updateErr);
        return res.json({ message: 'Reservation deleted', count: result.affectedRows });
      });
    });
  });
});

// Update local
app.put('/locals/:id', verifyToken, isLandlord, (req, res) => {
  const { title, address, description, price, availability } = req.body;
  const sql = 'UPDATE locals SET title=?, address=?, description=?, price=?, availability=? WHERE id=? AND user_id=?';
  db.query(sql, [title, address, description, price, availability ? 1 : 0, req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Local not found or not owned' });
    return res.json({ message: 'Local updated' });
  });
});

// Delete local
app.delete('/locals/:id', verifyToken, isLandlord, (req, res) => {
  const localId = req.params.id;

  db.query('DELETE FROM evaluations WHERE local_id = ?', [localId]);
  db.query('DELETE FROM reservations WHERE local_id = ?', [localId]);
  db.query('DELETE FROM local_images WHERE local_id = ?', [localId]);
  const sql = 'DELETE FROM locals WHERE id=? AND user_id=?';
  db.query(sql, [req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Local not found or not owned' });
    return res.json({ message: 'Local deleted' });
  });
});

// Upload images for one local (expects base64 data URLs or remote URLs)
app.post('/locals/:id/images', verifyToken, isLandlord, (req, res) => {
  const localId = Number(req.params.id);
  const images = Array.isArray(req.body?.images) ? req.body.images : [];

  if (!localId) return res.status(400).json({ message: 'Invalid local id' });
  if (!images.length) return res.status(400).json({ message: 'No images provided' });

  assertLocalOwnership(
    localId,
    req.user.id,
    () => {
      const sql = 'INSERT INTO local_images (local_id, image_url) VALUES ?';
      const values = images
        .filter((img) => typeof img === 'string' && img.trim().length > 0)
        .map((img) => [localId, img]);

      if (!values.length) return res.status(400).json({ message: 'No valid images provided' });

      db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ message: 'DB error', err });
        return res.json({ message: 'Images uploaded', count: result.affectedRows });
      });
    },
    (status, payload) => res.status(status).json(payload)
  );
});

// Upload one image as raw binary (avoids JSON payload limit issues)
app.post(
  '/locals/:id/image-binary',
  verifyToken,
  isLandlord,
  express.raw({ type: 'application/octet-stream', limit: '10mb' }),
  (req, res) => {
    const localId = Number(req.params.id);
    if (!localId) return res.status(400).json({ message: 'Invalid local id' });

    const mime = String(req.headers['x-image-mime'] || 'image/jpeg');
    const buffer = req.body;
    if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
      return res.status(400).json({ message: 'No image binary received' });
    }

    const imageUrl = `data:${mime};base64,${buffer.toString('base64')}`;

    assertLocalOwnership(
      localId,
      req.user.id,
      () => {
        const sql = 'INSERT INTO local_images (local_id, image_url) VALUES (?, ?)';
        db.query(sql, [localId, imageUrl], (err, result) => {
          if (err) return res.status(500).json({ message: 'DB error', err });
          return res.json({ message: 'Image uploaded', count: result.affectedRows });
        });
      },
      (status, payload) => res.status(status).json(payload)
    );
  }
);

// Get images for one local (owner only)
app.get('/locals/:id/images', verifyToken, isLandlord, (req, res) => {
  const localId = Number(req.params.id);
  if (!localId) return res.status(400).json({ message: 'Invalid local id' });

  assertLocalOwnership(
    localId,
    req.user.id,
    () => {
      const sql = 'SELECT id, image_url FROM local_images WHERE local_id = ? ORDER BY id DESC';
      db.query(sql, [localId], (err, rows) => {
        if (err) return res.status(500).json({ message: 'DB error', err });
        return res.json(rows || []);
      });
    },
    (status, payload) => res.status(status).json(payload)
  );
});

// ---------- Renter routes ----------
app.get('/locals/available', verifyToken, isRenter, (req, res) => {
  const sql = `
    SELECT
      l.*,
      COALESCE(NULLIF(u.email, ''), CONCAT('Owner #', l.user_id)) AS landlord_name,
      (
        SELECT li.image_url
        FROM local_images li
        WHERE li.local_id = l.id
        ORDER BY li.id DESC
        LIMIT 1
      ) AS cover_image,
      (
        SELECT AVG(e.rating)
        FROM evaluations e
        WHERE e.local_id = l.id
      ) AS evaluation,
      (
        SELECT COUNT(*)
        FROM evaluations e
        WHERE e.local_id = l.id
      ) AS total_reviews
    FROM locals l
    LEFT JOIN users u ON u.id = l.user_id
    WHERE l.availability = 1 AND l.user_id != ? AND l.status = 'approved'
    ORDER BY l.id DESC
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return sendDbError(res, err);
    return res.json(rows || []);
  });
});

app.get('/locals/:id/public-images', verifyToken, isRenter, (req, res) => {
  const localId = Number(req.params.id);
  if (!localId) return res.status(400).json({ message: 'Invalid local id' });

  const sql = `
    SELECT li.id, li.image_url
    FROM local_images li
    INNER JOIN locals l ON l.id = li.local_id
    WHERE li.local_id = ? AND l.availability = 1
    ORDER BY li.id DESC
  `;

  db.query(sql, [localId], (err, rows) => {
    if (err) return sendDbError(res, err);
    return res.json(rows || []);
  });
});

app.get('/reservations/my', verifyToken, isRenter, (req, res) => {
  const sql = `
    SELECT
      r.*,
      r.startDate AS start_date,
      r.endDate AS end_date,
      l.title,
      l.address,
      l.price,
      (
        SELECT li.image_url
        FROM local_images li
        WHERE li.local_id = l.id
        ORDER BY li.id DESC
        LIMIT 1
      ) AS cover_image
    FROM reservations r
    INNER JOIN locals l ON l.id = r.local_id
    WHERE r.user_id = ?
    ORDER BY r.id DESC
  `;

  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return sendDbError(res, err);
    return res.json(rows || []);
  });
});

app.post('/reservations', verifyToken, isRenter, (req, res) => {
  const localId = Number(req.body?.local_id);
  const startDate = req.body?.start_date;
  const endDate = req.body?.end_date;

  if (!localId || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing reservation fields' });
  }

  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).json({ message: 'Start date must be before end date' });
  }

  const localSql = 'SELECT id FROM locals WHERE id = ? AND availability = 1 LIMIT 1';
  db.query(localSql, [localId], (localErr, localRows) => {
    if (localErr) return sendDbError(res, localErr);
    if (!localRows || localRows.length === 0) {
      return res.status(404).json({ message: 'Local not available' });
    }

    const overlapSql = `
      SELECT id
      FROM reservations
      WHERE local_id = ?
        AND status = 'reserved'
        AND startDate <= ?
        AND endDate >= ?
      LIMIT 1
    `;

    db.query(overlapSql, [localId, endDate, startDate], (overlapErr, overlapRows) => {
      if (overlapErr) return sendDbError(res, overlapErr);
      if (overlapRows && overlapRows.length > 0) {
        return res.status(409).json({ message: 'Local already reserved for these dates' });
      }

      const insertSql = `
        INSERT INTO reservations (startDate, endDate, status, user_id, local_id)
        VALUES (?, ?, 'reserved', ?, ?)
      `;

      db.query(insertSql, [startDate, endDate, req.user.id, localId], (insertErr, result) => {
        if (insertErr) return sendDbError(res, insertErr);
        
        // Update local availability to 0
        db.query('UPDATE locals SET availability = 0 WHERE id = ?', [localId], (updateErr) => {
          if (updateErr) console.error('Error updating availability:', updateErr);
          return res.json({ message: 'Reservation created', id: result.insertId });
        });
      });
    });
  });
});

app.post('/evaluations', verifyToken, isRenter, (req, res) => {
  const evaluationsUserColumn = schemaColumns.evaluationsUserColumn;
  const localId = Number(req.body?.local_id);
  const rating = Number(req.body?.rating);
  const comment = req.body?.comment || null;

  if (!localId || !rating) {
    return res.status(400).json({ message: 'Missing evaluation fields' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  const reservationSql = `
    SELECT id
    FROM reservations
    WHERE local_id = ? AND user_id = ?
    LIMIT 1
  `;

  db.query(reservationSql, [localId, req.user.id], (reservationErr, reservationRows) => {
    if (reservationErr) return sendDbError(res, reservationErr);
    if (!reservationRows || reservationRows.length === 0) {
      return res.status(403).json({ message: 'Reserve this local before evaluating it' });
    }

    const evaluationSql = `
      INSERT INTO evaluations (local_id, ${evaluationsUserColumn}, rating, comment)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        comment = VALUES(comment)
    `;

    db.query(evaluationSql, [localId, req.user.id, rating, comment], (evaluationErr, result) => {
      if (evaluationErr) return sendDbError(res, evaluationErr);
      return res.json({ message: 'Evaluation saved', id: result.insertId || null });
    });
  });
});

// ---------- Admin routes ----------
app.get('/admin/locals', verifyToken, isAdmin, (req, res) => {
  console.log('GET /admin/locals hit by user:', req.user.id);
  const sql = `
    SELECT l.*, u.email as landlord_email,
           EXISTS(SELECT 1 FROM reservations r WHERE r.local_id = l.id AND r.status = 'reserved') as is_reserved
    FROM locals l
    LEFT JOIN users u ON u.id = l.user_id
    ORDER BY l.id DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching admin locals:', err);
      return sendDbError(res, err);
    }
    console.log(`Returning ${rows.length} locals for admin`);
    res.json(rows);
  });
});

app.put('/admin/locals/:id/status', verifyToken, isAdmin, (req, res) => {
  const { status } = req.body;
  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const sql = 'UPDATE locals SET status = ? WHERE id = ?';
  db.query(sql, [status, req.params.id], (err, result) => {
    if (err) return sendDbError(res, err);
    res.json({ message: 'Status updated' });
  });
});

app.put('/admin/locals/:id', verifyToken, isAdmin, (req, res) => {
  const { title, address, description, price, availability, status } = req.body;
  const sql = 'UPDATE locals SET title=?, address=?, description=?, price=?, availability=?, status=? WHERE id=?';
  db.query(sql, [title, address, description, price, availability ? 1 : 0, status, req.params.id], (err, result) => {
    if (err) return sendDbError(res, err);
    res.json({ message: 'Local updated' });
  });
});

app.delete('/admin/locals/:id', verifyToken, isAdmin, (req, res) => {
  const localId = req.params.id;
  db.query('DELETE FROM evaluations WHERE local_id = ?', [localId]);
  db.query('DELETE FROM reservations WHERE local_id = ?', [localId]);
  db.query('DELETE FROM local_images WHERE local_id = ?', [localId]);
  db.query('DELETE FROM locals WHERE id = ?', [localId], (err) => {
    if (err) return sendDbError(res, err);
    res.json({ message: 'Local deleted' });
  });
});

app.get('/admin/users', verifyToken, isAdmin, (req, res) => {
  console.log('GET /admin/users hit by user:', req.user.id);
  const sql = 'SELECT id, name, email, role FROM users ORDER BY id DESC';
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error fetching admin users:', err);
      return sendDbError(res, err);
    }
    console.log(`Returning ${rows.length} users for admin`);
    res.json(rows);
  });
});

app.put('/admin/users/:id', verifyToken, isAdmin, (req, res) => {
  const { name, email, role } = req.body;
  const sql = 'UPDATE users SET name=?, email=?, role=? WHERE id=?';
  db.query(sql, [name, email, role, req.params.id], (err, result) => {
    if (err) return sendDbError(res, err);
    res.json({ message: 'User updated' });
  });
});

app.delete('/admin/users/:id', verifyToken, isAdmin, (req, res) => {
  const userId = req.params.id;
  // Note: deleting a user might require deleting their locals/reservations too
  // but for simplicity we'll just delete the user or handle foreign keys if they exist.
  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) return sendDbError(res, err);
    res.json({ message: 'User deleted' });
  });
});

const PORT = process.env.PORT || 3000;
Promise.all([
  ensureLocalsTable(),
  ensureLocalImagesTable(),
  ensureReservationsTable(),
  ensureEvaluationsTable(),
  detectUserColumn('evaluations', 'evaluationsUserColumn')
])
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Startup failed:', err);
    process.exit(1);
  });

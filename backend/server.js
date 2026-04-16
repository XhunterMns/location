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

// ---------- Helpers / Middleware ----------
function normalizeRole(role) {
  return String(role || '').trim().toLowerCase();
}

function ensureLocalImagesTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS local_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      local_id INT NOT NULL,
      image_url LONGTEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_local_id (local_id)
    )
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating local_images table:', err);
    }
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

// ---------- Auth routes ----------
app.post('/register', async (req, res) => {
  const { nom, email, password, role } = req.body;
  const normalizedRole = normalizeRole(role);
  if (!email || !password || !normalizedRole) return res.status(400).json({ message: 'Missing fields' });
  if (!['landlord', 'renter'].includes(normalizedRole)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom || null, email, hashed, normalizedRole], (err, result) => {
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
    if (!results || results.length === 0) return res.status(401).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const normalizedRole = normalizeRole(user.role);
    const token = jwt.sign({ id: user.id, role: normalizedRole }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, role: normalizedRole });
  });
});

// ---------- Locals routes (protected) ----------
// Create local
app.post('/locals', verifyToken, isLandlord, (req, res) => {
  const { titre, adresse, description, prix, disponibilite } = req.body;
  const sql = 'INSERT INTO locals (titre, adresse, description, prix, disponibilite, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [titre, adresse, description, prix, disponibilite ? 1 : 0, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    return res.json({ message: 'Local created', id: result.insertId });
  });
});

// Get my locals
app.get('/locals/my', verifyToken, isLandlord, (req, res) => {
  const sql = `
    SELECT l.*,
      (
        SELECT li.image_url
        FROM local_images li
        WHERE li.local_id = l.id
        ORDER BY li.id DESC
        LIMIT 1
      ) AS cover_image
    FROM locals l
    WHERE l.user_id = ?
    ORDER BY l.id DESC
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    return res.json(results);
  });
});

// Update local
app.put('/locals/:id', verifyToken, isLandlord, (req, res) => {
  const { titre, adresse, description, prix, disponibilite } = req.body;
  const sql = 'UPDATE locals SET titre=?, adresse=?, description=?, prix=?, disponibilite=? WHERE id=? AND user_id=?';
  db.query(sql, [titre, adresse, description, prix, disponibilite ? 1 : 0, req.params.id, req.user.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error', err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Local not found or not owned' });
    return res.json({ message: 'Local updated' });
  });
});

// Delete local
app.delete('/locals/:id', verifyToken, isLandlord, (req, res) => {
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

const PORT = process.env.PORT || 3000;
ensureLocalImagesTable();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

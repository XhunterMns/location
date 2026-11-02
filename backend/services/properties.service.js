const {
  createLocal,
  getLocalsByUserId,
  getOwnedLocalById,
  updateLocalByOwner,
  deleteLocalByOwner,
  getAvailableLocalsForRenter,
  getLocalImagesByLocalId,
  getPublicLocalImages,
  insertLocalImages,
  getAdminLocals,
  updateLocalStatusByAdmin,
  updateLocalByAdmin,
  deleteLocalByAdmin,
  getLocalById,
} = require('../repositories/properties.repository');
const { validatePropertyInput } = require('../validators/property.validator');
const { pool } = require('../db_config/database');

async function createProperty({ userId, user, payload }) {
  const validation = validatePropertyInput(payload);
  if (!validation.valid) {
    throw Object.assign(new Error(validation.message || 'Invalid property data'), { statusCode: 400 });
  }
  const {
    title,
    address,
    city,
    delegation,
    country,
    phone_number,
    description,
    price,
    availability,
    is_colocation,
    room_type,
    available_places,
    gender_preference,
    colocation_rules,
  } = payload;

  const agencyId = user?.agency_id || null;

  const created = await createLocal({
    title,
    address,
    city,
    delegation,
    country,
    phone_number,
    description,
    price,
    availability,
    is_colocation,
    room_type,
    available_places,
    gender_preference,
    colocation_rules,
    userId,
    agencyId,
    status: 'published',
  });

  return created;
}

async function getMyProperties({ userId, user }) {
  return getLocalsByUserId(userId, user?.agency_id || null, user?.role || null);
}

async function updateProperty({ userId, user, localId, payload }) {
  const local = await getOwnedLocalById(localId, userId, user);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  const result = await updateLocalByOwner(localId, userId, payload, user);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  return { message: 'Local updated' };
}

async function deleteProperty({ userId, user, localId }) {
  const local = await getOwnedLocalById(localId, userId, user);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  const result = await deleteLocalByOwner(localId, userId, user);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  return { message: 'Local deleted' };
}

async function getAvailableProperties(userId) {
  return getAvailableLocalsForRenter(userId);
}

async function getPropertyImagesForOwner({ userId, user, localId }) {
  const local = await getOwnedLocalById(localId, userId, user);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  return getLocalImagesByLocalId(localId);
}

async function getPropertyImagesForRenter(localId) {
  const local = await getLocalById(localId);
  if (!local) {
    throw Object.assign(new Error('Local not found'), { statusCode: 404 });
  }

  return getPublicLocalImages(localId);
}

async function uploadPropertyImages({ userId, user, localId, images }) {
  const local = await getOwnedLocalById(localId, userId, user);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  if (!Array.isArray(images) || !images.length) {
    throw Object.assign(new Error('No images provided'), { statusCode: 400 });
  }

  const result = await insertLocalImages(localId, images);
  return { message: 'Images uploaded', count: result.affectedRows };
}

async function uploadPropertyImageBinary({ userId, user, localId, mimeType, buffer }) {
  const local = await getOwnedLocalById(localId, userId, user);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw Object.assign(new Error('No image binary received'), { statusCode: 400 });
  }

  const imageUrl = `data:${mimeType || 'image/jpeg'};base64,${buffer.toString('base64')}`;
  const result = await insertLocalImages(localId, [imageUrl]);

  return { message: 'Image uploaded', count: result.affectedRows };
}

async function getAdminProperties() {
  return getAdminLocals();
}

async function updatePropertyStatusByAdmin({ localId, status }) {
  if (!['published', 'archived'].includes(status)) {
    throw Object.assign(new Error('Invalid status'), { statusCode: 400 });
  }

  const result = await updateLocalStatusByAdmin(localId, status);
  return { message: 'Status updated', affectedRows: result.affectedRows };
}

async function adminUpdateProperty({ localId, payload }) {
  const result = await updateLocalByAdmin(localId, payload);
  return { message: 'Local updated', affectedRows: result.affectedRows };
}

async function adminDeleteProperty({ localId }) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query('DELETE FROM evaluations WHERE local_id = ?', [localId]);
    await connection.query('DELETE FROM reservations WHERE local_id = ?', [localId]);
    await connection.query('DELETE FROM local_images WHERE local_id = ?', [localId]);
    const [result] = await connection.query('DELETE FROM locals WHERE id = ?', [localId]);
    await connection.commit();
    return { message: 'Local deleted', affectedRows: result.affectedRows };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getAvailableProperties,
  getPropertyImagesForOwner,
  getPropertyImagesForRenter,
  uploadPropertyImages,
  uploadPropertyImageBinary,
  getAdminProperties,
  updatePropertyStatusByAdmin,
  adminUpdateProperty,
  adminDeleteProperty,
};

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

async function createProperty({ userId, payload }) {
  const {
    title,
    address,
    city,
    delegation,
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

  const created = await createLocal({
    title,
    address,
    city,
    delegation,
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
    status: 'published',
  });

  return created;
}

async function getMyProperties(userId) {
  return getLocalsByUserId(userId);
}

async function updateProperty({ userId, localId, payload }) {
  const local = await getOwnedLocalById(localId, userId);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  const result = await updateLocalByOwner(localId, userId, payload);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  return { message: 'Local updated' };
}

async function deleteProperty({ userId, localId }) {
  const local = await getOwnedLocalById(localId, userId);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  const result = await deleteLocalByOwner(localId, userId);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  return { message: 'Local deleted' };
}

async function getAvailableProperties(userId) {
  return getAvailableLocalsForRenter(userId);
}

async function getPropertyImagesForOwner({ userId, localId }) {
  const local = await getOwnedLocalById(localId, userId);
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

async function uploadPropertyImages({ userId, localId, images }) {
  const local = await getOwnedLocalById(localId, userId);
  if (!local) {
    throw Object.assign(new Error('Local not found or not owned'), { statusCode: 404 });
  }

  if (!Array.isArray(images) || !images.length) {
    throw Object.assign(new Error('No images provided'), { statusCode: 400 });
  }

  const result = await insertLocalImages(localId, images);
  return { message: 'Images uploaded', count: result.affectedRows };
}

async function uploadPropertyImageBinary({ userId, localId, mimeType, buffer }) {
  const local = await getOwnedLocalById(localId, userId);
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
  const result = await deleteLocalByAdmin(localId);
  return { message: 'Local deleted', affectedRows: result.affectedRows };
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

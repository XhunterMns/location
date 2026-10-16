const {
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
} = require('../services/properties.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';

  return sendError(res, statusCode, message, error?.details || undefined);
}

async function createLocal(req, res) {
  try {
    const payload = await createProperty({ userId: req.user.id, payload: req.body || {} });
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getMyLocals(req, res) {
  try {
    const payload = await getMyProperties(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function updateLocal(req, res) {
  try {
    const payload = await updateProperty({ userId: req.user.id, localId: req.params.id, payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function deleteLocal(req, res) {
  try {
    const payload = await deleteProperty({ userId: req.user.id, localId: req.params.id });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getAvailableLocals(req, res) {
  try {
    const payload = await getAvailableProperties(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getPublicImages(req, res) {
  try {
    const payload = await getPropertyImagesForRenter(req.params.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getOwnerImages(req, res) {
  try {
    const payload = await getPropertyImagesForOwner({ userId: req.user.id, localId: req.params.id });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function uploadImages(req, res) {
  try {
    const payload = await uploadPropertyImages({
      userId: req.user.id,
      localId: req.params.id,
      images: Array.isArray(req.body?.images) ? req.body.images : [],
    });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function uploadBinaryImage(req, res) {
  try {
    const payload = await uploadPropertyImageBinary({
      userId: req.user.id,
      localId: req.params.id,
      mimeType: String(req.headers['x-image-mime'] || 'image/jpeg'),
      buffer: req.body,
    });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function adminListLocals(req, res) {
  try {
    const payload = await getAdminProperties();
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function adminUpdateLocalStatus(req, res) {
  try {
    const payload = await updatePropertyStatusByAdmin({ localId: req.params.id, status: req.body?.status });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function adminUpdateLocal(req, res) {
  try {
    const payload = await adminUpdateProperty({ localId: req.params.id, payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function adminDeleteLocal(req, res) {
  try {
    const payload = await adminDeleteProperty({ localId: req.params.id });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  createLocal,
  getMyLocals,
  updateLocal,
  deleteLocal,
  getAvailableLocals,
  getPublicImages,
  getOwnerImages,
  uploadImages,
  uploadBinaryImage,
  adminListLocals,
  adminUpdateLocalStatus,
  adminUpdateLocal,
  adminDeleteLocal,
};

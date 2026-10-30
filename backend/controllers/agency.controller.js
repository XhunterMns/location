const {
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
} = require('../services/agency.service');
const { sendError } = require('../utils/api-response');

function handleControllerError(res, error) {
  const statusCode = error?.statusCode || 500;
  const message = error?.message || 'Server error';
  return sendError(res, statusCode, message, error?.details || undefined);
}

async function register(req, res) {
  try {
    const payload = await registerAgency({ userId: req.user.id, payload: req.body || {} });
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getAgency(req, res) {
  try {
    const payload = await getMyAgency(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getDashboard(req, res) {
  try {
    const payload = await getAgencyDashboard(req.user.id);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function listReviews(req, res) {
  try {
    const payload = await listAgenciesForReview();
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function reviewAgency(req, res) {
  try {
    const payload = await updateAgencyReview({ agencyId: Number(req.params.id), status: req.body?.status });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function listPlans(req, res) {
  try {
    const payload = await getPlanCatalog();
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function createAgencyPlan(req, res) {
  try {
    const payload = await createPlan({ payload: req.body || {} });
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function updateAgencyPlanById(req, res) {
  try {
    const payload = await updatePlan({ planId: Number(req.params.id), payload: req.body || {} });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function activateAgencySubscription(req, res) {
  try {
    const payload = await activateSubscription({
      agencyId: Number(req.params.id),
      planKey: req.body?.plan_key || req.body?.planKey,
      expiresAt: req.body?.expires_at || req.body?.expiresAt || null,
    });
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function submitInquiry(req, res) {
  try {
    const payload = await addInquiry({ agencyId: Number(req.params.id), payload: req.body || {} });
    return res.status(201).json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

async function getPublicAgencyProfile(req, res) {
  try {
    const payload = await getPublicAgency(req.params.slug);
    return res.json(payload);
  } catch (error) {
    return handleControllerError(res, error);
  }
}

module.exports = {
  register,
  getAgency,
  getDashboard,
  listReviews,
  reviewAgency,
  listPlans,
  createAgencyPlan,
  updateAgencyPlanById,
  activateAgencySubscription,
  submitInquiry,
  getPublicAgencyProfile,
};

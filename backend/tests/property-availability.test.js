const test = require('node:test');
const assert = require('node:assert/strict');
const propertiesRepo = require('../repositories/properties.repository');
const db = require('../db_config/database');

test('createLocal stores availability correctly', async () => {
  const originalQuery = db.pool.query;
  let capturedParams;
  db.pool.query = async (sql, params) => {
    capturedParams = params;
    return [{ insertId: 1 }];
  };
  try {
    await propertiesRepo.createLocal({
      title: 'Test',
      address: 'Addr',
      city: null,
      delegation: null,
      country: 'Tunisia',
      phone_number: null,
      description: 'desc',
      price: 100,
      availability: false,
      is_colocation: 0,
      room_type: null,
      available_places: null,
      gender_preference: null,
      colocation_rules: null,
      userId: 1,
      agencyId: null,
      status: 'published',
    });
    const availabilityParam = capturedParams[8];
    assert.equal(availabilityParam, 0, 'Availability should be stored as 0');
  } finally {
    db.pool.query = originalQuery;
  }
});

const test = require('node:test');
const assert = require('node:assert/strict');
const { pool } = require('../db_config/database');
const agencyRepository = require('../repositories/agency.repository');
const propertiesRepository = require('../repositories/properties.repository');

test('getActiveListingCountForAgency returns the published listing count for an agency', async () => {
  const originalQuery = pool.query;
  pool.query = async (sql) => {
    if (String(sql).includes('COUNT(*) AS total')) {
      return [[{ total: 3 }]];
    }
    return [[]];
  };

  try {
    const count = await propertiesRepository.getActiveListingCountForAgency(12);
    assert.equal(count, 3);
  } finally {
    pool.query = originalQuery;
  }
});

test('findAgencyForUser resolves agencies for owner or active members', async () => {
  const originalQuery = pool.query;
  const queryResults = {
    owner: [[{ id: 9, name: 'North Star Realty', owner_user_id: 42 }]],
    member: [[{ id: 11, name: 'Urban Living', owner_user_id: 88 }]],
    userRowsAgency: [[{ agency_id: 11 }]],
    userRowsMember: [[{ agency_id: null }]],
  };

  pool.query = async (sql, params) => {
    const text = String(sql).toLowerCase();

    if (text.includes('from agencies where owner_user_id = ? limit 1') && params && params[0] === 42) {
      return queryResults.owner;
    }

    if (text.includes('from agencies where owner_user_id = ? limit 1') && params && params[0] === 77) {
      return queryResults.member;
    }

    if (text.includes('from users where id = ? limit 1') && params && params[0] === 42) {
      return [[{ agency_id: null }]];
    }

    if (text.includes('from users where id = ? limit 1') && params && params[0] === 77) {
      return queryResults.userRowsMember;
    }

    if (text.includes('from users where id = ? limit 1') && params && params[0] === 91) {
      return queryResults.userRowsAgency;
    }

    if (text.includes('from agencies where id = ? limit 1') && params && params[0] === 11) {
      return queryResults.member;
    }

    if (text.includes('from agencies a') && params && params[0] === 77) {
      return queryResults.member;
    }

    return [[]];
  };

  try {
    const byOwner = await agencyRepository.findAgencyForUser(42);
    assert.equal(byOwner.id, 9);

    const byMembership = await agencyRepository.findAgencyForUser(77);
    assert.equal(byMembership.id, 11);

    const byUserAgencyId = await agencyRepository.findAgencyForUser(91);
    assert.equal(byUserAgencyId.id, 11);
  } finally {
    pool.query = originalQuery;
  }
});

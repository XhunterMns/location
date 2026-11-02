const test = require('node:test');
const assert = require('node:assert/strict');
const authService = require('../services/auth.service');
const usersRepo = require('../repositories/users.repository');

// Simulate duplicate email error from repository
const duplicateError = new Error('Duplicate entry');
duplicateError.code = 'ER_DUP_ENTRY';

test('registerUser returns 409 on duplicate email', async () => {
  const originalCreate = usersRepo.createUser;
  usersRepo.createUser = async () => { throw duplicateError; };
  try {
    await authService.registerUser({ name: 'Test', email: 'test@example.com', password: 'pwd', role: 'renter' });
    assert.fail('Expected duplicate error');
  } catch (e) {
    assert.equal(e.statusCode, 409, 'Should be 409 Conflict');
  } finally {
    usersRepo.createUser = originalCreate;
  }
});

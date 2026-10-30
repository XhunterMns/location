const test = require('node:test');
const assert = require('node:assert/strict');
const authService = require('../services/auth.service');
const usersRepo = require('../repositories/users.repository');

test('login with admin/admin does not auto‑create admin', async () => {
  const originalFind = usersRepo.findUserByEmail;
  usersRepo.findUserByEmail = async () => null;
  try {
    await authService.loginUser({ email: 'admin', password: 'admin' });
    assert.fail('Expected error not thrown');
  } catch (e) {
    assert.equal(e.statusCode, 401, 'Should return 401 for unknown user');
  } finally {
    usersRepo.findUserByEmail = originalFind;
  }
});

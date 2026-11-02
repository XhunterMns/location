const test = require('node:test');
const assert = require('node:assert/strict');
const { pool, ensureDatabaseSchema } = require('../db_config/database');

test('database schema creates agency and user agency metadata', async () => {
  await ensureDatabaseSchema();

  const [tableRows] = await pool.query(
    `SELECT TABLE_NAME
     FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME IN ('agencies', 'agency_members')`
  );

  const tableNames = tableRows.map((row) => row.TABLE_NAME);
  assert.ok(tableNames.includes('agencies'));
  assert.ok(tableNames.includes('agency_members'));

  const [userColumns] = await pool.query(
    `SHOW COLUMNS FROM users LIKE 'agency_id'`
  );
  const [userRoleColumns] = await pool.query(
    `SHOW COLUMNS FROM users LIKE 'agency_role'`
  );

  const [roleColumn] = await pool.query(
    `SHOW COLUMNS FROM users LIKE 'role'`
  );

  assert.equal(userColumns.length, 1);
  assert.equal(userRoleColumns.length, 1);
  assert.equal(roleColumn.length, 1);
  assert.match(roleColumn[0].Type, /landlord/);
  assert.match(roleColumn[0].Type, /renter/);
  assert.match(roleColumn[0].Type, /admin/);
  assert.match(roleColumn[0].Type, /agency_owner/);
  assert.match(roleColumn[0].Type, /agency_agent/);
  assert.equal(roleColumn[0].Null, 'NO');
  assert.equal(roleColumn[0].Default, 'renter');
});

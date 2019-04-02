const mariadb = require('mariadb');

const connect = async (endpoint, user, password) => {
  const pool = mariadb.createPool({
    host: endpoint,
    user: user,
    password: password,
    connectionLimit: 5
  });
  let conn;
  try {
    conn = await pool.getConnection();
    const results = await conn.query("SHOW DATABASES");
    return results;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
};

module.exports = {
  connect,
};

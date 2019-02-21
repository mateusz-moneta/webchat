const mysql = require('mysql');

function initializeConnection(config) {
  function addDisconnectHandler(connection) {
    connection.on('error', error => {
      if (error instanceof Error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error(error.stack);
          console.log('Lost connection. Reconnecting...');
          initializeConnection(connection.config);
        }
        else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  const connection = mysql.createConnection(config);

  // Add handlers
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

const con = initializeConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webchat',
  timezone: 'utc'
});

const getUserIdByUsername = username => {
  return new Promise((resolve, reject) => {
    con.query('SELECT user_id FROM users WHERE username = ?', [username], (err, result) => {
      if (err) {
        reject(err);
      }

      const [{ user_id }] = result;
      resolve(user_id);
    });
  })
};

const getUsernameByUserId = userId => {
  return new Promise((resolve, reject) => {
    con.query('SELECT username FROM users WHERE user_id = ?', [userId], (err, result) => {
      if (err) {
        reject(err);
      }

      const [{ username }] = result;
      resolve(username);
    });
  });
};

module.exports = {
  con: con,
  getUserIdByUsername: getUserIdByUsername,
  getUsernameByUserId: getUsernameByUserId
};

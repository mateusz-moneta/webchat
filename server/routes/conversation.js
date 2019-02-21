const express = require('express'),
router = express.Router(),
mysql = require('../services/mysql');

/* IF CONVERSATION NOT EXIST, CREATE NEW CONVERSATION */
router.post('/init', (req, res) => {
  let users = JSON.parse(req.body.users);

  mysql.con.query(`SELECT user_id FROM users WHERE username IN ('${users.join("','")}')`, (err, result) => {
    let usersId = [],
    sql = '';

    for (let row of result) {
      usersId.push(row.user_id);
      if (!sql)
        sql = `SELECT * FROM conversations WHERE users LIKE '%${row.user_id}%'`; 
      else
        sql += ` AND users LIKE '%${row.user_id}%'`;
    }

    mysql.con.query(sql, function (err, result) {
      if (result.length > 0) {
        const [{ conversation_id }] = result;
        res.send({ redirect: conversation_id });
      }
      else {
        mysql.con.query('INSERT INTO conversations (users) VALUES (?)', [usersId.join(',')], (err, result)  => {
          if (err) throw err;
          res.send({ redirect: result.insertId });
        });
      }
    });
  });
});

/* NEW MESSAGE */
router.post('/message', (req, res) => {
  mysql.getUserIdByUsername(req.body.username).then(userId => {
    mysql.con.query('INSERT INTO messages (conversation_id, user_id, message, date) VALUES (?, ?, ?, ?)', [req.body.conversation_id, userId, req.body.message, req.body.datetime], err => {
      if (err) throw err;
      res.send({ status: 'Message sent' });
    });
  });
});

/* LAST MESSAGES IN CONVERSATION */
router.post('/last_messages', function (req, res) {
  mysql.getUserIdByUsername(req.body.username).then((userId) => {
    mysql.con.query(`SELECT * FROM conversations WHERE conversation_id = ? AND users LIKE '%?%'`, [req.body.conversation_id, userId], function (err, result) {
      if (result.length > 0) {
        mysql.con.query('SELECT * FROM (SELECT messages.message_id as messageID, users.username, messages.message, messages.date FROM messages INNER JOIN users ON messages.user_id = users.user_id WHERE messages.conversation_id = ? ORDER BY messages.date DESC LIMIT 30) sub ORDER BY messageID ASC', [req.body.conversation_id], (err, result) => {
          res.send({ messages: JSON.stringify(result) });
        });
      }
      else {
        res.send(false);
      }
    });
  });
});

/* RECHARGE MESSAGES IN CONVERSATION */
router.post('/recharge_messages', (req, res) => {
  mysql.con.query('SELECT * FROM (SELECT messages.message_id, users.username, messages.message, messages.date FROM messages INNER JOIN users ON messages.user_id = users.user_id WHERE messages.conversation_id = ? AND messages.message_id < ? ORDER BY messages.date DESC LIMIT 30) sub ORDER BY message_id ASC', [req.body.conversation_id, req.body.message_id], function (err, result) {
    if (result.length > 0) {
      res.send({ messages: JSON.stringify(result) });
    }
  });
});

module.exports = router;

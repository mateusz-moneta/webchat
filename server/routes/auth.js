const express = require('express'),
router = express.Router(),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
mysql = require('../services/mysql');

/* LOGIN USER */
router.post('/login', function (req, res) {
  mysql.con.query('SELECT user_id, password FROM users WHERE username = ?', [req.body.username, req.body.password], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      const [{ user_id, password }] = result;
      bcrypt.compare(req.body.password, password, function(err, match) {
        if (err) throw err;
        if (match) {
          // Passwords match
          const token = jwt.sign({ userID: user_id }, 'secret', { expiresIn: '2h' });
          res.send({ access_token: token, alert: 'USER-LOGGED' });
        }
        else {
          res.send({ alert: 'INCORRECT-PASSWORD' });
        } 
      });
    }
    else {
      res.send({ alert: 'USER-UNREGISTERED' });
    }
  });
});

/* REGISTER USER */
router.post('/register', (req, res) => {
  mysql.con.query('SELECT * FROM users WHERE username = ?', [req.body.username], function (err, result) {
    if (err) throw err;
    if (result.length > 0)
      res.send({ alert: 'USERNAME-BUSY' });
    else {
      mysql.con.query('SELECT * FROM users WHERE email = ?', [req.body.email], function (err, result) {
        if (err) throw err;
        if (result.length > 0)
          res.send({ alert: 'EMAIL-BUSY' });
        else {
          bcrypt.hash(req.body.password, 10, function(err, hash) {
            mysql.con.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [req.body.username, req.body.email, hash], err => {
              if (err) throw err;
            });
          });
          res.send({ alert: 'USER-REGISTERED', reset: true });
        }
      });
    }
  });
});

module.exports = router;

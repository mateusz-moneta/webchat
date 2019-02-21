const express = require('express'),
router = express.Router(),
mysql = require('../services/mysql');

/* LIST OF USERS */
router.post('/list', function (req, res) {
  mysql.con.query('SELECT username FROM users WHERE NOT username = ? ORDER BY username ASC', [req.body.username], (err, result) => {
    res.send({ list: (result.length > 0) ? JSON.stringify(result) : 'LIST-EMPTY' });
  });
});

module.exports = router;

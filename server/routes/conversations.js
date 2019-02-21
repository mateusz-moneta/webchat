const express = require('express'),
router = express.Router(),
mysql = require('../services/mysql');

/* LIST OF CONVERSATIONS */
function getLastMessages(user_id) {
  return new Promise(resolve => {
    mysql.con.query('SELECT conversations.users, conversations.conversation_id as conversationID, messages.date FROM messages INNER JOIN conversations ON conversations.conversation_id = messages.conversation_id WHERE conversations.users LIKE "%?%" ORDER BY messages.date DESC', [user_id], (err, result) => {
      let data = [];

      for (let row of result) {
        if (data.length > 0) {
          let valid = true;
          for (let element of data) {
            if (row.conversation_id === element.conversation_id)
              valid = false;
          }
          if (valid)
            data.push(row);
        } else {
          data.push(row);
        }
      }
      
      resolve(data);
    });
  })
}

async function getLastMessagesOfUsers(username) {
  let userId = await mysql.getUserIdByUsername(username),
  lastMessages = await getLastMessages(userId);

  for (let lastMessage of lastMessages) {
    let usersId = lastMessage.users.replace(`${userId},`, '').replace(`,${userId}`, '').split(','),
    usernames = [];

    for (let userId of usersId) {
      let username = await mysql.getUsernameByUserId(userId);
      usernames.push(username);
    }

    lastMessage.users = usernames.join(', ');
  }

  return lastMessages;
}

router.post('/list', (req, res) => {
  getLastMessagesOfUsers(req.body.username).then(data => res.send(JSON.stringify(data)));
});

module.exports = router;

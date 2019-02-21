const express = require('express'),
app = express(),
server = require('http').Server(app),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
bodyParser = require('body-parser'),
auth = require('./routes/auth'),
conversation = require('./routes/conversation'),
conversations = require('./routes/conversations'),
users = require('./routes/users'),
socketIO = require('socket.io'),
__mainDir = path.join(__dirname, '..');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__mainDir, 'dist/webchat')));
app.use('/users', express.static(path.join(__mainDir, 'dist/webchat')));
app.use('/users', users);
app.use('/auth', auth);
app.use('/conversation', conversation);
app.use('/conversations', conversations);

// Web Sockets
const io = socketIO();
app.io = io;

io.on('connection', function(socket) {
  socket.on('join', function (data) {
    const parsedData = JSON.parse(data);
    socket.join(parsedData['conversation_id']);
  });

  socket.on('message', function (data) {
    const parsedData = JSON.parse(data);
    socket.broadcast.to(parsedData['conversation_id']).emit('message', data);
  });

  socket.on('leave', function (data) {
    const parsedData = JSON.parse(data);
    socket.leave(parsedData['conversation_id']);
  });
});

// Routing
app.get('*', function(req, res) {
  res.sendFile(`${__mainDir}/dist/webchat/index.html`);
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

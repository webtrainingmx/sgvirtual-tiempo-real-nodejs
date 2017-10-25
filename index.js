const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);

const morgan = require('morgan');
const io = require('socket.io')(server);
const port = process.env.PORT || 3300;

// 1. Morgan middleware for logging
app.use(morgan('dev'));

// 2. Express static index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 6. Socket.io configuration
io.on('connection', (socket) => {

  console.log('User connected');

  socket.on('new-message', (data) => {
    console.log('Message has been received!', data);

    io.emit('message-received', {
      message: data
    });
  });

  socket.on('disconnect', () => {
    console.log('user-disconnected');

    socket.emit('user-disconnected', () => {

    });
  });
});

// 7. Run the server
server.listen(port, () => {
  console.log('Servidor activo en puerto: %d', port);
});
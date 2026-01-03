const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const initializeChatSocket = require('./util/socket/chat.socket');


const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ["GET","POST"],
    credentials: true
  }
});
app.set('socketio', io);



// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});


// Start socket handlers (after io exists)
initializeChatSocket(io);

module.exports = {
  app,server
};

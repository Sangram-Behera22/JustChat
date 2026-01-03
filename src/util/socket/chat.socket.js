// const socketAuth = require('../../middleware/socketAuth.middleware');

/**
 * Initialize Socket.io for chat functionality
 * @param {Object} io - Socket.io instance
 */
const initializeChatSocket = (io) => {
  // Authentication middleware for socket connections
  // io.use(socketAuth);
  io.on('connection', (socket) => {
    // Join user's personal room for private notifications
    socket.join(`user_${socket.userId}`);
    // Join conversation rooms
    socket.on('join_conversation', (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });
    // Leave conversation room
    socket.on('leave_conversation', (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
    });
    // Typing indicator
    socket.on('typing', ({ conversationId, isTyping }) => {
      socket.to(`conversation_${conversationId}`).emit('user_typing', {
        userId: socket.userId,
        conversationId,
        isTyping
      });
    });
    // Online status
    socket.on('update_presence', (status) => {
      socket.broadcast.emit('presence_update', {
        userId: socket.userId,
        status,
        lastSeen: new Date()
      });
    });
    // Disconnect
    socket.on('disconnect', () => {
      // Notify others about offline status
      socket.broadcast.emit('presence_update', {
        userId: socket.userId,
        status: 'offline',
        lastSeen: new Date()
      });
    });
  });
};

module.exports = initializeChatSocket;
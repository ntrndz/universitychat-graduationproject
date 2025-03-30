const { Server } = require('socket.io');
const socketAuthMiddleware = require('./middleware');
const handlers = require('./handlers');

const initializeWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use(socketAuthMiddleware);

  io.on('connection', (socket) => {
    console.log(`🔗 WebSocket connected: User ID ${socket.user.user_id}`);

    // ⭐ Kullanıcının bireysel odasına katılım
    socket.join(`user_${socket.user.user_id}`);

    // ⭐ Eventleri dinleyip yönlendirme
    socket.on('private_message', (data) => handlers.handlePrivateMessage(socket, io, data));
    socket.on('group_message', (data) => handlers.handleGroupMessage(socket, io, data));
    socket.on('join_group', ({ groupId }) => handlers.handleJoinGroup(socket, groupId));
    socket.on('leave_group', ({ groupId }) => handlers.handleLeaveGroup(socket, groupId));
    socket.on('disconnect', () => handlers.handleDisconnect(socket));
  });

  return io;
};

module.exports = initializeWebSocket;

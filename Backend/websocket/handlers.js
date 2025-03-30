const messageRepository = require('../repositories/messageRepository');
const groupMessageRepository = require('../repositories/groupMessageRepository');
const groupMemberRepository = require('../repositories/groupMemberRepository');

const handlePrivateMessage = async (socket, io, data) => {
  try {
    const { receiverId, content } = data;
    const senderId = socket.user.user_id;

    if (!receiverId || !content) {
      return socket.emit('error', { message: 'Eksik mesaj bilgisi' });
    }

    // ⭐ 1️⃣ Mesajı veritabanına kaydet
    const savedMessage = await messageRepository.sendMessage({
      sender_id: senderId,
      receiver_id: receiverId,
      content,
    });

    // ⭐ 2️⃣ Alıcıya gönder
    io.to(`user_${receiverId}`).emit('private_message', savedMessage);

    // ⭐ 3️⃣ Göndericiye onay gönder
    socket.emit('message_sent', savedMessage);

  } catch (error) {
    console.error('Private message error:', error.message);
    socket.emit('error', { message: 'Mesaj gönderme hatası' });
  }
};

const handleGroupMessage = async (socket, io, data) => {
  try {
    const { groupId, content } = data;
    const senderId = socket.user.user_id;

    if (!groupId || !content) {
      return socket.emit('error', { message: 'Eksik grup mesajı bilgisi' });
    }

    // ⭐ 1️⃣ Kullanıcı gerçekten bu gruba üye mi? Kontrol et
    const isMember = await groupMemberRepository.isUserMemberOfGroup(groupId, senderId);
    if (!isMember) {
      return socket.emit('error', { message: 'Bu grubun üyesi değilsiniz.' });
    }

    // ⭐ 2️⃣ Mesajı kaydet
    const savedGroupMessage = await groupMessageRepository.sendGroupMessage({
      group_id: groupId,
      sender_id: senderId,
      content,
    });

    // ⭐ 3️⃣ Gruptaki herkese gönder
    io.to(`group_${groupId}`).emit('group_message', savedGroupMessage);

    // ⭐ 4️⃣ Göndericiye onay gönder
    socket.emit('message_sent', savedGroupMessage);

  } catch (error) {
    console.error('Group message error:', error.message);
    socket.emit('error', { message: 'Grup mesajı gönderme hatası' });
  }
};

const handleJoinGroup = (socket, groupId) => {
  socket.join(`group_${groupId}`);
  console.log(`✅ User ${socket.user.user_id} joined group_${groupId}`);
};

const handleLeaveGroup = (socket, groupId) => {
  socket.leave(`group_${groupId}`);
  console.log(`🚪 User ${socket.user.user_id} left group_${groupId}`);
};

const handleDisconnect = (socket) => {
  console.log(`❌ User disconnected: ${socket.user.user_id}`);
};

module.exports = {
  handlePrivateMessage,
  handleGroupMessage,
  handleJoinGroup,
  handleLeaveGroup,
  handleDisconnect,
};

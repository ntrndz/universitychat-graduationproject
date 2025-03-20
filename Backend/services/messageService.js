const messageRepository = require('../repositories/messageRepository');

// Mesaj gönderme
const sendMessage = async (sender_id, receiver_id, content) => {
  const messageData = {
    sender_id,
    receiver_id,
    content,
    is_read: false, // İlk gönderildiğinde okunmamış olacak
  };

  return await messageRepository.sendMessage(messageData);
};

// İki kullanıcı arasındaki mesajları getirme
const getMessagesBetweenUsers = async (user1_id, user2_id) => {
  return await messageRepository.getMessagesBetweenUsers(user1_id, user2_id);
};

// Mesajı okundu olarak işaretleme
const markMessageAsRead = async (message_id) => {
  return await messageRepository.markMessageAsRead(message_id);
};

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
};

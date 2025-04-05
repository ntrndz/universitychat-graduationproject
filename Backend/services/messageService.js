const messageRepository = require('../repositories/messageRepository');

// Mesaj gönderme
const sendMessage = async (sender_id, receiver_id, content) => {
  const receiver = await userRepository.findUserById(receiver_id);
  if (!receiver) {
    throw new Error('Alıcı bulunamadı');
  }
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
  if (!user1_id || !user2_id) {
    throw new Error('Kullanıcı ID\'leri zorunludur.');
  }

  if (user1_id === parseInt(user2_id)) {
    throw new Error('Kendi kendine mesaj geçmişi sorgulanamaz.');
  }

  const isAuthorized = await messageRepository.checkUserInConversation(user1_id, user2_id);
  if (!isAuthorized) {
    throw new Error('Bu konuşmaya erişim yetkiniz yok.');
  }

  return await messageRepository.getMessagesBetweenUsers(user1_id, user2_id);
};
// Mesajı okundu olarak işaretleme
const markMessageAsRead = async (message_id, user_id) => {
  const message = await messageRepository.getMessageById(message_id);

  if (!message) {
    throw new Error('Mesaj bulunamadı');
  }

  // ✅ Sadece mesajın alıcısı okuyabilir
  if (message.receiver_id !== user_id) {
    throw new Error('Bu mesajı okuma yetkiniz yok');
  }

  await messageRepository.markMessageAsRead(message_id);
};

const getConversationsForUser = async (user_id) => {
  return await messageRepository.getConversationsForUser(user_id);
};

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
  getConversationsForUser
};

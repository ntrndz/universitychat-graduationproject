const messageService = require('../services/messageService');

// 📥 Mesaj gönderme endpointi
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.user_id; // JWT'den gelen user_id
    const { receiver_id, content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ success: false, message: 'receiver_id ve content zorunludur.' });
    }

    const newMessage = await messageService.sendMessage(sender_id, receiver_id, content);

    res.status(201).json({ success: true, message: 'Mesaj başarıyla gönderildi.', data: newMessage });
  } catch (error) {
    console.error('Mesaj gönderme hatası:', error.message);
    res.status(500).json({ success: false, message: 'Mesaj gönderilirken hata oluştu.' });
  }
};

// 📥 İki kullanıcı arasındaki mesajları getirme endpointi
const getMessagesBetweenUsers = async (req, res) => {
  try {
    const user1_id = req.user.user_id; // JWT'den gelen kullanıcı
    const user2_id = req.params.userId; // Diğer kullanıcı

    const messages = await messageService.getMessagesBetweenUsers(user1_id, user2_id);

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Mesajları çekme hatası:', error.message);
    res.status(500).json({ success: false, message: 'Mesajlar alınırken hata oluştu.' });
  }
};

// 📥 Mesajı okundu olarak işaretleme
const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    await messageService.markMessageAsRead(messageId);

    res.status(200).json({ success: true, message: 'Mesaj okundu olarak işaretlendi.' });
  } catch (error) {
    console.error('Mesaj okundu işaretleme hatası:', error.message);
    res.status(500).json({ success: false, message: 'İşlem sırasında hata oluştu.' });
  }
};
const getConversations = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const conversations = await messageService.getConversationsForUser(userId);
    res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    console.error('Conversations fetch error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch conversations' });
  }
};

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
  getConversations
};

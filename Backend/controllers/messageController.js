const messageService = require('../services/messageService');

// 📥 Mesaj gönderme endpointi
const sendMessage = async (req, res) => {
  try {
    const sender_id = req.user.user_id;
    const { receiver_id } = req.params;
    const { content } = req.body;

    if (!receiver_id || !content) {
      return res.status(400).json({ success: false, message: 'receiver_id ve content zorunludur.' });
    }

    const newMessage = await messageService.sendMessage(sender_id, receiver_id, content);

    res.status(201).json({ success: true, message: 'Mesaj başarıyla gönderildi.', data: newMessage });

  } catch (error) {
    const status = error.message === 'Alıcı bulunamadı.' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};



// 📥 İki kullanıcı arasındaki mesajları getirme endpointi
const getMessagesBetweenUsers = async (req, res) => {
  try {
    const user1_id = req.user.user_id; // JWT'den gelen kullanıcı
    const user2_id = req.params.userId; // Diğer kullanıcı (endpoint’ten gelen)

    const messages = await messageService.getMessagesBetweenUsers(user1_id, user2_id);

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Mesajları çekme hatası:', error.message);
    
    const status = error.message.includes('yetkiniz') ? 403
                  : error.message.includes('zorunlu') ? 400
                  : 500;

    res.status(status).json({ success: false, message: error.message });
  }
};


// 📥 Mesajı okundu olarak işaretleme
const markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.user_id;

    await messageService.markMessageAsRead(messageId, userId);

    res.status(200).json({ success: true, message: 'Mesaj okundu olarak işaretlendi.' });
  } catch (error) {
    const status = error.message.includes('yetkiniz yok') ? 403 : 404;
    res.status(status).json({ success: false, message: error.message });
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

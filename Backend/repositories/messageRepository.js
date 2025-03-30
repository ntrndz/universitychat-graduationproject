const { Message ,User } = require('../models');
const { Op } = require('sequelize');

const sendMessage = async (messageData) => {
  return await Message.create(messageData);
};

const getMessagesBetweenUsers = async (user1_id, user2_id) => {
  return await Message.findAll({
    where: {
      [Op.or]: [
        { sender_id: user1_id, receiver_id: user2_id },
        { sender_id: user2_id, receiver_id: user1_id }
      ]
    },
    order: [['sent_at', 'ASC']],
  });
};

const markMessageAsRead = async (message_id) => {
  return await Message.update({ is_read: true }, { where: { message_id } });
};

const getConversationsForUser = async (userId) => {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [{ sender_id: userId }, { receiver_id: userId }]
    },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['user_id', 'first_name', 'last_name']
      },
      {
        model: User,
        as: 'receiver',
        attributes: ['user_id', 'first_name', 'last_name']
      }
    ],
    order: [['sent_at', 'DESC']]
  });

  // Mesajlardan benzersiz kişi listesi çıkar
  const uniqueUsers = new Map();
  messages.forEach((msg) => {
    const otherUser = msg.sender_id === userId ? msg.receiver : msg.sender;
    if (!uniqueUsers.has(otherUser.user_id)) {
      uniqueUsers.set(otherUser.user_id, {
        user_id: otherUser.user_id,
        first_name: otherUser.first_name,
        last_name: otherUser.last_name,
        last_message: msg.content,
        last_sent_at: msg.sent_at
      });
    }
  });

  return Array.from(uniqueUsers.values());
};


module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
  getConversationsForUser
};

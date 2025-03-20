const { Message } = require('../models');
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

module.exports = {
  sendMessage,
  getMessagesBetweenUsers,
  markMessageAsRead,
};

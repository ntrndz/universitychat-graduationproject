const { GroupMessage } = require('../models');

const sendGroupMessage = async (messageData) => {
  return await GroupMessage.create(messageData);
};

const getMessagesByGroup = async (group_id) => {
  return await GroupMessage.findAll({
    where: { group_id },
    order: [['sent_at', 'ASC']],
  });
};

module.exports = {
  sendGroupMessage,
  getMessagesByGroup,
};

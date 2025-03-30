const messageRepository = require('../repositories/messageRepository');
const groupMemberRepository = require('../repositories/groupMemberRepository');

// 
const getUserDashboardData = async (userId) => {
  const conversations = await messageRepository.getConversationsForUser(userId);
  const groups = await groupMemberRepository.getUserGroups(userId);

  return { conversations, groups };
};

module.exports = { getUserDashboardData };

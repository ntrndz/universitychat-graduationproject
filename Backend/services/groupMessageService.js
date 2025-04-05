const groupMessageRepository = require('../repositories/groupMessageRepository');
const groupMemberService = require('../services/groupMemberService');

const sendGroupMessage = async (group_id, sender_id, content) => {
    if (!group_id || !sender_id || !content) {
        throw new Error("Group ID, sender ID and message content are required");
    }
    const isMember = await groupMemberService.isUserMemberOfGroup(group_id, sender_id);
    if (!isMember) {
      throw new Error("Bu gruba mesaj gönderme yetkiniz yok.");
    }

    const message = await groupMessageRepository.sendGroupMessage({
        group_id,
        sender_id,
        content,
        sent_at: new Date(),
    });

    return { success: true, message: "Group message sent successfully", data: message };
};

const getMessagesByGroup = async (group_id, user_id) => {
  const isMember = await groupMemberService.isUserMemberOfGroup(group_id, user_id);
  if (!isMember) {
    throw new Error("Bu gruba erişim yetkiniz yok.");
  }

  const messages = await groupMessageRepository.getMessagesByGroup(group_id);
  return { success: true, data: messages };
};


module.exports = {
    sendGroupMessage,
    getMessagesByGroup,
};

const groupMessageRepository = require('../repositories/groupMessageRepository');

const sendGroupMessage = async (group_id, sender_id, content) => {
    if (!group_id || !sender_id || !content) {
        throw new Error("Group ID, sender ID and message content are required");
    }

    const message = await groupMessageRepository.sendGroupMessage({
        group_id,
        sender_id,
        content,
        sent_at: new Date(),
    });

    return { success: true, message: "Group message sent successfully", data: message };
};

const getMessagesByGroup = async (group_id) => {
    const messages = await groupMessageRepository.getMessagesByGroup(group_id);
    return { success: true, data: messages };
};

module.exports = {
    sendGroupMessage,
    getMessagesByGroup,
};

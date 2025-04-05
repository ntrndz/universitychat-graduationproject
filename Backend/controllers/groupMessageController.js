const groupMessageService = require('../services/groupMessageService');

const sendGroupMessage = async (req, res) => {
    try {
        const { group_id, content } = req.body;
        const sender_id = req.user.user_id;  // Auth middleware’den gelen

        const result = await groupMessageService.sendGroupMessage(group_id, sender_id, content);
        res.status(201).json(result);
    } catch (error) {
        console.error("Send group message error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMessagesByGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const userId = req.user.user_id;
  
      const isMember = await groupMemberService.isUserMemberOfGroup(groupId, userId);
      if (!isMember) {
        return res.status(403).json({ success: false, message: "Bu gruba erişim yetkiniz yok" });
      }
  
      const result = await groupMessageService.getMessagesByGroup(groupId);
      res.status(200).json(result);
    } catch (error) {
      console.error("Fetch group messages error:", error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  };
  

module.exports = {
    sendGroupMessage,
    getMessagesByGroup,
};

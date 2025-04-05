const groupMemberService = require('../services/groupMemberService');

const addMember = async (req, res) => {
  try {
    const { group_id, user_id } = req.body;
    const requesterUser = req.user;

    const result = await groupMemberService.addMember(group_id, user_id, requesterUser);
    res.status(201).json(result);
  } catch (error) {
    console.error("Add member error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

  

const removeMember = async (req, res) => {
    try {
        const { group_id, user_id } = req.body;
        const requesterUser = req.user; // ✔ yetki için gönderiyoruz

        const result = await groupMemberService.removeMember(group_id, user_id, requesterUser);
        res.status(200).json(result);
    } catch (error) {
        console.error("Remove member error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};


const getMembersByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const requesterUserId = req.user.user_id; // ✔ buradan gelen id'yi kontrol ediyoruz

        const result = await groupMemberService.getMembersByGroup(groupId, requesterUserId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Fetch group members error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};
const getUserGroups = async (req, res) => {
    try {
      const userId = req.user.user_id;
      const groups = await groupMemberService.getUserGroups(userId);
      res.status(200).json({ success: true, data: groups });
    } catch (error) {
      console.error('Fetch user groups error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch user groups' });
    }
  };
  

module.exports = {
    addMember,
    removeMember,
    getMembersByGroup,
    getUserGroups
};

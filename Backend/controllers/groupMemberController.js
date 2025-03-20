const groupMemberService = require('../services/groupMemberService');

const addMember = async (req, res) => {
    try {
        const { group_id, user_id } = req.body;
        const result = await groupMemberService.addMember(group_id, user_id);
        res.status(201).json(result);
    } catch (error) {
        console.error("Add member error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeMember = async (req, res) => {
    try {
        const { group_id, user_id } = req.body;
        const result = await groupMemberService.removeMember(group_id, user_id);
        res.status(200).json(result);
    } catch (error) {
        console.error("Remove member error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

const getMembersByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const result = await groupMemberService.getMembersByGroup(groupId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Fetch group members error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    addMember,
    removeMember,
    getMembersByGroup,
};

const groupService = require('../services/groupService');

const createGroup = async (req, res) => {
    try {
        const { group_name } = req.body;
        const created_by = req.user.user_id; // Auth middleware sayesinde geliyor

        const result = await groupService.createGroup(group_name, created_by);
        res.status(201).json(result);
    } catch (error) {
        console.error("Create group error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(200).json(groups);
    } catch (error) {
        console.error("Fetch groups error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getGroupById = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await groupService.getGroupById(groupId);
        res.status(200).json(group);
    } catch (error) {
        console.error("Fetch group by ID error:", error.message);
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
};

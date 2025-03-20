const groupRepository = require('../repositories/groupRepository');

const createGroup = async (group_name, created_by) => {
    if (!group_name || !created_by) {
        throw new Error("Group name and creator ID are required");
    }

    const newGroup = await groupRepository.createGroup({
        group_name,
        created_by,
        created_at: new Date(),
    });

    return { success: true, message: "Group created successfully", data: newGroup };
};

const getAllGroups = async () => {
    const groups = await groupRepository.getAllGroups();
    return { success: true, data: groups };
};

const getGroupById = async (group_id) => {
    const group = await groupRepository.findGroupById(group_id);
    if (!group) {
        throw new Error("Group not found");
    }
    return { success: true, data: group };
};

module.exports = {
    createGroup,
    getAllGroups,
    getGroupById,
};

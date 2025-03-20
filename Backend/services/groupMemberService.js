const groupMemberRepository = require('../repositories/groupMemberRepository');

const addMember = async (group_id, user_id) => {
    if (!group_id || !user_id) {
        throw new Error("Group ID and User ID are required");
    }

    const newMember = await groupMemberRepository.addMember(group_id, user_id);
    return { success: true, message: "Member added to group successfully", data: newMember };
};

const removeMember = async (group_id, user_id) => {
    await groupMemberRepository.removeMember(group_id, user_id);
    return { success: true, message: "Member removed from group successfully" };
};

const getMembersByGroup = async (group_id) => {
    const members = await groupMemberRepository.getMembersByGroup(group_id);
    return { success: true, data: members };
};

module.exports = {
    addMember,
    removeMember,
    getMembersByGroup,
};

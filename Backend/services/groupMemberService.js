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
const getUserGroups = async (user_id) => {
    const memberships = await groupMemberRepository.getUserGroups(user_id);
    return memberships.map((m) => ({
      group_id: m.group.group_id,
      group_name: m.group.group_name,
      created_by: m.group.created_by,
      joined_at: m.joined_at
    }));
  };

module.exports = {
    addMember,
    removeMember,
    getMembersByGroup,
    getUserGroups
};

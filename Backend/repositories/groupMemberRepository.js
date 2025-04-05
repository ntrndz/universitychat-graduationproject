const { GroupMember } = require('../models');

const addMember = async (group_id, user_id) => {
  return await GroupMember.create({ group_id, user_id });
};

const removeMember = async (group_id, user_id) => {
  return await GroupMember.destroy({ where: { group_id, user_id } });
};

const getMembersByGroup = async (group_id) => {
  return await GroupMember.findAll({ where: { group_id } });
};

const getUserGroups = async (user_id) => {
  return await GroupMember.findAll({
    where: { user_id },
    include: [
      {
        model: Group,
        as: 'group',
        attributes: ['group_id', 'group_name', 'created_by', 'created_at']
      }
    ]
  });
};
const isUserMemberOfGroup = async (group_id, user_id) => {
  const member = await GroupMember.findOne({
    where: { group_id, user_id },
  });
  return !!member;
};

module.exports = {
  addMember,
  removeMember,
  getMembersByGroup,
  getUserGroups,
  isUserMemberOfGroup
};

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

module.exports = {
  addMember,
  removeMember,
  getMembersByGroup,
};

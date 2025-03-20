const { Group } = require('../models');

const createGroup = async (groupData) => {
  return await Group.create(groupData);
};

const findGroupById = async (group_id) => {
  return await Group.findByPk(group_id);
};

const getAllGroups = async () => {
  return await Group.findAll();
};

module.exports = {
  createGroup,
  findGroupById,
  getAllGroups,
};

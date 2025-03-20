const { UserRole } = require('../models');

const getAllRoles = async () => {
  return await UserRole.findAll();
};

const getRoleById = async (role_id) => {
  return await UserRole.findByPk(role_id);
};

const createRole = async (roleData) => {
  return await UserRole.create(roleData);
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
};

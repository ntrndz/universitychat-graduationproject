const { User } = require('../models');
const { Op } = require('sequelize');

const findAllUsers = async (offset, limit, search) => {
  const whereCondition = search
    ? { email: { [Op.iLike]: `%${search}%` } }
    : {};

  return await User.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [['first_name', 'ASC']],
  });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const findUserById = async (user_id) => {
  return await User.findByPk(user_id);
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (user_id, updateData) => {
  return await User.update(updateData, { where: { user_id } });
};

const deleteUser = async (user_id) => {
  return await User.destroy({ where: { user_id } });
};

const updateUserRefreshToken = async (user_id, refreshToken) => {
    return await User.update(
      { refresh_token: refreshToken }, 
      { where: { user_id } } // 🔥 
    );
};

//nehir ekledi search kısmı için

const searchUsers = async (q) => {
  return await User.findAll({
    where: {
      [Op.or]: [
        { first_name: { [Op.iLike]: `%${q}%` } },
        { last_name: { [Op.iLike]: `%${q}%` } },
        { email: { [Op.iLike]: `%${q}%` } }
      ]
    },
    attributes: ['user_id', 'first_name', 'last_name', 'email'],
    limit: 10
  });
};


module.exports = {
  findAllUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRefreshToken,
  searchUsers
};

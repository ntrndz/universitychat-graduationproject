const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PollOption = sequelize.define(
  'PollOption',
  {
    option_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'poll_options',
    timestamps: false,
  }
);

module.exports = PollOption;

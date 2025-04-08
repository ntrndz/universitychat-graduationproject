const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PollResponse = sequelize.define(
  'PollResponse',
  {
    response_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poll_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answered_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'poll_responses',
    timestamps: false,
  }
);

module.exports = PollResponse;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Poll = sequelize.define(
  'Poll',
  {
    poll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'polls',
    timestamps: false,
  }
);

module.exports = Poll;

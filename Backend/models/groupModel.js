const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define(
    'Group',
    {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        group_name: {
            type: DataTypes.STRING(255),
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
        tableName: 'groups',
        timestamps: false,
    }
);

module.exports = Group;

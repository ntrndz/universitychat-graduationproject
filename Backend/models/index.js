const User = require('./userModel');
const UserRole = require('./userRoleModel');
const Message = require('./messageModel');
const Group = require('./groupModel');
const GroupMember = require('./groupMemberModel');
const GroupMessage = require('./groupMessageModel');

// User -> Role (1:N)
User.belongsTo(UserRole, { foreignKey: 'role_id' });
UserRole.hasMany(User, { foreignKey: 'role_id' });

// Messages (1:1 between users)
User.hasMany(Message, { foreignKey: 'sender_id' });
User.hasMany(Message, { foreignKey: 'receiver_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'receiver_id' });

// Groups (1:N)
User.hasMany(Group, { foreignKey: 'created_by' });
Group.belongsTo(User, { foreignKey: 'created_by' });

// Group Members (N:N)
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'user_id' });

// Group Messages (1:N)
Group.hasMany(GroupMessage, { foreignKey: 'group_id' });
GroupMessage.belongsTo(Group, { foreignKey: 'group_id' });
User.hasMany(GroupMessage, { foreignKey: 'sender_id' });
GroupMessage.belongsTo(User, { foreignKey: 'sender_id' });

module.exports = {
    User,
    UserRole,
    Message,
    Group,
    GroupMember,
    GroupMessage,
};

const User = require('./userModel');
const UserRole = require('./userRoleModel');
const Message = require('./messageModel');
const Group = require('./groupModel');
const GroupMember = require('./groupMemberModel');
const GroupMessage = require('./groupMessageModel');

// 🔸 User → UserRole (1:N)
User.belongsTo(UserRole, { foreignKey: 'role_id', as: 'role' }); // 🔥 as: 'role' sayesinde include ile erişebilirsin
UserRole.hasMany(User, { foreignKey: 'role_id' });

// 🔸 User ↔ Message (Private Messages)
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

// 🔸 User → Group (Oluşturduğu gruplar)
User.hasMany(Group, { foreignKey: 'created_by', as: 'createdGroups' });
Group.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// 🔸 User ↔ Group (Üyelik - N:N)
User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: 'user_id',
  otherKey: 'group_id',
  as: 'memberGroups',
});
Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: 'group_id',
  otherKey: 'user_id',
  as: 'members',
});

// 🔸 GroupMember → Group (N:1) (Join işlemleri için)
GroupMember.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
GroupMember.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 🔸 Group → GroupMessage (1:N)
Group.hasMany(GroupMessage, { foreignKey: 'group_id', as: 'messages' });
GroupMessage.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });

// 🔸 User → GroupMessage (Gönderici)
User.hasMany(GroupMessage, { foreignKey: 'sender_id', as: 'sentGroupMessages' });
GroupMessage.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

module.exports = {
  User,
  UserRole,
  Message,
  Group,
  GroupMember,
  GroupMessage,
};

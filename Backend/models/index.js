const User = require('./userModel');
const UserRole = require('./userRoleModel');
const Message = require('./messageModel');
const Group = require('./groupModel');
const GroupMember = require('./groupMemberModel');
const GroupMessage = require('./groupMessageModel');
const Poll = require('./pollModel');
const PollOption = require('./pollOptionModel');
const PollResponse = require('./pollResponseModel');

// 🔸 User → UserRole (1:N)
User.belongsTo(UserRole, { foreignKey: 'role_id', as: 'role' });
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

// 🔸 GroupMember → Group/User
GroupMember.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });
GroupMember.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 🔸 Group → GroupMessage (1:N)
Group.hasMany(GroupMessage, { foreignKey: 'group_id', as: 'messages' });
GroupMessage.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });

// 🔸 User → GroupMessage
User.hasMany(GroupMessage, { foreignKey: 'sender_id', as: 'sentGroupMessages' });
GroupMessage.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });


// ✅ Anket İlişkileri
// 🔸 Group → Poll (1:N)
Group.hasMany(Poll, { foreignKey: 'group_id', as: 'polls' });
Poll.belongsTo(Group, { foreignKey: 'group_id', as: 'group' });

// 🔸 Poll → PollOption (1:N)
Poll.hasMany(PollOption, { foreignKey: 'poll_id', as: 'options' });
PollOption.belongsTo(Poll, { foreignKey: 'poll_id', as: 'poll' });

// 🔸 Poll → PollResponse (1:N)
Poll.hasMany(PollResponse, { foreignKey: 'poll_id', as: 'responses' });
PollResponse.belongsTo(Poll, { foreignKey: 'poll_id', as: 'poll' });

// 🔸 User → PollResponse (1:N)
User.hasMany(PollResponse, { foreignKey: 'user_id', as: 'pollResponses' });
PollResponse.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// 🔸 PollOption → PollResponse (1:N)
PollOption.hasMany(PollResponse, { foreignKey: 'option_id', as: 'responses' });
PollResponse.belongsTo(PollOption, { foreignKey: 'option_id', as: 'option' });

module.exports = {
  User,
  UserRole,
  Message,
  Group,
  GroupMember,
  GroupMessage,
  Poll,
  PollOption,
  PollResponse
};

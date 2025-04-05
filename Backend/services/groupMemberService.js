const groupRepository = require("../repositories/groupRepository");
const userRepository = require("../repositories/userRepository");
const groupMemberRepository = require("../repositories/groupMemberRepository");

const addMember = async (group_id, user_id_to_add, requester_user) => {
  const targetUser = await userRepository.findUserById(user_id_to_add);
  if (!targetUser) {
    throw new Error("Eklenecek kullanıcı bulunamadı");
  }
  if (!group_id || !user_id_to_add) {
    throw new Error("Group ID and User ID are required");
  }

  // 1️⃣ Grubu getir
  const group = await groupRepository.findGroupById(group_id);
  if (!group) {
    throw new Error("Grup bulunamadı");
  }

  // 2️⃣ Yetki kontrolü (rol kontrolü veya grup sahibi)
  const isOwner = group.created_by === requester_user.user_id;
  const isTeacherOrMaintainer = [2, 3].includes(requester_user.role_id);

  if (!isOwner && !isTeacherOrMaintainer) {
    throw new Error("Bu gruba kullanıcı ekleme yetkiniz yok");
  }

  // 3️⃣ Aynı kullanıcı zaten üyeyse tekrar eklenmesin
  const alreadyMember = await groupMemberRepository.isUserMemberOfGroup(
    group_id,
    user_id_to_add
  );
  if (alreadyMember) {
    throw new Error("Kullanıcı zaten bu grubun üyesi");
  }

  const newMember = await groupMemberRepository.addMember(
    group_id,
    user_id_to_add
  );
  return { success: true, message: "Üye başarıyla eklendi", data: newMember };
};

const removeMember = async (group_id, user_id_to_remove, requester_user) => {
    const group = await groupRepository.findGroupById(group_id);
    const isOwner = group.created_by === requester_user.user_id;
    const isTeacherOrMaintainer = [2, 3].includes(requester_user.role_id);
  
    if (!isOwner && !isTeacherOrMaintainer) {
      throw new Error("Bu gruptan kullanıcı çıkarma yetkiniz yok");
    }
  
    await groupMemberRepository.removeMember(group_id, user_id_to_remove);
    return { success: true, message: "Üye başarıyla çıkarıldı" };
  };
  
  
const getMembersByGroup = async (group_id, requester_user_id) => {
  const isMember = await isUserMemberOfGroup(group_id, requester_user_id);
  if (!isMember) {
    throw new Error("Bu grubun üyelerini görme yetkiniz yok.");
  }

  const members = await groupMemberRepository.getMembersByGroup(group_id);
  return { success: true, data: members };
};
const getUserGroups = async (user_id) => {
  const memberships = await groupMemberRepository.getUserGroups(user_id);
  return memberships.map((m) => ({
    group_id: m.group.group_id,
    group_name: m.group.group_name,
    created_by: m.group.created_by,
    joined_at: m.joined_at,
  }));
};
const isUserMemberOfGroup = async (group_id, user_id) => {
  if (!group_id || !user_id) {
    throw new Error("Group ID ve User ID zorunludur");
  }

  return await groupMemberRepository.isUserMemberOfGroup(group_id, user_id);
};

module.exports = {
  addMember,
  removeMember,
  getMembersByGroup,
  getUserGroups,
  isUserMemberOfGroup,
};

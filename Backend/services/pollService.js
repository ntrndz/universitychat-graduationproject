const pollRepository = require('../repositories/pollRepository');
const groupMemberService = require('./groupMemberService');

const createPoll = async (group_id, question, created_by) => {
  if (!group_id || !question || !created_by) {
    throw new Error("Grup, soru ve oluşturan kullanıcı ID zorunludur.");
  }

  const isMember = await groupMemberService.isUserMemberOfGroup(group_id, created_by);
  if (!isMember) {
    throw new Error("Bu gruba anket oluşturma yetkiniz yok.");
  }

  const newPoll = await pollRepository.createPoll({
    group_id,
    question,
    created_by,
    created_at: new Date(),
  });

  return { success: true, message: "Anket oluşturuldu", data: newPoll };
};

const getPollById = async (poll_id, user_id) => {
  const poll = await pollRepository.findPollById(poll_id);
  if (!poll) {
    throw new Error("Anket bulunamadı");
  }

  const isMember = await groupMemberService.isUserMemberOfGroup(poll.group_id, user_id);
  if (!isMember) {
    throw new Error("Bu ankete erişim yetkiniz yok.");
  }

  return { success: true, data: poll };
};

const getPollsByGroup = async (group_id, user_id) => {
  const isMember = await groupMemberService.isUserMemberOfGroup(group_id, user_id);
  if (!isMember) {
    throw new Error("Bu grubun anketlerini görüntüleme yetkiniz yok.");
  }

  const polls = await pollRepository.findPollsByGroup(group_id);
  return { success: true, data: polls };
};

module.exports = {
  createPoll,
  getPollById,
  getPollsByGroup,
};

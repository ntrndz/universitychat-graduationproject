const pollVoteRepository = require('../repositories/pollVoteRepository');
const pollOptionRepository = require('../repositories/pollOptionRepository');
const pollRepository = require('../repositories/pollRepository');
const groupMemberService = require('./groupMemberService');

const voteInPoll = async (poll_id, option_id, user_id) => {
  if (!poll_id || !option_id || !user_id) {
    throw new Error("Poll ID, Option ID ve User ID zorunludur");
  }

  // Kullanıcı zaten oy vermiş mi?
  const alreadyVoted = await pollVoteRepository.checkUserVoted(poll_id, user_id);
  if (alreadyVoted) {
    throw new Error("Bu ankete zaten oy verdiniz");
  }

  // Seçenek gerçekten bu ankete mi ait?
  const option = await pollOptionRepository.getOptionById(option_id);
  if (!option || option.poll_id !== poll_id) {
    throw new Error("Seçenek geçerli değil veya bu ankete ait değil");
  }

  // 🛡️ Kullanıcı, bu ankete ait grubun üyesi mi?
  const poll = await pollRepository.findPollById(poll_id);
  const isMember = await groupMemberService.isUserMemberOfGroup(poll.group_id, user_id);
  if (!isMember) {
    throw new Error("Bu ankete oy verme yetkiniz yok.");
  }

  const newVote = await pollVoteRepository.createPollVote({
    poll_id,
    option_id,
    user_id,
  });

  return { success: true, message: "Oyunuz kaydedildi", data: newVote };
};

const getVotesByPollId = async (poll_id, user_id) => {
  const poll = await pollRepository.findPollById(poll_id);
  if (!poll) {
    throw new Error("Anket bulunamadı");
  }

  const isMember = await groupMemberService.isUserMemberOfGroup(poll.group_id, user_id);
  if (!isMember) {
    throw new Error("Bu anketin sonuçlarını görme yetkiniz yok.");
  }

  const votes = await pollVoteRepository.getVotesByPollId(poll_id);
  return { success: true, data: votes };
};

module.exports = {
  voteInPoll,
  getVotesByPollId,
};

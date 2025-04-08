const { PollVote } = require('../models');

// ✅ Oy kullan
const castVote = async (voteData) => {
  return await PollVote.create(voteData);
};

// ✅ Kullanıcı bu ankete daha önce oy verdi mi?
const hasUserVoted = async (poll_id, user_id) => {
  const vote = await PollVote.findOne({ where: { poll_id, user_id } });
  return !!vote;
};

// ✅ Belirli bir seçeneğe verilen oy sayısını getir
const countVotesByOption = async (poll_id) => {
  const votes = await PollVote.findAll({
    where: { poll_id },
    attributes: ['option_id'],
  });

  // Elle sayım (gerekirse Sequelize aggregation ile geliştirilebilir)
  const counts = {};
  for (const vote of votes) {
    const optionId = vote.option_id;
    counts[optionId] = (counts[optionId] || 0) + 1;
  }

  return counts;
};

module.exports = {
  castVote,
  hasUserVoted,
  countVotesByOption,
};

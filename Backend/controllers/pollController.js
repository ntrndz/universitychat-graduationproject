const pollService = require('../services/pollService');
const pollOptionService = require('../services/pollOptionService');
const pollVoteService = require('../services/pollVoteService');
const groupMemberService = require('../services/groupMemberService');

// 🔹 Anket oluştur (herkes oluşturabilir, ama grup üyesi olmalı)
const createPoll = async (req, res) => {
  try {
    const { question, group_id, options } = req.body;
    const created_by = req.user.user_id;

    const isMember = await groupMemberService.isUserMemberOfGroup(group_id, created_by);
    if (!isMember) {
      return res.status(403).json({ success: false, message: "Bu gruba anket oluşturma yetkiniz yok." });
    }

    const result = await pollService.createPoll(group_id, question, created_by, options);
    res.status(201).json(result);
  } catch (error) {
    console.error("Anket oluşturma hatası:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Belirli bir gruba ait anketleri getir
const getPollsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.user_id;

    const isMember = await groupMemberService.isUserMemberOfGroup(groupId, userId);
    if (!isMember) {
      return res.status(403).json({ success: false, message: "Bu grubun anketlerini görüntüleme yetkiniz yok." });
    }

    const result = await pollService.getPollsByGroup(groupId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Poll çekme hatası:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Ankete oy ver
const voteInPoll = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { poll_id, option_id } = req.body;

    const result = await pollVoteService.voteInPoll(poll_id, option_id, user_id);
    res.status(201).json(result);
  } catch (error) {
    console.error("Vote error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Bir anketin sonuçlarını getir (grup üyesi kontrolü yapılır)
const getPollVotes = async (req, res) => {
  try {
    const { pollId } = req.params;
    const user_id = req.user.user_id;

    const result = await pollVoteService.getVotesByPollId(pollId, user_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Poll votes fetch error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPoll,
  getPollsByGroup,
  voteInPoll,
  getPollVotes,
};

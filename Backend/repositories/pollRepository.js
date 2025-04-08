const { Poll } = require('../models');

// ✅ Yeni anket oluştur
const createPoll = async (pollData) => {
  return await Poll.create(pollData);
};

// ✅ Tüm anketleri getir
const getAllPolls = async () => {
  return await Poll.findAll();
};

// ✅ Belirli bir anketi ID ile getir
const getPollById = async (poll_id) => {
  return await Poll.findByPk(poll_id);
};

module.exports = {
  createPoll,
  getAllPolls,
  getPollById,
};

const { PollOption } = require('../models');

// ✅ Seçenek oluştur
const createOption = async (optionData) => {
  return await PollOption.create(optionData);
};

// ✅ Belirli bir ankete ait tüm seçenekleri getir
const getOptionsByPollId = async (poll_id) => {
  return await PollOption.findAll({
    where: { poll_id },
    order: [['poll_option_id', 'ASC']]
  });
};

module.exports = {
  createOption,
  getOptionsByPollId,
};

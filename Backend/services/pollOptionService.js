const pollOptionRepository = require('../repositories/pollOptionRepository');

const addOptionToPoll = async (poll_id, option_text) => {
  if (!poll_id || !option_text) {
    throw new Error("Anket ID ve seçenek metni zorunludur");
  }

  const newOption = await pollOptionRepository.createPollOption({
    poll_id,
    option_text,
  });

  return { success: true, message: "Seçenek eklendi", data: newOption };
};

const getOptionsByPollId = async (poll_id) => {
  const options = await pollOptionRepository.getOptionsByPollId(poll_id);
  return { success: true, data: options };
};

module.exports = {
  addOptionToPoll,
  getOptionsByPollId,
};

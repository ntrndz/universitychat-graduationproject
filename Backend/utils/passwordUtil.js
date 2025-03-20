const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10) || 10);
    return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const userRepository = require('../repositories/userRepository');
const { validateEmailAndGetRole } = require('../utils/validators');


// Kullanıcı Kayıt (Register)
const register = async (email, password, firstName, lastName) => {
    // 1️⃣ E-posta doğrulama ve rol belirleme
    let role_id;
    try {
        role_id = validateEmailAndGetRole(email);
    } catch (error) {
        throw new Error('Invalid email format');
    }

    // 2️⃣ Aynı e-posta ile kayıtlı kullanıcı var mı?
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    // 3️⃣ Şifreyi hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Yeni kullanıcıyı oluşturma
    await userRepository.createUser({
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        role_id,
    });

    return { success: true, message: 'User registered successfully' };
};

// Kullanıcı Giriş (Login)
const login = async (email, password) => {
    // 1️⃣ Kullanıcıyı e-posta ile bul
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        return { success: false, message: 'User not found' };
    }

    // 2️⃣ Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { success: false, message: 'Invalid password' };
    }

    // 3️⃣ Tokenları oluştur
    const accessToken = jwtUtils.generateAccessToken(user);
    const refreshToken = jwtUtils.generateRefreshToken(user);

    // 4️⃣ Refresh Token'ı veritabanına kaydet
    await userRepository.updateUserRefreshToken(user.user_id, refreshToken);
     // ✅ Refresh token kaydedildikten sonra user’ı yeniden çekiyoruz
    const updatedUser = await userRepository.findUserById(user.user_id);

    return { success: true, user: updatedUser, accessToken, refreshToken };
};

// Kullanıcı Çıkış (Logout)
const logout = async (user_id) => {
    // Kullanıcının Refresh Token'ını sil
    await userRepository.updateUserRefreshToken(user_id, null);
    return { success: true, message: "User logged out successfully" };
};

// Token Yenileme (Refresh Token)
const refreshAccessToken = async (oldRefreshToken) => {
    if (!oldRefreshToken) {
        throw new Error('Refresh token is required');
    }

    // 1️⃣ Refresh Token'ı doğrula
    let decoded;
    try {
        decoded = jwtUtils.verifyToken(oldRefreshToken);
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }

    // 2️⃣ Kullanıcıyı bul
    const user = await userRepository.findUserById(decoded.user_id);
    if (!user || user.refresh_token !== oldRefreshToken) {
        throw new Error('Invalid refresh token');
    }

    // 3️⃣ Yeni tokenlar oluştur
    const newAccessToken = jwtUtils.generateAccessToken(user);
    const newRefreshToken = jwtUtils.generateRefreshToken(user);

    // 4️⃣ Yeni Refresh Token'ı veritabanına kaydet
    await userRepository.updateUserRefreshToken(user.user_id, newRefreshToken);

    return { success: true, accessToken: newAccessToken, refreshToken: newRefreshToken };
};
// Kullanıcı doğrulama işlemi (Token Geçerliliğini Kontrol)
const verifyUser = async (token) => {
    const decoded = jwtUtils.verifyToken(token);
  
    const user = await userRepository.findUserById(decoded.user_id);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
  
    return user.toJSON();
};
// Tüm Kullanıcıları Getir
const getAllUsers = async () => {
    return await userRepository.findAllUsers();
};

// Belirli Bir Kullanıcıyı Getir
const getUserById = async (user_id) => {
    return await userRepository.findUserById(user_id);
};

// Kullanıcı Güncelleme
const updateUser = async (user_id, updateData) => {
    return await userRepository.updateUser(user_id, updateData);
};

// Kullanıcı Silme
const deleteUser = async (user_id) => {
    return await userRepository.deleteUser(user_id);
};

module.exports = { register, login, logout, refreshAccessToken ,verifyUser,getAllUsers,getUserById,updateUser,deleteUser};

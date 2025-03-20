const userService = require('../services/userService');

// Kullanıcı Kayıt (Register)
const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const response = await userService.register(email, password, firstName, lastName);
        res.status(201).json(response);
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ message: error.message || 'Registration failed' });
    }
};

// Kullanıcı Giriş (Login)
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const response = await userService.login(email, password);
        if (!response.success) {
            return res.status(400).json({ message: response.message });
        }

        res.json(response);
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Login failed' });
    }
};

// Token Yenileme (Refresh Token)
const refreshToken = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];  
  
      if (!token) {
        return res.status(401).json({ success: false, message: "Refresh token bulunamadı" });
      }
  
    const { accessToken, refreshToken } = await userService.refreshAccessToken(token);

    res.status(200).json({ success: true, accessToken, refreshToken });

    } catch (error) {
      console.error("Refresh token error:", error.message);
      res.status(401).json({
        success: false,
        message: "Geçersiz veya süresi dolmuş refresh token",
      });
    }
  };

// Kullanıcı Çıkış (Logout)
const logout = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        await userService.logout(user_id);
        res.json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error('Logout Error:', error.message);
        res.status(500).json({ message: 'Logout failed' });
    }
};

// Kullanıcı Doğrulama (Token Geçerliliğini Kontrol)
const verify = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ success: false, message: "Token bulunamadı" });
      }
  
      const user = await userService.verifyUser(token);
  
      res.status(200).json({
        success: true,
        message: "Token geçerli",
        data: { user },
      });
    } catch (error) {
      console.error("Verify error:", error.message);
      res.status(401).json({
        success: false,
        message: error.message || "Geçersiz veya süresi dolmuş token",
      });
    }
};
// Tüm Kullanıcıları Getir
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Get All Users Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Belirli Bir Kullanıcıyı Getir
const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await userService.getUserById(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Get User By ID Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Kullanıcı Güncelleme
const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const updateData = req.body;

        const updatedUser = await userService.updateUser(user_id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Update User Error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Kullanıcı Silme
const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleted = await userService.deleteUser(user_id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { register, login, refreshToken, logout,verify,getAllUsers,getUserById, updateUser,deleteUser};

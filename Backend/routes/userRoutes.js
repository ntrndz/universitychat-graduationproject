const express = require('express');
const userController = require('../controllers/userController');
const {authMiddleware,maintainerMiddleware} = require('../middlewares/authMiddleware');

const router = express.Router();

// Kullanıcı kayıt
router.post('/register', userController.register);

// Kullanıcı giriş
router.post('/login', userController.login);

// Token yenileme
router.post('/refresh-token', userController.refreshToken);

// Kullanıcı çıkış (logout) - 🔒 Koruma altında, giriş yapmış kullanıcılar erişebilir
router.post('/logout', authMiddleware, userController.logout);

// Token doğrulama (verify) - 🔒 Koruma altında, giriş yapmış kullanıcılar erişebilir
router.get('/verify', authMiddleware, userController.verify);

// Tüm Kullanıcıları Getir
router.get('/all', authMiddleware,maintainerMiddleware, userController.getAllUsers);

// Belirli Bir Kullanıcıyı Getir
router.get('/:user_id', authMiddleware, userController.getUserById);

// Kullanıcı Güncelleme
router.put('/:user_id', authMiddleware, userController.updateUser);

// Kullanıcı Silme
router.delete('/:user_id', authMiddleware,maintainerMiddleware, userController.deleteUser);

module.exports = router;

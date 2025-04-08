// routes/pollRoutes.js
const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");
const authMiddleware = require("../middlewares/authMiddleware");

// 🟢 Auth gerekli tüm işlemler için
router.post("/", authMiddleware, pollController.createPoll); // Anket oluştur
router.get("/group/:groupId", authMiddleware, pollController.getPollsByGroup); // Grubun anketlerini getir
router.post("/:pollId/vote", authMiddleware, pollController.voteInPoll); // Oylama yap
router.get("/:pollId/votes", authMiddleware, pollController.getPollVotes); // Oylama sonuçlarını getir

module.exports = router;

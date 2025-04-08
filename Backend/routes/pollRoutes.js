// routes/pollRoutes.js
const express = require("express");

const pollController = require("../controllers/pollController");
const {authMiddleware} = require("../middlewares/authMiddleware");
const router = express.Router();
console.log("PollController:", pollController);

// 🟢 Auth gerekli tüm işlemler için
router.post("/", authMiddleware, pollController.createPoll); // Anket oluştur
router.get("/group/:groupId", authMiddleware, pollController.getPollsByGroup); // Grubun anketlerini getir
router.post("/:pollId/vote", authMiddleware, pollController.voteInPoll); // Oylama yap
router.get("/:pollId/votes", authMiddleware, pollController.getPollVotes); // Oylama sonuçlarını getir

module.exports = router;

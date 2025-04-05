require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http'); // HTTP server kuracağız
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const groupMemberRoutes = require('./routes/groupMemberRoutes');
const groupMessageRoutes = require('./routes/groupMessageRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const initializeWebSocket = require('./websocket/index'); // ✅ Socket io entegrasyonu
const app = express();


app.use(cors({
  origin: 'http://localhost:3001', // frontend portun
  credentials: true
}))

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/group-members', groupMemberRoutes);
app.use('/api/group-messages', groupMessageRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Internal Server Error' });
});

// ✅ HTTP server oluştur
const server = http.createServer(app);

// ✅ WebSocket’i HTTP server’a entegre et
initializeWebSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

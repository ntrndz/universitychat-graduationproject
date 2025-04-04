<template>
    <div class="sidebar">
      <div class="search-box">
        <input v-model="search" type="text" placeholder="Search" />
        <UserMenu />
      </div>
  
      <ul class="chat-list">
        <li v-for="chat in filteredChats" :key="chat.id" class="chat-item">
          <div class="chat-left">
            <div class="avatar">{{ chat.name.charAt(0).toUpperCase() }}</div>
            <div class="chat-info">
              <div class="chat-name">{{ chat.name }}</div>
              <div class="chat-message">{{ chat.lastMessage }}</div>
            </div>
          </div>
          <div class="chat-right">
            <div class="chat-time">{{ chat.time }}</div>
            <div v-if="chat.unreadCount > 0" class="chat-unread">{{ chat.unreadCount }}</div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
    import { ref, computed } from 'vue'
    import UserMenu from '@/components/userMenu.vue'

  const search = ref('')
  
  const chats = ref([
    { id: 1, name: 'Efe', lastMessage: 'Cuma borsa nasıl kapattı?', time: 'Thu', unreadCount: 4 },
    { id: 2, name: 'Merve', lastMessage: '#SONDAKİKA 📢 yeni sınav duyurusu...', time: 'Thu', unreadCount: 25 },
    { id: 3, name: 'Telegram Not Kanalı', lastMessage: '📚 Notlar yüklendi', time: 'Thu', unreadCount: 286 },
    { id: 4, name: 'Barış', lastMessage: 'Hocam teşekkür ederim', time: 'Mon', unreadCount: 0 },
  ])
  
  const filteredChats = computed(() =>
    chats.value.filter(chat => chat.name.toLowerCase().includes(search.value.toLowerCase()))
  )
  </script>
  
  <style scoped>
  .sidebar {
  background-color: #ffffff;
  color: #000000;
  height: 80vh;
  width: 300px;
  overflow-y: auto;
  overflow-x: hidden; /* 🛠 YATAY scrollbar engellenir */
  padding: 12px;
  box-sizing: border-box;
}

  
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.search-box input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 9999px;
  background-color: #f0f0f0;
  color: #000000;
  border: none;
  outline: none;
}
  
  .chat-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .chat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 8px;
    border-radius: 6px;
    transition: background 0.2s ease;
    cursor: pointer;
  }
  
  .chat-item:hover {
    background-color: #eeeeee;
  }
  
  .chat-left {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    background-color: #cccccc;
    color: #000000;
    width: 40px;
    height: 40px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
  
  .chat-info {
    display: flex;
    flex-direction: column;
  }
  
  .chat-name {
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }
  
  .chat-message {
    font-size: 12px;
    color: #aaa;
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .chat-right {
    text-align: right;
  }
  
  .chat-time {
    font-size: 11px;
    color: #aaa;
    margin-bottom: 4px;
  }
  
  .chat-unread {
    background-color: #0a84ff;
    color: white;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 9999px;
  }
  </style>
  
<template>
  <div class="sidebar">
    <div class="search-box">
      <input v-model="search" type="text" placeholder="Search" />
      <UserMenu />
    </div>

    <ul class="chat-list">
      <li
        v-for="chat in chats"
        :key="chat.id"
        class="chat-item"
        :class="{ active: chat.id === selectedChatId }"
        @click="$emit('selectChat', chat)"
      >
        <div class="chat-left">
          <div class="avatar">{{ chat.name.charAt(0).toUpperCase() }}</div>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-message text-sm text-gray-500">{{ chat.email }}</div>
          </div>
        </div>
      </li>
       <!-- ✅ Arama sonucu yoksa gösterilecek mesaj -->
  <li v-if="chats.length === 0 && search" class="px-4 py-2 text-sm text-gray-400">
    Kullanıcı bulunamadı
  </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import UserMenu from '@/components/UserMenu.vue'
import { useAuth } from '@/composables/useAuth'


const { accessToken, restoreAccessTokenFromSession } = useAuth()

// 🟡 Yeni ref: hazır mı kontrolü
const isClientReady = ref(false)

onMounted(() => {
  restoreAccessTokenFromSession()
  console.log('🔐 Token (geri yüklendi):', accessToken.value)
  isClientReady.value = true // ✅ sadece client yüklendiğinde arama başlasın
})

// arama kutusu değeri
const search = ref('')

// kullanıcı listesi
const chats = ref([])

defineProps({
  selectedChatId: Number
})



// arama değiştikçe backend'den kullanıcıları çek
watch([search, isClientReady], async ([newValue, ready]) => {
  if (!ready || newValue.trim().length === 0) {
    chats.value = []
    return
  }

  try {
  const res = await axios.get('http://localhost:3000/api/users/search', {
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    },
    params: {
      q: newValue
    }
  })

  // 👇 Gelen kullanıcıları formatla
  chats.value = res.data.map(user => ({
    id: user.user_id,
    name: `${user.first_name} ${user.last_name}`,
    email: user.email
  }))
} 
 catch (err) {
    console.error('❌ Arama hatası:', err)
  }
})



console.log('📦 TOKEN:', accessToken.value)



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

  .chat-item.active {
  background-color: #dceeff;
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
  
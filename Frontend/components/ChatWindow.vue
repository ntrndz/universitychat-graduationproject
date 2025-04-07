<template>
  <div class="chat-window">
    <!-- ✅ HEADER KISMI -->
    <div v-if="selectedChat" class="chat-header">
      <div class="avatar">{{ selectedChat.name.charAt(0).toUpperCase() }}</div>
      <div class="user-info">
        <div class="user-name">{{ selectedChat.name }}</div>
        <div class="user-status">Son görülme: bir süre önce</div>
      </div>
    </div>

    <!-- ✅ MESAJLAR -->
    <div v-if="selectedChat" class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="msg.fromMe ? 'from-me' : 'from-them'"
      >
        {{ msg.text }}
      </div>
    </div>

    <div v-else class="messages">
      <p class="text-gray-500">Lütfen bir sohbet seçin.</p>
    </div>

    <!-- ✅ MESAJ INPUT -->
    <div class="message-input" v-if="selectedChat">
      <input
        v-model="text"
        placeholder="Mesaj yaz..."
        @keydown.enter="sendMessage"
      />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { initSocket } from '@/socket/index'
import { useAuth } from '@/composables/useAuth'

const props = defineProps<{
  selectedChat: { id: number; name: string } | null
}>()

const messages = ref<{ id: number; text: string; fromMe: boolean }[]>([])
const text = ref('')
const { accessToken } = useAuth()

let socket: any = null

onMounted(() => {
  if (accessToken.value) {
    socket = initSocket(accessToken.value)

    // ✅ Gelen mesaj
    socket.on('private_message', (msg: any) => {
      if (msg.sender_id === props.selectedChat?.id) {
        messages.value.push({
          id: msg.id,
          text: msg.content,
          fromMe: false
        })
      }
    })

    // (opsiyonel) Gönderildiyse logla
    socket.on('message_sent', (msg: any) => {
      console.log('✅ Mesaj veritabanına kaydedildi:', msg)
    })
  }
})

onBeforeUnmount(() => {
  if (socket) socket.disconnect()
})

watch(
  () => props.selectedChat,
  (newChat) => {
    if (newChat) {
      messages.value = []
    }
  },
  { immediate: true }
)

const sendMessage = () => {
  if (text.value.trim()) {
    const content = text.value.trim()

    messages.value.push({
      id: messages.value.length + 1,
      text: content,
      fromMe: true
    })

    // ✅ Backend'in beklediği event adı: 'private_message'
    socket.emit('private_message', {
      receiverId: props.selectedChat?.id,
      content
    })

    text.value = ''
  }
}
</script>


<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 80vh;
  background-color: #f9f9f9;
  max-height: 100vh;
}


/* ✅ Header Kısmı */
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: #0a84ff;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  font-size: 15px;
  color: #222;
}

.user-status {
  font-size: 12px;
  color: #777;
}



.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.message {
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 60%;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}
.from-me {
  align-self: flex-end;
  background-color: #0a84ff;
  color: white;
}
.from-them {
  align-self: flex-start;
  background-color: #eaeaea;
  color: #222;
}
.message-input {
  display: flex;
  padding: 12px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
}
.message-input input {
  flex: 1;
  padding: 10px 14px;
  background: #f1f1f1;
  border: none;
  color: #333;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
}
.message-input button {
  background: #0a84ff;
  color: white;
  padding: 10px 11px;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ChatWindow Dark Mode */
body.dark .chat-window {
  background-color: #181818; /* Arka plan rengini koyulaştırdık */
}

body.dark .messages {
  background-color: #222;  /* Mesajlar kısmını koyu yapıyoruz */
  color: white;             /* Yazı rengini beyaz yaptık */
}

/* Input kısmı */
body.dark .message-input {
  background-color: #333;    /* Mesaj yazma alanının arka planını koyu yaptık */
  border-top: 1px solid #444; /* Üst sınır rengini koyulaştırdık */
}

body.dark .message-input input {
  background: #444;          /* Input kutusunun arka planını koyu yaptık */
  color: white;               /* Yazı rengini beyaz yaptık */
  border-radius: 20px;
  border: 1px solid #555;    /* Input kutusunun kenarını koyulaştırdık */
}

/* Gönder butonu */
body.dark .message-input button {
  background: #0a84ff;       /* Buton rengini belirledik */
  color: white;
  border-radius: 50%;
  font-size: 16px;
}

</style>

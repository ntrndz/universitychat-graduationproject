<template>
  <div class="chat-window">
    <div class="messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="msg.fromMe ? 'from-me' : 'from-them'"
      >
        {{ msg.text }}
      </div>
    </div>
    <div class="message-input">
      <input v-model="text" placeholder="Mesaj yaz..." @keydown.enter="sendMessage" />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup>
const messages = ref([
  { id: 1, text: 'Merhaba!', fromMe: false },
  { id: 2, text: 'Selam, nasılsın?', fromMe: true },
])

const text = ref('')

const sendMessage = () => {
  if (text.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      text: text.value.trim(),
      fromMe: true,
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

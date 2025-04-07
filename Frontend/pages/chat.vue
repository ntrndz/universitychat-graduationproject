<template>
  <div class="chat-page">
    <ChatSidebar 
      @selectChat="handleSelectChat" 
      :selectedChatId="selectedChat?.id"
    />

    <div class="flex flex-col h-[calc(100vh-80px)]">
      <ChatWindow 
        :selectedChat="selectedChat"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatSidebar from '@/components/ChatSidebar.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const selectedChat = ref(null)

const handleSelectChat = (chat) => {
  selectedChat.value = chat
}
</script>
<style scoped>
.chat-page {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 80vh;
  background-color: #f3f3f3;
  color: white;

  max-width: 900px;
  margin: 0 auto;        /* ✅ Ortalamak için */
  border-radius: 8px;    /* İsteğe bağlı yumuşak kenarlar */
  overflow: hidden;      /* Taşma olmasın */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Hafif gölge - daha modern görünüm */
}

</style>

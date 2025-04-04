<template>
    <form @submit.prevent="handleSend" class="flex items-center gap-3 p-4 border-t bg-white">
      <input
        v-model="text"
        type="text"
        placeholder="Mesaj yaz..."
        class="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
      >
        Gönder
      </button>
    </form>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['send'])
  const text = ref('')
  
  const handleSend = () => {
    if (text.value.trim()) {
      emit('send', text.value.trim())
      text.value = ''
    }
  }
  </script>
  
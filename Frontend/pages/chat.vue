<script setup lang="ts">
const config = useRuntimeConfig()

const testToken = async () => {
  try {
    const res = await $fetch(`${config.public.apiBase}/user/verify`)
    console.log('✅ Token geçerli:', res)
  } catch (err) {
    console.error('❌ Token geçersiz veya başka bir hata:', err)
  }
}
</script>

<template>
  <div>
    <h1>Chat Sayfası</h1>
    <button @click="testToken">Token Test Et</button>
  </div>
</template>

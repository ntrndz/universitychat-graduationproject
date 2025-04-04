<template>
  <div class="index-page">
    <!-- SignUpLogin component'ini burada çağırıyoruz -->
    <SignUpLogin />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignUpLogin from '@/components/SignUpLogin.vue';  // Componenti import ediyoruz

export default defineComponent({
  name: 'IndexPage',
  components: {
    SignUpLogin,  // Componenti index.vue içinde kullanıyoruz
  },
});

</script>

<style scoped>
/* Stil burada eklenebilir */
</style>
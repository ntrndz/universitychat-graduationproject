<template>
    <div class="user-menu"  ref="menuRef">
      <button @click="toggleMenu" class="menu-button">
        ☰
      </button>
  
      <div v-if="isOpen" class="dropdown-menu">
        <ul>
          <li>💾 Saved Messages</li>
          <li>👥 Contacts</li>
          <li>⚙️ Settings</li>
          <li>
             🌙 Night Mode
             <input type="checkbox" :checked="darkMode" @change="toggleTheme" />
        </li>
          <li>🐞 Report a Bug</li>
        </ul>
        <div class="version">version 1.0</div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from '@/composables/useTheme'

const isOpen = ref(false)
const menuRef = ref(null)

// ✅ Global dark mode toggle
const { darkMode, toggleTheme } = useTheme()

// Menü toggle
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

// Dış tıklayınca menüyü kapat
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Sayfa yenilendiğinde dark mode aktifleştirilsin
  if (darkMode.value) {
    document.body.classList.add('dark')
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

  <style scoped>
  .user-menu {
    position: relative;
    display: inline-block;
  }
  
  .menu-button {
    font-size: 22px;
    background-color: transparent;
    color: rgb(49, 47, 47);
    border: none;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 4px;
  }
  
  .dropdown-menu {
    position: absolute;
    right: 0;
    top: 35px;
    
    width: 220px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
  }
  

  .dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }
  
  .dropdown-menu ul li {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dropdown-menu ul li:hover {
    background-color: #58585842;
  }
  
  .version {
    text-align: center;
    font-size: 12px;
    color: #aaa;
    padding: 8px;
    border-top: 1px solid #444;
  }
  </style>
  
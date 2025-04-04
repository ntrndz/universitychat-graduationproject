<template>
  <div id="app" class="layout">
    <header class="header">
      <h1>Üniversite Chat Sistemi</h1>
    </header>

    <main class="main">
      <NuxtPage />
    </main>

    <footer class="footer1">
      <p>&copy; 2024 Üniversite Chat Sistemi - Tüm Hakları Saklıdır</p>
    </footer>

    <NuxtRouteAnnouncer />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background-color: #e3342f;
  color: white;
  padding: 10px;
  text-align: center;
}

.main {
  flex: 1;
  padding: 20px;
}


</style>

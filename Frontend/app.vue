<template>
  <div id="app">
    <header>
      <h1>Üniversite Chat Sistemi</h1>
    </header>

    <main>
      <NuxtPage />
    </main>

    <footer>
      <p>&copy; 2024 Üniversite Chat Sistemi - Tüm Hakları Saklıdır</p>
    </footer>

    <NuxtRouteAnnouncer />
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  background-color: #e3342f;
  color: white;
  padding: 10px;
  text-align: center;
}

nav {
  margin-top: 10px;
}

nav a {
  margin: 0 10px;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

footer {
  background-color: #f9f9f9;
  text-align: center;
  padding: 10px;
  border-top: 1px solid #ccc;
  position: fixed; /* Footer'ı sabitlemek için */
  bottom: 0; /* Ekranın en altına yerleştirir */
  width: 100%; /* Ekran genişliği boyunca uzanmasını sağlar */
}

</style>

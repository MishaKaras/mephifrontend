<script setup></script>

<template>
  <nav class="navbar">
    <RouterLink to="/">&#128203; Все задачи</RouterLink>
    <RouterLink to="/add">&#10133; Добавить</RouterLink>
    <RouterLink to="/about">&#8505; О нас</RouterLink>
  </nav>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 20px;
  padding: 14px 24px;
  background: #2b6cb0;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
}

.navbar a.router-link-active {
  text-decoration: underline;
  opacity: 0.85;
}

.container {
  max-width: 600px;
  margin: 32px auto;
  padding: 0 16px;
  font-family: sans-serif;
}
</style>
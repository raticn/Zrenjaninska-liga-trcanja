<template>
  <header>
    <router-link to="/dodaj-kolo">
      <i class="fas fa-plus-circle"></i>
      <p>Dodaj kolo</p>
    </router-link>
    <router-link to="/najava-datuma">
      <i class="fas fa-calendar-alt"></i>
      <p>Najava datuma</p>
    </router-link>
    <router-link to="/dodaj-novosti">
      <i class="fas fa-newspaper"></i>
      <p>Dodaj novosti</p>
    </router-link>
  </header>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'; // Uvoz Font Awesome ikona

export default {
  name: 'AdminNavBar',
};
</script>

<style scoped>
/* Dodajte stilove za navigaciju prema potrebi */
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #333;
  color: white;
  height: 50px;
}

header a {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header i {
  margin-bottom: 5px;
}
</style>

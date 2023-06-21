<template>
  <div>
    <header>
      <nav>
        <RouterLink class="logo" to="/" title="Shoppinglist">🛒 ShoppingList</RouterLink>
        <div class="nav-links">
          <RouterLink v-if="!isLoggedIn()" to="/login" title="Back Office">BO 💻</RouterLink>
          <RouterLink v-if="isLoggedIn()" to="/manage">Manage</RouterLink>
          <button v-if="isLoggedIn()" @click="handleLogout" class="logout-button">Logout</button>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

  const router = useRouter()

  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
    location.reload()
  }

</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  border-radius: 5px;

  .logo {
    font-weight: bold;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    align-items: center;

    a, button {
      text-decoration: none;
      color: inherit;
      margin-left: 1.5rem;
      transition: color 0.2s ease;
    }

    .logout-button {
      background-color: #f5574c;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      margin-left: 1.5rem;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f1392b;
      }
    }
  }
}

@media (min-width: 768px) {
  nav {
    height: 80px;
    padding: 0 40px;
    font-size: 1.4rem;

    .nav-links {
      margin-left: auto;
    }
  }
}
</style>
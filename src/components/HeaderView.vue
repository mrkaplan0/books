<script setup>
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { Book, ShoppingCart, User, Search, X } from '@lucide/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showSearchBar = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

// Update windowWidth ref whenever the window is resized
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Add resize event listener when component is mounted
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// Clean up event listener when component is unmounted to prevent memory leaks
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header>
    <h1>Bücherei</h1>
    <Transition name="fade" mode="out-in">
      <div v-if="!isMobile || (isMobile && showSearchBar)" class="search-bar-item">
        <SearchBar />
        <button v-if="isMobile" @click="showSearchBar = !showSearchBar">
          <div><X /></div>
        </button>
      </div>
    </Transition>
    <nav>
      <ul key="nav-items">
        <li v-if="isMobile && !showSearchBar" @click="showSearchBar = !showSearchBar">
          <div class="nav-item">
            <Search />
            <span>Suche</span>
          </div>
        </li>

        <li v-if="!isMobile || (isMobile && !showSearchBar)">
          <RouterLink to="/books"
            ><div class="nav-item"><Book /> <span>Bücher</span></div>
          </RouterLink>
        </li>
        <li v-if="!isMobile || (isMobile && !showSearchBar)">
          <RouterLink to="/cart"
            ><div class="nav-item"><ShoppingCart /> <span>Warenkorb</span></div>
          </RouterLink>
        </li>
        <li v-if="!isMobile || (isMobile && !showSearchBar)">
          <RouterLink to="/profile"
            ><div class="nav-item"><User /> <span>Mein Platz</span></div></RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  padding: 1rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: gray;
}

.nav-item:hover {
  color: #0056b3;
}

nav a {
  text-decoration: none;
  color: gray;
}

nav a.router-link-exact-active {
  color: #0056b3;
  font-weight: bold;
}

.fade-enter-active {
  transition: opacity 0.7s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 0.5rem;
  }
  nav span {
    display: none;
  }

  .search-bar-item {
    display: flex;
    gap: 0.5rem;
    margin: 0 5rem;
  }

  .search-bar-item button {
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>

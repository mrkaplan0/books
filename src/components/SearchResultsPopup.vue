<script setup>
import { RouterLink } from 'vue-router'
import { BookOpen } from '@lucide/vue'
import GlobalPopup from './GlobalPopup.vue'
import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()
</script>

<template>
  <GlobalPopup :open="searchStore.isOpen" title="Suchergebnisse" @close="searchStore.close()">
    <p class="query">Suche nach „{{ searchStore.query }}“</p>
    <div aria-live="polite" :aria-busy="searchStore.loading">
      <p v-if="searchStore.loading" role="status">Bücher werden gesucht…</p>
      <p v-else-if="searchStore.error" role="alert">{{ searchStore.error }}</p>
      <p v-else-if="!searchStore.results.length">Keine Bücher gefunden.</p>
      <template v-else>
        <p>{{ searchStore.results.length }} Treffer angezeigt</p>
        <ul class="results">
          <li v-for="book in searchStore.results" :key="book.id">
            <RouterLink
              :to="{ name: 'book-detail', params: { id: book.id } }"
              @click="searchStore.close()"
            >
              <img
                v-if="book.volumeInfo?.imageLinks?.thumbnail"
                :src="book.volumeInfo.imageLinks.thumbnail"
                alt=""
              />
              <span v-else class="cover-placeholder"><BookOpen /></span>
              <span class="book-info">
                <strong>{{ book.volumeInfo?.title || 'Ohne Titel' }}</strong>
                <span>{{ book.volumeInfo?.authors?.join(', ') || 'Unbekannter Autor' }}</span>
                <small v-if="book.volumeInfo?.publishedDate">{{
                  book.volumeInfo.publishedDate
                }}</small>
              </span>
            </RouterLink>
          </li>
        </ul>
      </template>
    </div>
  </GlobalPopup>
</template>

<style scoped>
.query {
  color: #64748b;
  overflow-wrap: anywhere;
}
.results {
  list-style: none;
  padding: 0;
  margin: 0;
}
.results li + li {
  border-top: 1px solid #e2e8f0;
}
.results a {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  color: inherit;
  text-decoration: none;
}
.results a:hover,
.results a:focus-visible {
  background: #eff6ff;
}
.results img,
.cover-placeholder {
  width: 56px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
}
.cover-placeholder {
  display: grid;
  place-items: center;
  background: #f1f5f9;
  color: #64748b;
}
.book-info {
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 0.4rem;
  min-width: 0;
  overflow-wrap: anywhere;
}
.book-info span,
small {
  color: #64748b;
}
</style>

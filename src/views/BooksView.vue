<script setup>
import { ref, onMounted } from 'vue'
import { useBookStore } from '@/stores/bookStore.js'
import BookCard from '@/components/BookCard.vue'

const bookStore = useBookStore()
const books = ref([])

onMounted(async () => {
  books.value = await bookStore.getBookShelf()
  console.log('Fetched books:', books.value) // Log the fetched books for debugging
})
</script>
<template>
  <div class="wrapper">
    <h1>Bücher</h1>

    <div class="book-list">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  width: 90%;
  margin: auto;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
}
</style>

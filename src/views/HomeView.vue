<script setup>
import SliderView from '@/components/SliderView.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useBookStore } from '@/stores/bookStore.js'

const bookStore = useBookStore()
const books = ref([])

onMounted(async () => {
  books.value = await bookStore.getBookShelf()
  console.log('Fetched books:', books.value) // Log the fetched books for debugging
})

watch(
  () => bookStore.books,
  (newBooks) => {
    books.value = newBooks
    console.log('Updated books from store:', books.value) // Log the updated books for debugging
  },
  { immediate: true },
)

const slides = computed(() => {
  return books.value.map((book) => ({
    title: book.volumeInfo.title,
    subtitle: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
    description: formatDescription(book.volumeInfo.description) || 'No description available.',
    bgImage: book.volumeInfo.imageLinks?.extraLarge || book.volumeInfo.imageLinks?.thumbnail || '',
    foregroundImage:
      book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.smallThumbnail || '',
  }))
})

function formatDescription(description) {
  if (!description) return ''

  const doc = new DOMParser().parseFromString(description, 'text/html')

  doc.querySelectorAll('script, style').forEach((el) => el.remove())
  doc.querySelectorAll('br').forEach((el) => el.replaceWith(' '))
  doc.querySelectorAll('p, div, li').forEach((el) => el.append(' '))

  const text = (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim()

  const sentences = new Intl.Segmenter('tr', {
    granularity: 'sentence',
  }).segment(text)

  return sentences[Symbol.iterator]().next().value?.segment.trim() ?? ''
}
</script>

<template>
  <div class="wrapper">
    <SliderView :slides="slides" />
    <p v-if="bookStore.loading" role="status">Yükleniyor...</p>
    <p v-else-if="bookStore.error" role="alert">{{ bookStore.error }}</p>
    <p v-else-if="!books.length">API bu raf için kitap döndürmedi.</p>

    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-item">
        <h3>{{ book.volumeInfo.title }}</h3>
        <p>{{ book.volumeInfo.authors?.join(', ') }}</p>
        <p>{{ book.id }}</p>
        <img
          v-if="book.volumeInfo.imageLinks?.thumbnail"
          :src="book.volumeInfo.imageLinks.thumbnail"
          alt="Book Cover"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}
.book-item {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: calc(33.333% - 1rem);
  box-sizing: border-box;
}
</style>

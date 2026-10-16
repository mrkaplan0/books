<script setup>
import SliderView from '@/components/SliderView.vue'
import { ref, onMounted, watch, computed } from 'vue'
import { useBookStore } from '@/stores/bookStore.js'
import BookPlaceholder from '@/components/BookPlaceholder.vue'
import { Info, CircleX } from '@lucide/vue'
import CustomSection from '@/components/CustomSection.vue'
import { actualities } from '@/config/dummies'

const bookStore = useBookStore()
const books = ref([])
const error = ref('')

onMounted(async () => {
  getBooks()
})

async function getBooks() {
  try {
    books.value = await bookStore.getBookShelf()
    console.log('Fetched books:', books.value) // Log the fetched books for debugging
  } catch (err) {
    error.value = err
  }
}

watch(
  () => bookStore.books,
  (newBooks) => {
    books.value = newBooks
    console.log('Updated books from store:', books.value) // Log the updated books for debugging
  },
  { immediate: true },
)

const slides = computed(() => {
  if (books.value.length == 0) return []
  return books.value.slice(0, 4).map((book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    subtitle: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
    description: book.volumeInfo.description || 'No description available.',
    bgImage: book.volumeInfo.imageLinks?.extraLarge || book.volumeInfo.imageLinks?.thumbnail || '',
    imageUrl: book.volumeInfo.imageLinks?.large || book.volumeInfo.imageLinks?.smallThumbnail || '',
  }))
})
</script>

<template>
  <div class="wrapper">
    <p v-if="bookStore.loading" role="status"><BookPlaceholder /></p>
    <p v-else-if="error" role="alert" class="box danger"><CircleX />{{ bookStore.error }}</p>
    <p v-else-if="!books.length" class="box info"><Info /> Es gibt leider kein Buch.</p>
    <SliderView :slides="slides" />
    <CustomSection
      :section-title="'Aktuelles'"
      :data="actualities"
      :route-path="'actualities'"
      :show-all="false"
    ></CustomSection>
    <CustomSection
      :section-title="'Bücher'"
      :data="slides"
      :route-path="'books'"
      :show-all="false"
    ></CustomSection>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
}
</style>

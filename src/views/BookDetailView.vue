<script setup>
import { useBookStore } from '@/stores/bookStore'
import { computed, onMounted, ref } from 'vue'
import BookPlaceholder from '@/components/BookPlaceholder.vue'
import { formatDate } from '@/utils/formatDate'
import { formatLangCode } from '@/utils/formatLangCode'
import { ShoppingCartPlus, Bookmark } from '@lucide/vue'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'

const bookStore = useBookStore()
const shoppingCartStore = useShoppingCartStore()
const book = ref(null)
const loading = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  getBook()
})

const isBookAdded = computed(() => {
  return shoppingCartStore.items.find((el) => el.id === book.value.id)
})

async function getBook() {
  try {
    loading.value = true
    book.value = await bookStore.getBookById(props.id)
  } catch (err) {
    console.log(err)
    loading.value = false
  }
}

function addBookToShoppingCart() {
  if (isBookAdded.value) {
    shoppingCartStore.removeBookFromCart(book.value)
  } else {
    shoppingCartStore.addBookToCart(book.value)
  }
}
</script>
<template>
  <BookPlaceholder v-if="loading" />

  <section class="wrapper" v-if="book?.volumeInfo">
    <div class="img-container">
      <img
        class="thumbnail"
        v-if="book.volumeInfo.imageLinks?.medium"
        :src="book.volumeInfo.imageLinks.medium"
        :alt="book.volumeInfo.title"
        @load="loading = false"
      />
    </div>
    <div class="book-container">
      <h1>
        {{ book.volumeInfo.title }}
      </h1>
      <h2>{{ book.volumeInfo.subtitle }}</h2>
      <div class="book-info">
        <div class="book-info-items">
          <div class="book-info-item">
            <p><span>Autor: </span>{{ book.volumeInfo.authors?.join(', ') }}</p>
          </div>
          <div class="book-info-item">
            <p><span>Erscheinungsdatum: </span>{{ formatDate(book.volumeInfo.publishedDate) }}</p>
          </div>
          <div class="book-info-item">
            <p><span>Seitenzahl: </span>{{ book.volumeInfo.pageCount }}</p>
          </div>
          <div class="book-info-item">
            <p><span>Verlag: </span>{{ book.volumeInfo.publisher }}</p>
          </div>
          <div class="book-info-item">
            <p><span>Sprache: </span>{{ formatLangCode(book.volumeInfo.language) }}</p>
          </div>
          <div class="book-info-item">
            <p><span>epub: </span>{{ book.accessInfo.epub.isAvailable ? 'Ja' : 'Nein' }}</p>
          </div>
          <div class="book-info-item">
            <p><span>pdf: </span>{{ book.accessInfo.pdf.isAvailable ? 'Ja' : 'Nein' }}</p>
          </div>
        </div>

        <button
          class="add-button"
          @click="addBookToShoppingCart"
          :disabled="!book.accessInfo.epub.isAvailable && !book.accessInfo.pdf.isAvailable"
        >
          <div v-if="!isBookAdded"><ShoppingCartPlus /> In den Warenkorb</div>
          <div v-else><Bookmark /> Gebucht</div>
        </button>
      </div>
      <hr />
      <h2>Description</h2>
      <div class="description" v-html="book.volumeInfo.description"></div>
    </div>
  </section>
</template>
<style>
.wrapper {
  width: 90%;
  min-height: 70vh;
  margin: auto;
}
.img-container {
  width: 365px;
  height: 400px;
  background-size: cover;
  margin: 1rem auto;
  position: relative;
}
h2,
.book-info span {
  color: grey;
}

.thumbnail {
  width: 90%;
  height: 400px;
}

.book-container {
  width: 90%;
  min-height: 50vh;
  margin: auto;
  padding: 1rem;
  border: 1px solid rgba(128, 128, 128, 0.315);
  border-radius: 16px;
}

.book-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.book-info-items {
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.book-info-item {
  margin: 0 0.3rem;
}

.add-button {
  margin-right: 4rem;
  width: 200px;
}

.add-button div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

@media (min-width: 1280px) {
  .description {
    max-width: 80%;
  }
}
</style>

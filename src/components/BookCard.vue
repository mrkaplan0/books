<script setup>
import { formatLangCode } from '@/utils/formatLangCode'
import { textShortener } from '@/utils/textShortener'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import { ShoppingCartPlus, Bookmark } from '@lucide/vue'
import { useShoppingCartStore } from '@/stores/shoppingCartStore'
import { computed } from 'vue'
import CustomCard from './CustomCard.vue'

const shoppingCartStore = useShoppingCartStore()

const router = useRouter()

const props = defineProps({
  book: Object,
})
const isBookAdded = computed(() => {
  return props.book && shoppingCartStore.items?.find((el) => el.id === props.book.id)
})
const goToDetail = (bookId) => {
  router.push({ name: 'book-detail', params: { id: bookId } })
}
function addBookToShoppingCart() {
  if (isBookAdded.value) {
    shoppingCartStore.removeBookFromCart(props.book)
  } else {
    shoppingCartStore.addBookToCart(props.book)
  }
}
</script>
<template>
  <CustomCard>
    <template #image>
      <img
        class="book-image"
        v-if="props.book.volumeInfo.imageLinks?.thumbnail"
        :src="props.book.volumeInfo.imageLinks.thumbnail"
        alt="Book Cover"
      />
    </template>
    <template #card-front>
      <div>
        <h3>{{ props.book.volumeInfo.title }}</h3>
        <p>{{ props.book.volumeInfo.authors?.join(', ') }}</p>
        <p class="sub-text">{{ props.book.volumeInfo.publisher }}</p>
        <p class="sub-text">{{ formatLangCode(props.book.volumeInfo.language) }}</p>
      </div>
    </template>

    <template #card-hover>
      <div>
        <p class="detail-text" v-html="textShortener(props.book.volumeInfo.description)"></p>
        <div class="book-meta">
          <span>Pages: {{ props.book.volumeInfo.pageCount || 'N/A' }}</span>
          <span>Published: {{ formatDate(props.book.volumeInfo.publishedDate) }}</span>
        </div>
      </div></template
    >

    <template #action-buttons>
      <div class="buttons">
        <button @click="goToDetail(props.book.id)">Zur Detail</button>
        <button
          @click="addBookToShoppingCart"
          :disabled="
            !props.book.accessInfo.epub.isAvailable && !props.book.accessInfo.pdf.isAvailable
          "
        >
          <div v-if="!isBookAdded"><ShoppingCartPlus size="18" /></div>
          <div v-else><Bookmark size="18" fill="#0056b3" /></div>
        </button>
      </div>
    </template>
  </CustomCard>
</template>
<style scoped>
.book-image {
  padding-top: 1rem;
  width: 100%;
  max-height: 100%;
}

/* Detail Description Text */
.detail-text {
  color: #555555;
  line-height: 1.4;
  margin: 1rem 0 8px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Extra Metadata (Pages, Date) */
.book-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: #0056b3;
}
.sub-text {
  color: grey;
  font-size: smaller;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: auto;
}
</style>

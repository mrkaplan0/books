<script setup>
import { formatLangCode } from '@/utils/formatLangCode'
import { textShortener } from '@/utils/textShortener'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  book: Object,
})

const goToDetail = (bookId) => {
  router.push({ name: 'book-detail', params: { id: bookId } })
}
</script>
<template>
  <div class="book-item">
    <img
      class="book-image"
      v-if="props.book.volumeInfo.imageLinks?.thumbnail"
      :src="props.book.volumeInfo.imageLinks.thumbnail"
      alt="Book Cover"
    />
    <div class="book-item-info">
      <h3>{{ props.book.volumeInfo.title }}</h3>
      <p>{{ props.book.volumeInfo.authors?.join(', ') }}</p>
      <p class="sub-text">{{ props.book.volumeInfo.publisher }}</p>
      <p class="sub-text">{{ formatLangCode(props.book.volumeInfo.language) }}</p>
    </div>
    <!-- Short Details That Appears on Hover -->
    <div class="book-details">
      <p class="detail-text" v-html="textShortener(props.book.volumeInfo.description)"></p>
      <div class="book-meta">
        <span>Pages: {{ props.book.volumeInfo.pageCount || 'N/A' }}</span>
        <span>Published: {{ formatDate(props.book.volumeInfo.publishedDate) }}</span>
      </div>

      <button class="go-detail-button" @click="goToDetail(props.book.id)">Zur Detail</button>
    </div>
  </div>
</template>
<style scoped>
.book-item {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 300px;
  max-width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
/* Card Hover Elevation Effect */
.book-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.book-item .book-image {
  width: 50%;
  max-height: 50%;
  align-self: center;
  transition: transform 0.4s ease;
}

/* Slight zoom effect on image when hovering the card */
.book-item:hover .book-image {
  transform: scale(1.05);
}
.sub-text {
  color: grey;
  font-size: smaller;
}

/* Details Box (Hidden by default, slides up smoothly on hover) */
.book-details {
  position: absolute;
  inset: 0;
  z-index: 1;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  padding: 16px;
  transform: translateY(100%);
  visibility: hidden;
  pointer-events: none;
  transition:
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0.35s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Trigger detail container animation on hover */
.book-item:hover .book-details {
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
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

.go-detail-button {
  width: 50%;
  margin: auto;
}
</style>

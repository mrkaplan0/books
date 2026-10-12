<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'

const bookImages = import.meta.glob('../assets/books/book_*.png', {
  eager: true,
  import: 'default',
  query: '?url',
})
var tl = gsap.timeline({ delay: 1, repeat: -1, yoyo: true })
onMounted(() => {
  tl.from('.book-img', {
    x: 0,
    opacity: 0,
    delay: 0.1,
    duration: 2.0,
    stagger: 0.1, // 0.1 seconds between when each ".box" element starts animating
  }).to('.book-img', {
    x: 0,
    delay: 0.1,
    duration: 2.0,
    opacity: 1,
    stagger: 0.1,
  })
})
</script>
<template>
  <div class="img-container">
    <img
      v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
      :key="item"
      class="book-img"
      :class="`img-${item}`"
      :src="bookImages[`../assets/books/book_${item}.png`]"
      alt="image-backgroung"
      srcset=""
    />
  </div>
</template>

<style scoped>
.img-container {
  width: 365px;
  height: 400px;
  background-size: cover;
  margin: 1rem auto;
  position: relative;
}

.img-container .book-img {
  width: auto;
  height: 170px;
  width: auto;
  position: absolute;
  bottom: 100px;
  object-fit: contain;
}

.img-1 {
  left: 0;
}
.img-2 {
  left: 32px;
}
.img-3 {
  left: 85px;
}
.img-4 {
  left: 130px;
}
.img-5 {
  left: 168px;
}
.img-6 {
  left: 200px;
}
.img-7 {
  left: 222px;
}
.img-8 {
  left: 288px;
}
.img-9 {
  left: 318px;
}
</style>

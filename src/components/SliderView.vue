<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectCreative } from 'swiper/modules'
import gsap from 'gsap'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-creative'

// Register Swiper modules
const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination
const SwiperNavigation = Navigation
const SwiperEffectCreative = EffectCreative

// Sample slide data
const slides = ref([
  {
    title: 'Nature Odyssey',
    subtitle: 'Explore the Wild',
    description: 'Discover breathtaking landscapes and untouched wilderness.',
    bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920',
    foregroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800',
  },
  {
    title: 'Urban Architecture',
    subtitle: 'Modern Living',
    description: 'Experience the pulse of modern cityscapes and design.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920',
    foregroundImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800',
  },
])

// Refs to capture DOM elements for GSAP animations
const textRefs = ref([])
const imageRefs = ref([])

// Trigger entrance animations when slide changes
const onSlideChange = (swiper) => {
  const activeIndex = swiper.activeIndex

  // Target the active slide's elements
  const currentText = textRefs.value[activeIndex]
  const currentImage = imageRefs.value[activeIndex]

  if (!currentText || !currentImage) return

  // Create a GSAP timeline for orchestrated sequencing
  const tl = gsap.timeline()

  // Animate text elements (fade in & slide up)
  tl.fromTo(
    currentText.children,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
    0.2, // Start slightly after slide transition begins
  )

  // Animate foreground image (scale up & fade in)
  tl.fromTo(
    currentImage,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' },
    0.3,
  )
}

onMounted(() => {
  // Trigger animation for the initial active slide on load
  const initialText = textRefs.value[0]
  const initialImage = imageRefs.value[0]

  if (initialText && initialImage) {
    gsap.fromTo(
      initialText.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 },
    )
    gsap.fromTo(
      initialImage,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 },
    )
  }
})
</script>

<template>
  <div class="slider-container">
    <!-- Main Swiper instance -->
    <swiper
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperEffectCreative]"
      :effect="'creative'"
      :creative-effect="{
        prev: { shadow: true, translate: ['-20%', 0, -1] },
        next: { translate: ['100%', 0, 0] },
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="mySwiper"
      @slideChangeTransitionStart="onSlideChange"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <!-- Background Layer with independent animation -->
        <div class="slide-bg" :style="{ backgroundImage: `url(${slide.bgImage})` }"></div>

        <div class="slide-content">
          <!-- Text Layer (e.g., top-left corner) -->
          <div class="text-wrapper" ref="textRefs">
            <span class="slide-subtitle">{{ slide.subtitle }}</span>
            <h1 class="slide-title">{{ slide.title }}</h1>
            <p class="slide-desc">{{ slide.description }}</p>
          </div>

          <!-- Image Layer (e.g., opposite side) -->
          <div class="image-wrapper" ref="imageRefs">
            <img :src="slide.foregroundImage" :alt="slide.title" />
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.slider-container {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
}

.mySwiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Background image layer */
.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.6); /* Darken background for better text contrast */
  z-index: 1;
}

/* Content layer holding text and foreground image */
.slide-content {
  position: relative;
  z-index: 2;
  width: 85%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  color: #fff;
}

/* Text wrapper positioned nicely on one side */
.text-wrapper {
  max-width: 500px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.slide-subtitle {
  display: block;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  color: #4ade80;
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
}

.slide-desc {
  font-size: 1.1rem;
  opacity: 0.8;
  line-height: 1.6;
}

/* Foreground image wrapper positioned on the opposite side */
.image-wrapper {
  width: 350px;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .slide-title {
    font-size: 2.75rem;
  }

  .image-wrapper {
    width: 30%;
    height: 360px;
  }
}

@media (max-width: 768px) {
  .slider-container,
  .mySwiper {
    height: auto;
  }

  .mySwiper :deep(.swiper-wrapper) {
    align-items: stretch;
  }

  .swiper-slide {
    height: auto;
  }

  .slide-content {
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 3rem 3.5rem;
    text-align: center;
  }

  .text-wrapper {
    width: 100%;
  }

  .slide-subtitle {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }

  .slide-title {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    margin: 0 0 1rem;
  }

  .slide-desc {
    font-size: 1rem;
    margin: 0;
  }

  .image-wrapper {
    width: 50%;
    max-width: 320px;
    height: clamp(160px, 40vw, 240px);
  }

  .mySwiper :deep(.swiper-button-next),
  .mySwiper :deep(.swiper-button-prev) {
    --swiper-navigation-size: 20px;
    width: 44px;
    height: 44px;
    margin-top: -22px;
  }

  .mySwiper :deep(.swiper-button-next) {
    right: 0;
  }

  .mySwiper :deep(.swiper-button-prev) {
    left: 0;
  }

  .mySwiper :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
  }
}
</style>

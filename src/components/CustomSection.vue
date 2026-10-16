<script setup>
import CustomCard from '@/components/CustomCard.vue'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'vue-router'
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { MoveRight } from '@lucide/vue'
import { textShortener } from '@/utils/textShortener'

const router = useRouter()
const props = defineProps({
  sectionTitle: {
    type: String,
    required: true,
  },
  data: { type: Array, required: true },
  routePath: { type: String, required: true },
  showAll: {
    type: Boolean,
    default: true,
  },
})

const container = ref(null)
const containerWidth = ref(0)
let resizeObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    containerWidth.value = entry.contentRect.width
  })
  resizeObserver.observe(container.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())

const cardCount = computed(() => (containerWidth.value >= 4 * 300 + 3 * 16 ? 4 : 3))

const list = computed(() => (props.showAll ? props.data : props.data.slice(0, cardCount.value)))

const showButtonAtTop = computed(() => {
  return containerWidth.value <= 1200
})
const goToDetail = (itemId = null) => {
  if (itemId) {
    router.push({ name: props.routePath, params: { id: itemId } })
  } else {
    router.push({ name: props.routePath })
  }
}
</script>

<template>
  <div class="title">
    <h2>{{ props.sectionTitle }}</h2>
    <div v-if="!props.showAll && showButtonAtTop">
      <button class="explore-button" @click="goToDetail()">Mehr Entdecken...<MoveRight /></button>
    </div>
  </div>

  <section
    ref="container"
    class="container"
    :class="{ 'single-row': !props.showAll }"
    :style="{ '--card-count': cardCount }"
  >
    <CustomCard v-for="item in list" :key="item.id">
      <template #image>
        <img
          v-if="item.imageUrl"
          class="card-image"
          :src="item.imageUrl"
          alt="Cover"
          loading="lazy"
        />
      </template>
      <template #card-front>
        <h3>{{ item.title }}</h3>
        <p>{{ item.subtitle }}</p>
        <p class="sub-text">{{ item.createdBy }}</p>
        <p class="sub-text">{{ formatDate(item.createdDate) }}</p>
      </template>
      <template #card-hover>
        <p class="detail-text" v-html="textShortener(item.description)"></p
      ></template>
      <template #action-buttons>
        <slot></slot>
        <button @click="goToDetail(item.id)">Zur Detail</button>
      </template>
    </CustomCard>
    <div class="explore-container" v-if="!props.showAll && !showButtonAtTop">
      <p>Mehr Entdecken... {{ showButtonAtTop ? 'Ja' : containerWith }}</p>
      <button @click="goToDetail()"><MoveRight /></button>
    </div>
  </section>
</template>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  align-items: center;
}

.single-row > :deep(.card-item) {
  width: 100%;
  min-width: 0;
}
.card-image {
  width: 100%;
  max-height: 110%;
  background-size: cover;
}
.sub-text {
  color: grey;
  font-size: smaller;
}

.action-cell a {
  height: 40px;
  border: 1px solid rgba(128, 128, 128, 0.315);
  color: #0056b3;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
}

.action-cell button,
a {
  font-size: 12px;
  color: #64748b;
  margin: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 130px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.explore-button {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
}
.explore-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 8px;
}
</style>

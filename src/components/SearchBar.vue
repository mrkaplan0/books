<script setup>
import { Search } from '@lucide/vue'
import { ref, watch } from 'vue'
import CustomSelect from '@/components/CustomSelect.vue'

const searchTypes = [
  { key: 'products', value: 'Produkte' },
  { key: 'textbooks', value: 'Lehrwerke' },
  { key: 'helpcenter', value: 'Help Center' },
]
const selectedSearchType = ref(searchTypes[0])
const searchQuery = ref('')

watch(selectedSearchType, (newValue) => {
  console.log('Selected search type changed to:', newValue)
})

watch(searchQuery, (newValue) => {
  console.log('Search query changed to:', newValue)
})
</script>
<template>
  <div class="search-area">
    <CustomSelect class="search-type" :list="searchTypes" v-model="selectedSearchType" />
    <input type="text" placeholder="Bücher durchsuchen..." v-model="searchQuery" />
    <button><Search /></button>
  </div>
</template>

<style scoped>
.search-area {
  display: flex;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  overflow: hidden;
  margin-left: 1rem;
}

.search-area input {
  flex: 1;
  border: none;
  padding: 0 10px;
}

.search-area input:focus {
  outline: none;
}

.search-area button {
  border: none;
  color: #0056b3;
  padding: 3px 15px 0 15px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  text-align: center;
}
.search-area button:hover {
  background-color: #0056b3;
  color: #fff;
}

.search-type {
  border-radius: 20px 0 0 20px;
}

@media (max-width: 768px) {
  .search-area input {
    padding: 0 0rem;
  }
}
</style>

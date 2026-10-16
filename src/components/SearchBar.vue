<script setup>
import { Search } from '@lucide/vue'
import { ref } from 'vue'
import CustomSelect from '@/components/CustomSelect.vue'
import { useSearchStore } from '@/stores/searchStore'

const searchTypes = [
  { key: 'books', value: 'Bücher' },
  { key: 'isbn', value: 'ISBN' },
]
const selectedSearchType = ref(searchTypes[0])
const searchQuery = ref('')
const searchStore = useSearchStore()

const handleSearch = async () => {
  await searchStore.search(searchQuery.value, selectedSearchType.value.key)
}
</script>
<template>
  <div class="search-area">
    <CustomSelect class="search-type" :list="searchTypes" v-model="selectedSearchType" />
    <input
      type="text"
      placeholder="Bücher durchsuchen..."
      v-model="searchQuery"
      aria-label="Bücher durchsuchen"
      @keydown.enter.prevent="handleSearch"
    />
    <button aria-label="Suchen" :disabled="!searchQuery.trim() || searchStore.loading" @click="handleSearch"><Search /></button>
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

.search-type {
  border-radius: 20px 0 0 20px;
}

@media (max-width: 768px) {
  .search-area input {
    padding: 0 0rem;
  }
}
</style>

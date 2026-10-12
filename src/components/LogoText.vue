<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home' })
}
</script>
<template><span class="great-vibes-regular logo-text" @click="goToHome">Leseklub</span></template>
<style scoped>
.logo-text {
  margin-left: 1rem;
  font-size: 4rem;
  text-shadow: 1px 2px 2px slategray;
  cursor: pointer;
}
</style>

<script setup>
import CustomSection from '@/components/CustomSection.vue'
import { actualities } from '@/config/dummies'
</script>
<template>
  <div class="wrapper">
    <CustomSection
      :section-title="'Aktuelles'"
      :data="actualities"
      :route-path="'actualities'"
      :show-all="true"
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

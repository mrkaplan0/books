<script setup>
import { ref, watch } from 'vue'
import { X } from '@lucide/vue'

const props = defineProps({
  open: Boolean,
  title: { type: String, required: true },
})
const emit = defineEmits(['close'])
const dialog = ref(null)

watch(
  () => props.open,
  (open) => {
    if (open && !dialog.value.open) dialog.value.showModal()
    else if (!open && dialog.value.open) dialog.value.close()
  },
  { flush: 'post' },
)
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="global-popup"
      aria-labelledby="global-popup-title"
      @cancel.prevent="emit('close')"
      @close="emit('close')"
      @click="($event.target === dialog) && emit('close')"
    >
      <div class="popup-content">
        <header>
          <h2 id="global-popup-title">{{ title }}</h2>
          <button type="button" aria-label="Schließen" autofocus @click="emit('close')">
            <X :size="20" />
          </button>
        </header>
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.global-popup {
  width: min(680px, calc(100% - 2rem));
  max-height: 80dvh;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-sizing: border-box;
  color: #253248;
  box-shadow: 0 24px 80px #0004;
}
.global-popup::backdrop {
  background: #10203999;
}
.popup-content {
  padding: 1.5rem;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
h2 {
  margin: 0;
  font-size: 1.3rem;
}
button {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  padding: 0;
  width: 40px;
}
</style>

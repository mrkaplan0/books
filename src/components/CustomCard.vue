<template>
  <div class="card-item">
    <div class="card-image">
      <slot name="image"></slot>
    </div>
    <div class="card-item-info">
      <slot name="card-front"></slot>
    </div>
    <!-- Short Details That Appears on Hover -->
    <div class="card-details">
      <slot name="card-hover"> </slot>
      <div class="actions">
        <slot name="action-buttons"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-item {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding-bottom: 1rem;
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
.card-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-item .card-image {
  max-height: 50%;
  align-self: center;
  transition: transform 0.4s ease;
}

/* Slight zoom effect on image when hovering the card */
.card-item:hover .card-image {
  transform: scale(1.05);
}
.card-item-info {
  padding: 1rem;
}
/* Details Box (Hidden by default, slides up smoothly on hover) */
.card-details {
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
.card-item:hover .card-details {
  transform: translateY(0);
  visibility: visible;
  pointer-events: auto;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
.actions button {
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: auto;
  padding-top: 4px;
}
</style>

<template>
  <transition name="toast-slide">
    <div v-if="show" :class="toastClass" role="status" aria-live="polite">
      <div class="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
        <svg
          v-if="props.variant === 'wishlist'"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white"
        >
          <path
            d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.7 7.8l1.1 1 7.7 7.8 7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z"
          ></path>
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-white"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </div>

      <div>
        <p class="font-bold text-sm uppercase tracking-wider">{{ titleText }}</p>
        <p class="text-xs mt-0.5 line-clamp-1" :class="messageClass">{{ itemName }}</p>
      </div>

      <button @click="$emit('close')" class="ml-auto text-green-200 hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: Boolean,
  itemName: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'cart', // 'cart' | 'wishlist'
  },
  color: {
    type: String,
    default: null, // 'green' | 'rose' | null (auto)
  },
})

defineEmits(['close'])

const titleText = computed(() => {
  if (props.variant === 'wishlist') return 'Saved to Wishlist!'
  if (props.variant === 'signin') return 'Please Sign In'
  if (props.variant === 'sent') return 'Gift Card Sent!'
  return 'Added to Cart!'
})

const toastClass = computed(() => {
  const base =
    'fixed top-24 right-4 z-[100] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]'

  // color prop overrides automatic selection
  if (props.color === 'green') return base + ' bg-green-600'
  if (props.color === 'rose') return base + ' bg-rose-600'

  // fallback behavior
  if (props.variant === 'wishlist') return base + ' bg-rose-600'
  if (props.variant === 'signin') return base + ' bg-rose-600'
  return base + ' bg-green-600'
})

const messageClass = computed(() => {
  if (props.color === 'rose') return 'text-rose-100'
  if (props.color === 'green') return 'text-green-100'
  return props.variant === 'signin' ? 'text-rose-100' : 'text-green-100'
})
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px) translateX(20px);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Match text colors used previously */
.text-green-100 {
  color: rgba(237, 249, 255, 0.9);
}
</style>

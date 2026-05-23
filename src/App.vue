<template>
  <div class="app-wrapper antialiased flex flex-col min-h-screen bg-neutral-950">
    <!-- 1. Global Header: Hidden on login page, listens for drawer signals -->
    <HeaderComponent v-if="route.name !== 'login'" @open-cart="isCartOpen = true" @open-wishlist="isWishlistOpen = true" />

    <!-- 2. The Magic Window: Swaps between Login, Home, Shop, etc. -->
    <main class="flex-grow relative">
      <RouterView />
    </main>

    <!-- 3. Global Footer: Hidden on login page -->
    <FooterComponent v-if="route.name !== 'login'" />

    <!-- 4. Global Cart Drawer: Hidden on login page, sits invisibly waiting -->
    <CartComponent v-if="route.name !== 'login'" :isOpen="isCartOpen" @close="isCartOpen = false" />

    <!-- Global Wishlist Drawer: Hidden on login page -->
    <WishlistComponent v-if="route.name !== 'login'" :isOpen="isWishlistOpen" @close="isWishlistOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'


// Import your global layout components
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import CartComponent from './components/CartComponent.vue' // Adjust this name if you named it CartComponent.vue!
import WishlistComponent from './components/WishlistComponent.vue'

import { useA11yStore } from './stores/a11y'

// Initialize route tracking so App.vue knows what page we are on
const route = useRoute()

// The central "middleman" variables that connect the Header buttons to the drawers
const isCartOpen = ref(false)
const isWishlistOpen = ref(false)

const a11yStore = useA11yStore()

// ==========================================
// GLOBAL SCREEN READER (Touch-to-Speak)
// ==========================================
let speechSynth = window.speechSynthesis

const handleTouchToSpeak = (event) => {
  // Only trigger if the global store says it is ON
  if (!a11yStore.screenReader) return

  const target = event.target
  const textToRead = target.innerText || target.textContent

  // Don't read empty space or giant blocks of code
  if (!textToRead || textToRead.trim() === '') return

  speechSynth.cancel() // Stop currently playing audio

  const utterance = new SpeechSynthesisUtterance(textToRead.trim())
  utterance.rate = 1.1
  utterance.pitch = 1.0
  speechSynth.speak(utterance)
}

onMounted(() => {
  document.addEventListener('mouseover', handleTouchToSpeak)
  document.addEventListener('touchstart', handleTouchToSpeak, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('mouseover', handleTouchToSpeak)
  document.removeEventListener('touchstart', handleTouchToSpeak)
  speechSynth.cancel()
})


</script>

<style>
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

body {
  margin: 0;
  background-color: #0a0a0a;
  color: #f3f4f6;
}

.brand-font {
  font-family: 'Orbitron', sans-serif;
}


/* ==============================================================
   GLOBAL ACCESSIBILITY STYLES (WCAG Compliance)
============================================================== */

/* 1. Color Blind Filter (Protanopia/Deuteranopia Fix) */
body.a11y-color-blind {
  /* Shifts reds into magenta/blue, boosts contrast, and slightly desaturates to reduce eye strain */
  filter: hue-rotate(-55deg) contrast(1.1) saturate(1.2);
}

/* We reverse the filter on images so the cars/people don't look like aliens! */
body.a11y-color-blind img,
body.a11y-color-blind iframe {
  filter: hue-rotate(55deg) contrast(0.9) saturate(0.8);
}

/* 2. Reduced Motion Filter */
body.a11y-reduce-motion *,
body.a11y-reduce-motion *::before,
body.a11y-reduce-motion *::after {
  /* Instantly kills all CSS animations, transitions, and smooth scrolling */
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
</style>

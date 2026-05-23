// src/stores/a11y.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useA11yStore = defineStore('a11y', () => {
  // Initialize state from localStorage, or default to false
  const colorBlind = ref(JSON.parse(localStorage.getItem('a11y_colorBlind')) || false)
  const screenReader = ref(JSON.parse(localStorage.getItem('a11y_screenReader')) || false)

  // --- REAL-WORLD UPGRADE: OS Context-Aware Reduced Motion ---
  // 1. Ask the browser if the user's OS has animations turned off globally
  const osPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // 2. Check localStorage first. If it's empty (null), default to the OS setting!
  const savedMotionPref = localStorage.getItem('a11y_reducedMotion')

  const reducedMotion = ref(
    savedMotionPref !== null ? JSON.parse(savedMotionPref) : osPrefersReducedMotion
  )
  // -----------------------------------------------------------

  // Function to toggle a setting
  const toggleSetting = (setting) => {
    if (setting === 'colorBlind') colorBlind.value = !colorBlind.value
    if (setting === 'screenReader') screenReader.value = !screenReader.value
    if (setting === 'reducedMotion') reducedMotion.value = !reducedMotion.value
  }

  // Watchers to apply global CSS classes to the <body> whenever a setting changes
  watch(colorBlind, (newVal) => {
    localStorage.setItem('a11y_colorBlind', newVal)
    document.body.classList.toggle('a11y-color-blind', newVal)
  }, { immediate: true }) // immediate: true runs this immediately when the app loads!

  watch(reducedMotion, (newVal) => {
    localStorage.setItem('a11y_reducedMotion', newVal)
    document.body.classList.toggle('a11y-reduce-motion', newVal)
  }, { immediate: true })

  watch(screenReader, (newVal) => {
    localStorage.setItem('a11y_screenReader', newVal)
  }, { immediate: true })

  return { colorBlind, screenReader, reducedMotion, toggleSetting }
})

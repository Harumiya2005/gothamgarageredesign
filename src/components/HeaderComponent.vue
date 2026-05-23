<template>
  <div>
    <div class="bg-rose-700 text-white text-xs font-bold tracking-widest text-center py-2 uppercase">
      *** All products will take 1-2 weeks to process and ship ***
    </div>

    <header class="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 relative">
      <div class="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

        <RouterLink
          to="/"
          class="text-2xl md:text-3xl font-black brand-font text-white tracking-wider flex items-center gap-2"
        >
          GOTHAM<span class="text-rose-600">GARAGE</span>
        </RouterLink>

        <nav class="hidden lg:flex space-x-10 text-sm font-semibold tracking-wide uppercase text-neutral-300 brand-font">
          <RouterLink
            to="/"
            class="relative pb-1 transition-all border-b-2 border-transparent hover:text-rose-500"
            active-class="text-rose-500 !border-rose-500"
          >
            Home
            <span v-if="showShortcuts" class="absolute -top-3 -right-6 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none">Alt+1</span>
          </RouterLink>

          <RouterLink
            to="/merch"
            class="relative pb-1 transition-all border-b-2 border-transparent hover:text-rose-500"
            active-class="text-rose-500 !border-rose-500"
          >
            Shop Merch
            <span v-if="showShortcuts" class="absolute -top-3 -right-6 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none">Alt+2</span>
          </RouterLink>

          <RouterLink
            to="/video"
            class="relative pb-1 transition-all border-b-2 border-transparent hover:text-rose-500"
            active-class="text-rose-500 !border-rose-500"
          >
            Video Gallery
            <span v-if="showShortcuts" class="absolute -top-3 -right-6 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none">Alt+3</span>
          </RouterLink>
        </nav>

        <div class="flex items-center space-x-4 sm:space-x-5">

          <div class="hidden md:flex relative text-neutral-400 focus-within:text-white">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon class="w-4 h-4" />
            </span>
            <input
              ref="searchInputRef"
              v-model="searchTerm"
              @input="onInput"
              @keydown.enter.prevent="goToFirstSuggestion"
              type="text"
              placeholder="Search merch..."
              class="bg-neutral-900 border border-neutral-700 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-rose-600 transition-colors w-48 lg:w-64 text-white"
            />
            <span v-if="showShortcuts" class="absolute -top-2 -right-2 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse pointer-events-none z-10">Alt+S</span>

            <div
              v-if="showSuggestions"
              class="absolute left-0 mt-10 w-full bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50"
            >
              <ul class="max-h-60 overflow-auto custom-scrollbar">
                <li
                  v-for="item in suggestions"
                  :key="item.searchType + item.id"
                  @click="selectSuggestion(item)"
                  class="px-4 py-3 hover:bg-neutral-800 cursor-pointer text-sm text-neutral-200 flex items-center gap-3 border-b border-neutral-800 last:border-0"
                >
                  <img :src="item.image || item.thumbnail" class="w-10 h-10 object-cover rounded bg-neutral-950 flex-shrink-0" />
                  <div class="flex-1 overflow-hidden">
                    <div class="font-bold text-white truncate">{{ item.name || item.title }}</div>
                    <div class="text-[10px] font-bold mt-1 uppercase tracking-wider" :class="item.searchType === 'product' ? 'text-rose-500' : 'text-neutral-400'">
                      <span v-if="item.searchType === 'product'">Gear • ${{ item.price.toFixed(2) }}</span>
                      <span v-else class="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" class="text-rose-500"><path d="M5 3l14 9-14 9V3z"/></svg>
                        Video • {{ item.duration }}
                      </span>
                    </div>
                  </div>
                </li>
                <li v-if="suggestions.length === 0" class="px-4 py-4 text-center text-sm font-bold uppercase tracking-wider text-neutral-500 brand-font">
                  No results found
                </li>
              </ul>
            </div>
          </div>

          <button class="text-neutral-300 hover:text-white transition-colors md:hidden" aria-label="Search">
            <SearchIcon class="w-5 h-5" />
          </button>

          <RouterLink
            to="/profile"
            class="hidden sm:block text-neutral-300 hover:text-rose-500 transition-colors relative"
            aria-label="Account"
          >
            <AccountIcon class="w-5 h-5" />
            <span v-if="showShortcuts" class="absolute -top-3 -right-3 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none">Alt+A</span>
          </RouterLink>

          <button
            @click="$emit('open-wishlist')"
            class="text-neutral-300 hover:text-rose-500 transition-colors hidden sm:block relative"
            aria-label="Wishlist"
          >
            <WishlistIcon class="w-5 h-5" />
            <span v-if="showShortcuts" class="absolute -top-3 -right-3 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none z-20">Alt+W</span>
            <span
              v-if="wishlistStore.totalItems > 0 && !showShortcuts"
              class="absolute -top-2 -right-2 bg-rose-600 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full"
            >
              {{ wishlistStore.totalItems }}
            </span>
          </button>

          <button
            @click="$emit('open-cart')"
            class="text-neutral-300 hover:text-rose-500 transition-colors relative"
            aria-label="Cart"
          >
            <CartIcon class="w-6 h-6" />
            <span v-if="showShortcuts" class="absolute -top-3 -right-3 bg-rose-600 text-white text-[9px] px-1 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none z-20">Alt+C</span>
            <span
              v-if="cartStore.totalItems > 0 && !showShortcuts"
              class="absolute -top-2 -right-2 bg-rose-600 text-white text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>

          <button
            @click="toggleMobileMenu"
            class="text-neutral-300 hover:text-rose-500 transition-colors lg:hidden pl-2"
            aria-label="Toggle Menu"
          >
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <transition name="slide-fade">
        <nav
          v-if="isMobileMenuOpen"
          class="lg:hidden absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-800 shadow-2xl flex flex-col py-4 px-6 space-y-4 brand-font z-40"
        >
          <RouterLink to="/" @click="closeMobileMenu" class="text-neutral-300 hover:text-rose-500 text-lg font-semibold uppercase tracking-wide pb-2 border-b border-neutral-800" active-class="text-rose-500">Home</RouterLink>
          <RouterLink to="/merch" @click="closeMobileMenu" class="text-neutral-300 hover:text-rose-500 text-lg font-semibold uppercase tracking-wide pb-2 border-b border-neutral-800" active-class="text-rose-500">Shop Merch</RouterLink>
          <RouterLink to="/video" @click="closeMobileMenu" class="text-neutral-300 hover:text-rose-500 text-lg font-semibold uppercase tracking-wide pb-2 border-b border-neutral-800" active-class="text-rose-500">Video Gallery</RouterLink>

          <div class="flex space-x-6 pt-2">
            <RouterLink to="/profile" @click="closeMobileMenu" class="text-neutral-300 hover:text-rose-500 transition-colors flex items-center gap-2 text-sm uppercase">
              <AccountIcon class="w-4 h-4" /> Account
            </RouterLink>
            <button @click="$emit('open-wishlist'); closeMobileMenu()" class="text-neutral-300 hover:text-rose-500 transition-colors flex items-center gap-2 text-sm uppercase">
              <WishlistIcon class="w-4 h-4" /> Wishlist
            </button>
          </div>
        </nav>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

// import products for search
import productData from '../data/products.json'
import videoData from '../data/videos.json'

// IMPORT THE STORE
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'

import CartIcon from './icons/CartIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import WishlistIcon from './icons/WishlistIcon.vue'
import AccountIcon from './icons/AccountIcon.vue'

// INITIALIZE THE STORE
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const router = useRouter()

// 1. CAPTURE EMIT TO A VARIABLE (So we can use it in the shortcuts below)
const emit = defineEmits(['open-cart', 'open-wishlist'])

// 2. CREATE A REF FOR THE SEARCH BAR
const searchInputRef = ref(null)

// ==========================================
// MOBILE MENU STATE
// ==========================================
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// ==========================================
// SEARCH STATE & LOGIC
// ==========================================
const searchTerm = ref('')
const showSuggestions = ref(false)

// COMBINED SEARCH RESULTS LOGIC
const suggestions = computed(() => {
  const q = searchTerm.value.trim().toLowerCase()
  if (!q) return []

  // 1. Search Products (Tag them as 'product')
  const matchedProducts = productData
    .filter((p) => p.name.toLowerCase().includes(q))
    .map((p) => ({ ...p, searchType: 'product' }))

  // 2. Search Videos (Tag them as 'video')
  const matchedVideos = videoData
    .filter((v) => v.title.toLowerCase().includes(q))
    .map((v) => ({ ...v, searchType: 'video' }))

  // 3. Combine both lists and limit to top 8 results total
  return [...matchedProducts, ...matchedVideos].slice(0, 8)
})

const onInput = () => {
  showSuggestions.value = searchTerm.value.trim().length > 0
}

// DYNAMIC ROUTING
const selectSuggestion = (item) => {
  // Clear the search bar
  searchTerm.value = ''
  showSuggestions.value = false

  // Route them based on the 'searchType' tag we added above
  if (item.searchType === 'product') {
    router.push({ path: '/merch', query: { highlight: item.id } })
  } else if (item.searchType === 'video') {
    router.push({ path: '/video', query: { highlight: item.id } })
  }
}

const goToFirstSuggestion = () => {
  if (suggestions.value.length > 0) selectSuggestion(suggestions.value[0])
}
// ==========================================
// KEYBOARD SHORTCUTS (Hold Alt to peek!)
// ==========================================
// 1. New variable to control if the shortcut badges are visible
const showShortcuts = ref(false)

const handleKeyDown = (event) => {
  // If they press the Alt key down, show the badges!
  if (event.key === 'Alt') {
    showShortcuts.value = true
  }

  // Only trigger routing/actions if they are holding the "Alt" key + another key
  if (event.altKey) {
    switch (event.key.toLowerCase()) {
      case 's': // Alt + S = Focus Search
        event.preventDefault()
        searchInputRef.value?.focus()
        break
      case 'a': // Alt + A = Account
        event.preventDefault()
        router.push('/profile')
        break
      case 'w': // Alt + W = Wishlist
        event.preventDefault()
        emit('open-wishlist')
        break
      case 'c': // Alt + C = Cart
        event.preventDefault()
        emit('open-cart')
        break
      case '1': // Alt + 1 = Home
        event.preventDefault()
        router.push('/')
        break
      case '2': // Alt + 2 = Shop Merch
        event.preventDefault()
        router.push('/merch')
        break
      case '3': // Alt + 3 = Video Gallery
        event.preventDefault()
        router.push('/video')
        break
    }
  }
}

const handleKeyUp = (event) => {
  // Hide the badges when they let go of the Alt key!
  if (event.key === 'Alt') {
    showShortcuts.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp) // Listen for when they let go
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

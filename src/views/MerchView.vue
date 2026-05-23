<template>
  <!-- SHOP HEADER & BREADCRUMBS -->
  <div class="bg-neutral-900 border-b border-neutral-800">
    <div class="container mx-auto px-4 lg:px-8 py-6">
      <!-- Breadcrumbs (Fixes Heuristic 6 / Recognition over Recall) -->
      <nav class="text-xs text-neutral-500 mb-4 font-semibold tracking-wider uppercase">
        <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
        <span class="mx-2">&gt;</span>
        <span class="text-rose-500">Shop Merch</span>
      </nav>

      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 class="text-4xl font-black text-white uppercase brand-font">Shop All Merch</h1>
          <p class="text-neutral-400 mt-2 text-sm">Showing all items</p>
        </div>

        <!-- Sort Dropdown -->
        <div class="flex items-center gap-3">
          <label for="sort" class="text-sm font-bold text-neutral-400 uppercase tracking-wider">
            Sort By:
          </label>
          <select
            id="sort"
            v-model="sortBy"
            class="bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-2 focus:outline-none focus:border-rose-600 cursor-pointer"
          >
            <option value="Featured">Featured</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Newest Arrivals">Newest Arrivals</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <!-- MAIN SHOP LAYOUT -->
  <section class="flex-grow container mx-auto px-4 lg:px-8 py-10">
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- SIDEBAR FILTERS -->
      <aside class="w-full lg:w-64 flex-shrink-0">
        <div class="bg-neutral-900/50 rounded-lg border border-neutral-800 p-6 sticky top-28">
          <h2
            class="text-lg font-bold text-white uppercase brand-font mb-6 border-b border-neutral-800 pb-2"
          >
            Filters
          </h2>

          <!-- Category Filter -->
          <div class="mb-8">
            <h3 class="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul class="space-y-3">
              <li>
                <label
                  class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <!-- If the array is empty, "All Apparel" is checked. Clicking it clears the array. -->
                  <input
                    type="checkbox"
                    :checked="selectedCategories.length === 0"
                    @change="selectedCategories = []"
                    class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                  />
                  All Apparel
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value="T-Shirts"
                    v-model="selectedCategories"
                    class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                  />
                  T-Shirts
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value="Hoodies & Sweaters"
                    v-model="selectedCategories"
                    class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                  />
                  Hoodies & Sweaters
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value="Hats & Caps"
                    v-model="selectedCategories"
                    class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                  />
                  Hats & Caps
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    value="Accessories"
                    v-model="selectedCategories"
                    class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
                  />
                  Accessories
                </label>
              </li>
            </ul>
          </div>

          <!-- Size Filter -->
          <div class="mb-8">
            <h3 class="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4">Size</h3>
            <div class="flex flex-wrap gap-2">
              <!-- Loop through sizes to create buttons dynamically -->
              <button
                v-for="size in ['S', 'M', 'L', 'XL', '2XL']"
                :key="size"
                @click="toggleSize(size)"
                :class="[
                  'w-10 h-10 rounded border transition-colors text-sm font-bold',
                  selectedSize === size
                    ? 'border-rose-500 bg-rose-600/20 text-white'
                    : 'border-neutral-700 text-neutral-400 hover:border-rose-500 hover:text-white',
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Availability Filter -->
          <div>
            <h3 class="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4">
              Availability
            </h3>
            <label
              class="flex items-center gap-3 text-neutral-400 hover:text-white cursor-pointer transition-colors"
            >
              <!-- v-model connects this to the boolean variable -->
              <input
                type="checkbox"
                v-model="inStockOnly"
                class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700"
              />
              In Stock Only
            </label>
          </div>
        </div>
      </aside>

      <!-- DYNAMIC PRODUCT GRID -->
      <!-- PRODUCT GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- V-FOR LOOP: This single block repeats for every item in your JSON file -->
        <div
          v-for="product in sortedProducts"
          :key="product.id"
          :id="`product-${product.id}`"
          :class="[
            'bg-neutral-900 border border-neutral-800 rounded-lg p-4 lg:p-5 group hover:border-neutral-700 transition-colors flex flex-col',
            highlightedProductId === product.id || Number(highlightedProductId) === product.id
              ? 'highlight-rose'
              : '',
          ]"
        >
          <!-- Product Image & Badge -->
          <div class="h-64 sm:h-72 bg-neutral-950 rounded mb-4 overflow-hidden relative">
            <!-- Dynamic Badge (Only shows if the JSON has a badge text) -->
            <span
              v-if="product.badge"
              class="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded z-10"
            >
              {{ product.badge }}
            </span>

            <!-- Dynamic Image -->
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />

            <!-- Wishlist Heart Icon -->
            <button
              @click.stop="addToWishlist(product)"
              class="absolute top-3 right-3 w-8 h-8 bg-neutral-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-400 hover:text-rose-500 hover:bg-neutral-900 transition-all z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.7 7.8l1.1 1 7.7 7.8 7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8z"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Product Details -->
          <div class="flex-grow flex flex-col justify-between">
            <div>
              <h3 class="text-white font-bold text-sm lg:text-base leading-tight mb-1">
                {{ product.name }}
              </h3>
              <p class="text-rose-500 font-black brand-font tracking-wider mb-4">
                ${{ product.price.toFixed(2) }}
              </p>
            </div>

            <!-- Action Buttons (Add to Cart & Buy Now) -->
            <div class="space-y-2 mt-auto">
              <button
                @click="addToCart(product)"
                :disabled="product.stock === 0"
                class="w-full text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors flex justify-center items-center gap-2"
                :class="
                  product.stock === 0
                    ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                "
              >
                <!-- Cart Icon (Shows for both Add to Cart and Unavailable) -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {{ product.stock === 0 ? 'Unavailable' : 'Add to Cart' }}
              </button>

              <button
                @click="buyNow(product)"
                :disabled="product.stock === 0"
                class="w-full text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
                :class="
                  product.stock === 0
                    ? 'hidden'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-[0_0_10px_rgba(225,29,72,0.2)]'
                "
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- RECENTLY VIEWED -->
  <section class="py-12 bg-neutral-900 border-t border-neutral-800">
    <!-- RECENTLY VIEWED SECTION -->
    <div class="mt-16 mb-12 bg-neutral-900/50 p-8 rounded-lg border border-neutral-800">
      <h2 class="text-xl font-black text-white uppercase brand-font mb-6 tracking-wide">
        Recently Viewed
      </h2>

      <!-- Flex container for the smaller layout -->
      <div class="flex flex-wrap gap-4">
        <!-- V-FOR LOOP: Using our recentlyViewed property -->
        <div
          v-for="product in recentlyViewed"
          :key="product.id"
          class="bg-neutral-950 border border-neutral-800 rounded p-4 w-56 group cursor-pointer hover:border-neutral-700 transition-colors"
          @click="() => scrollToProduct(product.id)"
        >
          <!-- Image Container -->
          <div class="h-40 bg-neutral-900 rounded mb-4 overflow-hidden relative">
            <!-- Badge -->
            <span
              v-if="product.badge"
              class="absolute top-2 left-2 bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded z-10"
            >
              {{ product.badge }}
            </span>

            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-80 group-hover:opacity-100"
            />
          </div>

          <!-- Product Info -->
          <h3 class="text-white font-bold text-sm mb-1 truncate">{{ product.name }}</h3>
          <p class="text-rose-500 font-bold brand-font text-sm">${{ product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================== -->
  <!-- OVERLAYS: TOAST NOTIFICATION & MINI CART   -->
  <!-- ========================================== -->

  <!-- Toast Notification -->
  <transition name="toast-slide">
    <div
      v-if="showToast"
      class="fixed top-24 right-4 z-[100] bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]"
    >
      <div class="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
        <i class="fa-solid fa-check text-white"></i>
      </div>
      <div>
        <p class="font-bold text-sm uppercase tracking-wider">Added to Cart!</p>
        <p class="text-green-100 text-xs mt-0.5 line-clamp-1">{{ lastAddedItem }}</p>
      </div>
      <button @click="showToast = false" class="ml-auto text-green-200 hover:text-white">
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>
    </div>
  </transition>

  <!-- Dark Overlay for Cart (Disabled for now) -->
  <transition name="fade">
    <div
      v-if="isCartOpen"
      @click="isCartOpen = false"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
    ></div>
  </transition>

  <!-- Mini Cart Drawer (Kept here for later use) -->
  <transition name="slide-right">
    <div
      v-if="isCartOpen"
      class="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl z-[90] flex flex-col"
    >
      <!-- Cart Header -->
      <div
        class="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950"
      >
        <h2 class="text-xl font-black text-white uppercase brand-font flex items-center gap-3">
          <i class="fa-solid fa-shopping-cart text-rose-600"></i> Your Cart
          <span class="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full">{{
            cartTotalItems
          }}</span>
        </h2>
        <button
          @click="isCartOpen = false"
          class="text-neutral-400 hover:text-rose-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-800"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <!-- Cart Body -->
      <div class="flex-grow overflow-y-auto p-6">
        <div
          v-if="cart.length === 0"
          class="h-full flex flex-col items-center justify-center text-neutral-500"
        >
          <i class="fa-solid fa-cart-arrow-down text-6xl mb-4 opacity-50"></i>
          <p class="text-lg font-bold text-white mb-2">Your cart is empty</p>
          <p class="text-sm text-center mb-6">Looks like you haven't added any gear yet.</p>
          <button
            @click="isCartOpen = false"
            class="bg-rose-600 text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded"
          >
            Start Shopping
          </button>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="(item, index) in cart"
            :key="index"
            class="flex gap-4 bg-neutral-950 p-3 rounded-lg border border-neutral-800"
          >
            <div
              class="w-20 h-20 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0"
            >
              <i :class="item.icon" class="text-3xl text-neutral-600"></i>
            </div>
            <div class="flex-grow flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start">
                  <h4 class="text-white font-bold text-sm leading-tight pr-4">{{ item.name }}</h4>
                  <button
                    @click="removeFromCart(index)"
                    class="text-neutral-500 hover:text-rose-500 transition-colors"
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <p class="text-rose-500 font-bold text-sm mt-1">${{ item.price.toFixed(2) }}</p>
              </div>
              <div class="flex items-center gap-3 mt-2">
                <div class="flex items-center bg-neutral-900 border border-neutral-700 rounded">
                  <button
                    @click="decreaseQty(item)"
                    class="w-8 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span class="w-8 text-center text-white text-xs font-bold">{{
                    item.quantity
                  }}</span>
                  <button
                    @click="increaseQty(item)"
                    class="w-8 h-7 flex items-center justify-center text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="cart.length > 0" class="border-t border-neutral-800 p-6 bg-neutral-950">
        <div class="flex justify-between items-center mb-4">
          <span class="text-neutral-400 font-bold uppercase tracking-wider text-sm">Subtotal</span>
          <span class="text-2xl font-black text-white brand-font"
            >${{ cartSubtotal.toFixed(2) }}</span
          >
        </div>
        <p class="text-xs text-neutral-500 mb-6">Shipping and taxes calculated at checkout.</p>

        <RouterLink
          to="/checkout"
          @click="isCartOpen = false"
          class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 rounded transition-colors brand-font shadow-[0_0_20px_rgba(225,29,72,0.3)] mb-3 flex justify-center items-center"
        >
          Proceed to Checkout
        </RouterLink>

        <button
          @click="isCartOpen = false"
          class="w-full text-center text-neutral-400 hover:text-white text-sm font-bold uppercase tracking-wider py-2"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </transition>

  <!-- TOAST NOTIFICATION COMPONENT -->
  <ToastNotification
    :show="showToast"
    :itemName="lastAddedItem"
    :variant="toastVariant"
    :color="toastColor"
    @close="showToast = false"
  />
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import productData from '../data/products.json'

const cartStore = useCartStore()
const route = useRoute()
const router = useRouter()

// highlighted product id from query param
const highlightedProductId = ref(null)

const scrollToProduct = async (id) => {
  await nextTick()
  const el = document.getElementById(`product-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    highlightedProductId.value = Number(id)
    setTimeout(() => {
      highlightedProductId.value = null
    }, 4000)
  }
}

// Watch route for highlight query param (from search)
watch(
  () => route.query.highlight,
  (val) => {
    if (val) scrollToProduct(val)
  },
)

// handle initial load with highlight and categories
onMounted(() => {
  if (route.query.highlight) scrollToProduct(route.query.highlight)
  if (route.query.categories) {
    selectedCategories.value = route.query.categories.split(',')
  }
})

// --- 1. DYNAMIC BADGE LOGIC ---
// First, find the global stats across all products
const maxSales = Math.max(...productData.map((p) => p.sales))
const minPrice = Math.min(...productData.map((p) => p.price))
const minStock = Math.min(...productData.filter((p) => p.stock > 0).map((p) => p.stock)) // Lowest stock that isn't 0
const top4Ids = [...productData]
  .sort((a, b) => b.id - a.id)
  .slice(0, 4)
  .map((p) => p.id)

// Now, map through the products and assign the badge dynamically based on your rules!
const productsWithBadges = computed(() => {
  return productData.map((product) => {
    let dynamicBadge = ''

    // Priority 1: Sold Out (Most important UX rule)
    if (product.stock === 0) {
      dynamicBadge = 'Sold Out'
    }
    // Priority 2: Limited (Lowest stock)
    else if (product.stock === minStock) {
      dynamicBadge = 'Limited'
    }
    // Priority 3: Popular (Highest sales)
    else if (product.sales === maxSales) {
      dynamicBadge = 'Popular'
    }
    // Priority 4: Sale (Lowest price)
    else if (product.price === minPrice) {
      dynamicBadge = 'Sale'
    }
    // Priority 5: New (Top 4 latest IDs)
    else if (top4Ids.includes(product.id)) {
      dynamicBadge = 'New'
    }

    // Return the product with our newly calculated badge!
    return { ...product, badge: dynamicBadge }
  })
})

// --- 2. FILTER STATE VARIABLES ---
const selectedCategories = ref([])
const selectedSize = ref('')
const inStockOnly = ref(false)

// Watch for categories query param changes
watch(
  () => route.query.categories,
  (val) => {
    if (val) {
      selectedCategories.value = val.split(',')
    }
  },
)

const toggleSize = (size) => {
  if (selectedSize.value === size) {
    selectedSize.value = ''
  } else {
    selectedSize.value = size
  }
}

// --- 3. COMPUTED FILTER LOGIC ---
const filteredProducts = computed(() => {
  // IMPORTANT: We filter "productsWithBadges.value" instead of the raw JSON now!
  return productsWithBadges.value.filter((product) => {
    const categoryMatch =
      selectedCategories.value.length === 0 || selectedCategories.value.includes(product.category)
    const sizeMatch = selectedSize.value === '' || product.sizes.includes(selectedSize.value)
    const stockMatch = !inStockOnly.value || product.stock > 0

    return categoryMatch && sizeMatch && stockMatch
  })
})

// --- 4. RECENTLY VIEWED LOGIC ---
const recentlyViewed = computed(() => {
  // Grabs a 2-item slice from the middle of the database to simulate past browsing
  return productsWithBadges.value.slice(3, 5)
})

// 1. ADD THIS NEW STATE VARIABLE FOR SORTING
const sortBy = ref('Featured') // Default to Featured

// 2. CREATE THE SORTING COMPUTED PROPERTY
const sortedProducts = computed(() => {
  // First, make a copy of the filtered products so we don't accidentally mutate the original data
  const productsToSort = [...filteredProducts.value]

  // Apply sorting logic based on the dropdown selection
  if (sortBy.value === 'Price: Low to High') {
    return productsToSort.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'Price: High to Low') {
    return productsToSort.sort((a, b) => b.price - a.price)
  } else if (sortBy.value === 'Newest Arrivals') {
    return productsToSort.sort((a, b) => b.id - a.id) // Biggest ID first
  } else {
    // DEFAULT "FEATURED" LOGIC
    // We assign a numeric weight to each badge to force them into the exact order you requested
    const badgeRank = {
      Popular: 1,
      New: 2,
      Limited: 3,
      Sale: 4,
      '': 5, // Normal products (No badge)
      'Sold Out': 6, // Always push to the very bottom
    }

    return productsToSort.sort((a, b) => {
      const rankA = badgeRank[a.badge] || 5
      const rankB = badgeRank[b.badge] || 5

      // If two items have the same rank (e.g., both are "Normal"), sort them by Newest as a tie-breaker
      if (rankA === rankB) return b.id - a.id

      return rankA - rankB // Sort by the numeric weight we assigned above
    })
  }
})

import ToastNotification from '../components/ToastNotification.vue' // IMPORT THE TOAST
import { useWishlistStore } from '../stores/wishlist'
import { useAuthStore } from '../stores/auth'

// toast variant for icon selection
const toastVariant = ref('cart')
const toastColor = ref(null)

const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

// ... (Your existing store and filter logic)

// --- TOAST NOTIFICATION LOGIC ---
const showToast = ref(false)
const lastAddedItem = ref('')
let toastTimeout
let redirectTimeout

const addToCart = (product) => {
  if (!authStore.isAuthenticated) {
    lastAddedItem.value = 'Sign in to add items to your cart.'
    toastVariant.value = 'signin'
    showToast.value = true
    clearTimeout(toastTimeout)
    clearTimeout(redirectTimeout)
    toastTimeout = setTimeout(() => {
      showToast.value = false
    }, 1000)
    redirectTimeout = setTimeout(() => {
      router.push({ path: '/login' })
    }, 1000)
    return
  }

  cartStore.addToCart(product)

  // Trigger the Toast
  lastAddedItem.value = product.name
  toastVariant.value = 'cart'
  showToast.value = true

  // Reset the timer so it hides after 3 seconds
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    showToast.value = false
  }, 1000)
}

const addToWishlist = (product) => {
  if (!authStore.isAuthenticated) {
    lastAddedItem.value = 'Sign in to save items to your wishlist.'
    toastVariant.value = 'signin'
    showToast.value = true
    clearTimeout(toastTimeout)
    clearTimeout(redirectTimeout)
    toastTimeout = setTimeout(() => {
      showToast.value = false
    }, 1000)
    redirectTimeout = setTimeout(() => {
      router.push({ path: '/login' })
    }, 1000)
    return
  }

  wishlistStore.addToWishlist(product)
  lastAddedItem.value = product.name
  // Show wishlist message but use green background when authenticated
  toastVariant.value = 'wishlist'
  toastColor.value = authStore.isAuthenticated ? 'green' : 'rose'
  showToast.value = true
}

// Update the buyNow function to use the new addToCart function so it triggers the toast too!
const buyNow = (product) => {
  if (!authStore.isAuthenticated) {
    lastAddedItem.value = 'Sign in to proceed to checkout.'
    toastVariant.value = 'signin'
    showToast.value = true
    clearTimeout(toastTimeout)
    clearTimeout(redirectTimeout)
    toastTimeout = setTimeout(() => {
      showToast.value = false
    }, 3000)
    redirectTimeout = setTimeout(() => {
      router.push({ path: '/login' })
    }, 900)
    return
  }

  // Authenticated: route to checkout
  router.push({ path: '/checkout', query: { buyNow: product.id } })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.app-wrapper {
  font-family: 'Inter', sans-serif;
  background-color: #0a0a0a;
  color: #f3f4f6;
}

h1,
h2,
h3,
h4,
.brand-font {
  font-family: 'Orbitron', sans-serif;
}

.product-card-hover {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(225, 29, 72, 0.15);
  border-color: rgba(225, 29, 72, 0.5);
}

/* Transitions */
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

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom highlight using requested color #e11d48 (rgb(225,29,72)) */
.highlight-rose {
  border-color: #e11d48;
  box-shadow:
    0 0 0 4px rgba(225, 29, 72, 0.12),
    0 0 0 2px rgba(225, 29, 72, 0.28);
}
</style>

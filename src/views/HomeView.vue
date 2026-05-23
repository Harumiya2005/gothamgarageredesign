<template>
  <main class="flex-grow">
    <!-- HERO SECTION -->
    <section class="hero-pattern h-[60vh] md:h-[70vh] flex items-center relative">
      <div class="container mx-auto px-4 lg:px-8 relative z-10">
        <div class="max-w-2xl">
          <span class="text-rose-500 font-bold tracking-[0.3em] text-sm uppercase mb-4 block"
            >Official Merchandise</span
          >
          <h1 class="text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase">
            If You Can Dream It,<br />We Can <span class="text-rose-600">Build It.</span>
          </h1>
          <p class="text-neutral-300 text-lg mb-8 max-w-lg">
            Gear up with the official apparel of the crew from the Netflix hit series
            <strong>Car Masters: Rust to Riches</strong>. Built for the garage, styled for the
            streets.
          </p>
          <div class="flex flex-wrap gap-4">
            <!-- Connected Hero Links -->
            <RouterLink
              to="/merch"
              class="bg-rose-600 hover:bg-rose-700 text-white brand-font font-bold uppercase tracking-wider py-3 px-8 rounded flex items-center transition-all"
            >
              Shop All Merch <i class="fa-solid fa-arrow-right ml-2"></i>
            </RouterLink>
            <RouterLink
              to="/video"
              class="bg-transparent border border-neutral-500 hover:border-white text-white brand-font font-bold uppercase tracking-wider py-3 px-8 rounded flex items-center transition-all"
            >
              <i class="fa-solid fa-play mr-2"></i> Watch Builds
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PRODUCTS -->
    <section class="py-20 bg-neutral-950">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex justify-between items-end mb-10 border-b border-neutral-800 pb-4">
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-white uppercase brand-font">
              New Arrivals
            </h2>
            <p class="text-neutral-400 text-sm mt-1">Latest gear straight from the shop.</p>
          </div>
          <!-- Connected "View All" Link -->
          <RouterLink
            to="/merch"
            class="text-rose-500 hover:text-rose-400 text-sm font-bold uppercase tracking-wider hidden sm:block"
          >
            View All Merch <i class="fa-solid fa-chevron-right text-xs"></i>
          </RouterLink>
        </div>

        <!-- Dynamic Product Grid -->
        <!-- NEW ARRIVALS GRID -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- V-FOR LOOP: Now using our new computed property! -->
          <div
            v-for="product in newArrivals"
            :key="product.id"
            class="bg-neutral-900 border border-neutral-800 rounded-lg p-4 lg:p-5 group hover:border-neutral-700 transition-colors flex flex-col"
          >
            <!-- Product Image & Badge -->
            <div class="h-64 bg-neutral-950 rounded mb-4 overflow-hidden relative">
              <span
                v-if="product.badge"
                class="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded z-10"
              >
                {{ product.badge }}
              </span>

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
                <h3 class="text-white font-bold text-sm leading-tight mb-1">{{ product.name }}</h3>
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
                    <path
                      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    ></path>
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
      <div class="mt-16 bg-neutral-900/50 p-8 rounded-lg border border-neutral-800">
        <h2 class="text-xl font-black text-white uppercase brand-font mb-6 tracking-wide">
          Recently Viewed
        </h2>

        <!-- Flex container for the smaller layout -->
        <div class="flex flex-wrap gap-4">
          <!-- V-FOR LOOP: Using our new recentlyViewed property -->
          <div
            v-for="product in recentlyViewed"
            :key="product.id"
            class="bg-neutral-950 border border-neutral-800 rounded p-4 w-56 group cursor-pointer hover:border-neutral-700 transition-colors"
            @click="() => goToMerchAndHighlight(product)"
          >
            <!-- Image Container -->
            <div class="h-40 bg-neutral-900 rounded mb-4 overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out opacity-80 group-hover:opacity-100"
              />
            </div>

            <!-- Product Info -->
            <h3 class="text-white font-bold text-sm mb-1 truncate">{{ product.name }}</h3>
            <p class="text-rose-500 font-bold brand-font text-sm">
              ${{ product.price.toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ========================================== -->
  <!-- OVERLAYS: TOAST NOTIFICATION & MINI CART   -->
  <!-- ========================================== -->

  <!-- Toast Notification (reusable) -->
  <ToastNotification
    :show="showToast"
    :itemName="lastAddedItem"
    :variant="toastVariant"
    :color="toastColor"
    @close="showToast = false"
  />

  <!-- Dark Overlay for Cart -->
  <transition name="fade">
    <div
      v-if="isCartOpen"
      @click="isCartOpen = false"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
    ></div>
  </transition>

  <!-- Mini Cart Drawer -->
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

        <!-- Connected "Proceed to Checkout" from the mini-cart drawer -->
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import productData from '../data/products.json'
import { useRouter } from 'vue-router'
import ToastNotification from '../components/ToastNotification.vue'
import { useAuthStore } from '../stores/auth'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

// --- 1. DYNAMIC BADGE LOGIC (Same as ShopView) ---
const maxSales = Math.max(...productData.map((p) => p.sales))
const minPrice = Math.min(...productData.map((p) => p.price))
const minStock = Math.min(...productData.filter((p) => p.stock > 0).map((p) => p.stock))
const top4Ids = [...productData]
  .sort((a, b) => b.id - a.id)
  .slice(0, 4)
  .map((p) => p.id)

const productsWithBadges = computed(() => {
  return productData.map((product) => {
    let dynamicBadge = ''

    if (product.stock === 0) dynamicBadge = 'Sold Out'
    else if (product.stock === minStock) dynamicBadge = 'Limited'
    else if (product.sales === maxSales) dynamicBadge = 'Popular'
    else if (product.price === minPrice) dynamicBadge = 'Sale'
    else if (top4Ids.includes(product.id)) dynamicBadge = 'New'

    return { ...product, badge: dynamicBadge }
  })
})

// --- 2. HOME SECTIONS LOGIC ---
// Grab ONLY the top 4 latest IDs for the New Arrivals section
const newArrivals = computed(() => {
  return productsWithBadges.value
    .filter((product) => top4Ids.includes(product.id))
    .sort((a, b) => b.id - a.id) // Sort them highest ID first
})

// Grab a slice of products for Recently Viewed
const recentlyViewed = computed(() => {
  return productsWithBadges.value.slice(3, 5)
})

// --- 3. TOAST NOTIFICATIONS ---
const showToast = ref(false)
const lastAddedItem = ref('')
let toastTimeout
let redirectTimeout
const toastVariant = ref('cart')
const toastColor = ref(null)

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
  lastAddedItem.value = product.name
  toastVariant.value = 'cart'
  showToast.value = true
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
  // Show wishlist text but use green background when authenticated
  toastVariant.value = 'wishlist'
  toastColor.value = authStore.isAuthenticated ? 'green' : 'rose'
  showToast.value = true
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    showToast.value = false
  }, 1000)
}

const router = useRouter()

const goToMerchAndHighlight = (product) => {
  if (!product || !product.id) return
  router.push({ path: '/merch', query: { productId: product.id } })
}

// Add this function right next to your addToCart function
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

.hero-pattern {
  background-image:
    linear-gradient(to right, rgba(10, 10, 10, 0.9), rgba(10, 10, 10, 0.4)),
    url('https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
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
</style>

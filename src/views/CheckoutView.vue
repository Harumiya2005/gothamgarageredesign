<template>
  <main class="flex-grow bg-neutral-950 py-8 lg:py-12 min-h-screen">
    <div class="container mx-auto px-4 lg:px-8 max-w-7xl">

      <!-- BACK LINK -->
      <button @click="goBack" class="text-neutral-400 hover:text-white text-sm font-bold tracking-wider uppercase flex items-center gap-2 mb-6 transition-colors w-max">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Return
      </button>

      <!-- PAGE TITLE & DYNAMIC PROGRESS BAR -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-neutral-800 pb-6 gap-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-black text-white uppercase brand-font">Secure Checkout</h1>
          <p class="text-neutral-400 mt-2 text-sm">
            {{ currentStep === 1 ? 'Please complete your shipping details.' : currentStep === 2 ? 'Enter your payment information.' : 'Review and place your order.' }}
          </p>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center gap-2 sm:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div class="flex items-center gap-2 uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap font-bold" :class="currentStep >= 1 ? 'text-rose-500' : 'text-neutral-500'">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs" :class="currentStep >= 1 ? 'bg-rose-600 text-white' : 'bg-neutral-800 border border-neutral-600'">1</span>
            Shipping
          </div>
          <div class="w-8 sm:w-12 h-px" :class="currentStep >= 2 ? 'bg-rose-600' : 'bg-neutral-700'"></div>

          <div class="flex items-center gap-2 uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap font-bold" :class="currentStep >= 2 ? 'text-rose-500' : 'text-neutral-500'">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs" :class="currentStep >= 2 ? 'bg-rose-600 text-white' : 'bg-neutral-800 border border-neutral-600'">2</span>
            Payment
          </div>
          <div class="w-8 sm:w-12 h-px" :class="currentStep === 3 ? 'bg-rose-600' : 'bg-neutral-700'"></div>

          <div class="flex items-center gap-2 uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap font-bold" :class="currentStep === 3 ? 'text-rose-500' : 'text-neutral-500'">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs" :class="currentStep === 3 ? 'bg-rose-600 text-white' : 'bg-neutral-800 border border-neutral-600'">3</span>
            Review
          </div>
        </div>
      </div>

      <!-- CHECKOUT LAYOUT -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">

        <!-- LEFT COLUMN: FORMS -->
        <div class="lg:col-span-7 xl:col-span-8 space-y-8">

          <!-- Empty State (Only shows if cart is empty AND they didn't click Buy Now) -->
          <div v-if="checkoutItems.length === 0 && !orderPlaced" class="bg-neutral-900 border border-neutral-800 rounded-lg p-10 text-center">
            <h2 class="text-xl font-bold text-white uppercase brand-font mb-4">No Items to Checkout</h2>
            <p class="text-neutral-400 mb-6">You need to add items to your cart or select a product before checking out.</p>
            <RouterLink to="/merch" class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-3 px-8 rounded transition-colors inline-block">
              Go to Shop
            </RouterLink>
          </div>

          <!-- SUCCESS STATE -->
          <div v-else-if="orderPlaced" class="bg-neutral-900 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)] rounded-lg p-10 text-center">
            <div class="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 class="text-3xl font-black text-white uppercase brand-font mb-2">Order Confirmed!</h2>
            <p class="text-neutral-400 mb-6">Thank you, {{ shippingInfo.firstName }}. Your gear is being prepared for the garage.</p>
            <p class="text-sm text-neutral-500 mb-8">Order #{{ Math.floor(Math.random() * 90000) + 10000 }}</p>
            <RouterLink to="/" class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-3 px-8 rounded transition-colors inline-block">
              Return Home
            </RouterLink>
          </div>

          <!-- STEP 1: SHIPPING FORM -->
          <form v-else-if="currentStep === 1" @submit.prevent="nextStep">

            <!-- CONTACT INFO -->
            <section class="bg-[#111111] border border-neutral-800 rounded p-6 md:p-8">
              <h2 class="text-lg font-bold text-white uppercase brand-font mb-6 tracking-wide">
                Contact Information
              </h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Email Address <span class="text-rose-600">*</span></label>
                  <input type="email" v-model="shippingInfo.email" required placeholder="name@example.com" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <label class="flex items-center gap-3 text-sm text-neutral-400 cursor-pointer pt-2">
                  <input type="checkbox" checked class="accent-rose-600 w-4 h-4 rounded bg-neutral-800 border-neutral-700">
                  Keep me up to date on news and exclusive offers
                </label>
              </div>
            </section>

            <!-- SHIPPING ADDRESS -->
            <section class="bg-[#111111] border border-neutral-800 rounded p-6 md:p-8 mt-6">
              <h2 class="text-lg font-bold text-white uppercase brand-font mb-6 tracking-wide">
                Shipping Address
              </h2>

              <!-- SAVED ADDRESSES SELECTOR -->
              <div v-if="savedAddresses.length > 0" class="mb-8">
                <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Saved Addresses</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    v-for="addr in savedAddresses"
                    :key="addr.id"
                    @click="applySavedAddress(addr)"
                    class="bg-[#0a0a0a] border hover:border-rose-600 rounded p-4 cursor-pointer transition-colors group"
                    :class="shippingInfo.address === addr.street ? 'border-rose-500 shadow-[0_0_10px_rgba(225,29,72,0.2)]' : 'border-neutral-800'"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <p class="text-white font-bold text-sm">{{ addr.name }}</p>
                      <span v-if="addr.isDefault" class="bg-neutral-800 group-hover:bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-colors">Default</span>
                    </div>
                    <p class="text-neutral-500 text-xs leading-relaxed mt-2">
                      {{ addr.street }}<br>
                      {{ addr.city }}, {{ addr.state }} {{ addr.zip }}<br>
                      <span class="text-white font-bold">{{ addr.country }}</span> <!-- Added Country Display -->
                    </p>
                  </div>
                </div>

                <div class="my-6 flex items-center gap-4">
                  <div class="flex-grow h-px bg-neutral-800"></div>
                  <span class="text-xs text-neutral-500 font-bold uppercase tracking-widest">Or enter a new address</span>
                  <div class="flex-grow h-px bg-neutral-800"></div>
                </div>
              </div>

              <!-- MANUAL FORM -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">First Name <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.firstName" required placeholder="First name" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Last Name <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.lastName" required placeholder="Last name" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Address <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.address" required placeholder="Street address or P.O. Box" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Apartment, suite, etc. (optional)</label>
                  <input type="text" placeholder="Apt, suite, unit, building, floor, etc." class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">City <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.city" required placeholder="City" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Country/Region <span class="text-rose-600">*</span></label>
                  <select v-model="shippingInfo.country" required class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors appearance-none">
                    <option value="" disabled>Select country...</option>
                    <!-- IMPORTANT: The values here MUST perfectly match user.json -->
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">State/Province <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.state" required placeholder="State" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div>
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">ZIP / Postal Code <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="shippingInfo.zip" required placeholder="ZIP Code" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
              </div>
            </section>

            <div class="mt-8 flex justify-end">
              <button type="submit" class="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 px-12 rounded transition-colors brand-font shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                Continue to Payment
              </button>
            </div>
          </form>

          <!-- STEP 2: PAYMENT FORM -->
          <form v-else-if="currentStep === 2" @submit.prevent="nextStep">
            <section class="bg-[#111111] border border-neutral-800 rounded p-6 md:p-8">
              <h2 class="text-lg font-bold text-white uppercase brand-font mb-6 tracking-wide">
                Payment Details
              </h2>

              <div class="bg-[#0a0a0a] border border-neutral-700 rounded p-4 mb-6 flex gap-4 items-center">
                <input type="radio" checked class="accent-rose-600 w-4 h-4">
                <span class="text-white font-bold text-sm uppercase tracking-wider">Credit Card</span>
                <div class="ml-auto flex gap-2">
                  <div class="w-8 h-5 bg-neutral-800 rounded"></div>
                  <div class="w-8 h-5 bg-neutral-800 rounded"></div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Card Number <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="paymentInfo.cardNumber" required placeholder="0000 0000 0000 0000" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Name on Card <span class="text-rose-600">*</span></label>
                  <input type="text" v-model="paymentInfo.cardName" required placeholder="Name on card" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Expiration <span class="text-rose-600">*</span></label>
                    <input type="text" v-model="paymentInfo.expiry" required placeholder="MM/YY" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">CVC <span class="text-rose-600">*</span></label>
                    <input type="text" v-model="paymentInfo.cvc" required placeholder="123" class="w-full bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                  </div>
                </div>
              </div>
            </section>

            <div class="mt-8 flex justify-between">
              <button @click="currentStep = 1" type="button" class="text-neutral-400 hover:text-white font-bold uppercase tracking-widest py-4 px-6 rounded transition-colors text-sm">
                Back to Shipping
              </button>
              <button type="submit" class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 px-12 rounded transition-colors brand-font shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                Review Order
              </button>
            </div>
          </form>

          <!-- STEP 3: REVIEW FORM -->
          <div v-else-if="currentStep === 3">
            <section class="bg-[#111111] border border-neutral-800 rounded p-6 md:p-8">
              <h2 class="text-lg font-bold text-white uppercase brand-font mb-6 tracking-wide">Review Your Info</h2>

              <div class="space-y-6">
                <!-- Contact Summary -->
                <div class="flex justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <p class="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Contact</p>
                    <p class="text-white text-sm">{{ shippingInfo.email }}</p>
                  </div>
                  <button @click="currentStep = 1" class="text-rose-500 hover:text-rose-400 text-sm font-bold uppercase tracking-wider">Edit</button>
                </div>

                <!-- Ship to Summary -->
                <div class="flex justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <p class="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Ship To</p>
                    <p class="text-white text-sm">{{ shippingInfo.address }}, {{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.zip }}</p>
                  </div>
                  <button @click="currentStep = 1" class="text-rose-500 hover:text-rose-400 text-sm font-bold uppercase tracking-wider">Edit</button>
                </div>

                <!-- Payment Summary -->
                <div class="flex justify-between">
                  <div>
                    <p class="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Payment Method</p>
                    <p class="text-white text-sm">Card ending in •••• {{ paymentInfo.cardNumber.slice(-4) || 'XXXX' }}</p>
                  </div>
                  <button @click="currentStep = 2" class="text-rose-500 hover:text-rose-400 text-sm font-bold uppercase tracking-wider">Edit</button>
                </div>
              </div>
            </section>

            <div class="mt-8 flex justify-between">
              <button @click="currentStep = 2" type="button" class="text-neutral-400 hover:text-white font-bold uppercase tracking-widest py-4 px-6 rounded transition-colors text-sm">
                Back to Payment
              </button>
              <button @click="placeOrder" class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 px-12 rounded transition-colors brand-font shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                Place Order
              </button>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: DYNAMIC ORDER SUMMARY -->
        <div class="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0" v-if="!orderPlaced">
          <div class="bg-[#111111] border border-neutral-800 rounded p-6 sticky top-28">
            <h2 class="text-lg font-bold text-white uppercase brand-font mb-6 border-b border-neutral-800 pb-4 flex justify-between">
              Order Summary
              <span class="text-rose-500">{{ totalItemsCount }} Item(s)</span>
            </h2>

            <!-- DYNAMIC ITEMS LIST (Cart OR Single Direct Buy item) -->
            <div class="max-h-64 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-6">
              <div v-for="item in checkoutItems" :key="item.id" class="flex gap-4 items-center">
                <div class="w-16 h-16 bg-[#0a0a0a] rounded flex-shrink-0 relative border border-neutral-800">
                  <span class="absolute -top-2 -right-2 bg-neutral-700 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">{{ item.quantity }}</span>
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded opacity-90" />
                </div>
                <div class="flex-grow">
                  <h4 class="text-white font-bold text-sm line-clamp-2 leading-snug">{{ item.name }}</h4>
                </div>
                <p class="text-rose-500 font-bold text-sm brand-font">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>

            <!-- Discount Code -->
            <div class="flex gap-2 mb-6 border-t border-neutral-800 pt-6">
              <input type="text" placeholder="Discount code" class="flex-grow bg-[#0a0a0a] border border-neutral-800 text-white text-sm rounded px-4 py-2 focus:outline-none focus:border-rose-600 transition-colors">
              <button class="bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-bold px-4 rounded transition-colors uppercase">Apply</button>
            </div>

            <!-- Totals (Dynamically calculated based on checkout method) -->
            <div class="border-t border-neutral-800 pt-4 space-y-3">
              <div class="flex justify-between items-center text-sm">
                <span class="text-neutral-400 uppercase tracking-wider font-bold text-xs">Subtotal</span>
                <span class="text-white font-bold">${{ calculatedSubtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-neutral-400 uppercase tracking-wider font-bold text-xs">Shipping</span>
                <span class="text-white font-bold">$10.00</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-neutral-400 uppercase tracking-wider font-bold text-xs">Taxes (8%)</span>
                <span class="text-white font-bold">${{ (calculatedSubtotal * 0.08).toFixed(2) }}</span>
              </div>

              <div class="flex justify-between items-center pt-4 border-t border-neutral-800 mt-4">
                <span class="text-white font-bold uppercase tracking-wider">Total</span>
                <span class="text-3xl font-black text-rose-500 brand-font">
                  <span class="text-sm text-neutral-500 font-normal mr-1">USD</span>${{ (calculatedSubtotal + 10 + (calculatedSubtotal * 0.08)).toFixed(2) }}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'

// IMPORT DATABASES
import productData from '../data/products.json'
import userData from '../data/user.json'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// --- USER PROFILE & ADDRESS LOGIC ---
const savedAddresses = ref(userData.addresses)

// Form State
const shippingInfo = ref({
  email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: ''
})

// Auto-fill logic
const applySavedAddress = (addr) => {
  const nameParts = addr.name.split(' ')
  shippingInfo.value = {
    ...shippingInfo.value,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    address: addr.street,
    city: addr.city,
    state: addr.state,
    zip: addr.zip,
    country: addr.country // <-- This triggers the dropdown to change!
  }
}

// On page load, auto-fill the user's email and default address
onMounted(() => {
  shippingInfo.value.email = userData.profile.email
  const defaultAddr = savedAddresses.value.find(a => a.isDefault)
  if (defaultAddr) {
    applySavedAddress(defaultAddr)
  }
})

// --- DUAL CHECKOUT LOGIC ---
const isDirectBuy = computed(() => !!route.query.buyNow)

const checkoutItems = computed(() => {
  if (isDirectBuy.value) {
    const product = productData.find(p => p.id == route.query.buyNow)
    return product ? [{ ...product, quantity: 1 }] : []
  }
  return cartStore.items
})

const calculatedSubtotal = computed(() => {
  return checkoutItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const totalItemsCount = computed(() => {
  return checkoutItems.value.reduce((total, item) => total + item.quantity, 0)
})

// --- STATE MANAGEMENT ---
const currentStep = ref(1)
const orderPlaced = ref(false)

const paymentInfo = ref({
  cardNumber: '', cardName: '', expiry: '', cvc: ''
})

const goBack = () => router.back()

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const placeOrder = () => {
  orderPlaced.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (!isDirectBuy.value) {
    setTimeout(() => { cartStore.clearCart() }, 1000)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }

/* Custom select arrow */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>

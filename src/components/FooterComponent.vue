<template>
  <footer class="bg-black pt-16 pb-8 border-t-4 border-rose-600 mt-auto">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div>
          <a href="#" class="text-2xl font-black brand-font text-white tracking-wider block mb-4">
            GOTHAM<span class="text-rose-600">GARAGE</span>
          </a>
          <p class="text-neutral-400 text-sm mb-6 leading-relaxed">
            If you can dream it, we can build it. Official gear of the Netflix series Car Masters:
            Rust to Riches.
          </p>
          <div class="flex space-x-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
              ><i class="fa-brands fa-instagram"></i
            ></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
              ><i class="fa-brands fa-youtube"></i
            ></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
          </div>
        </div>

        <!-- Help & Policies -->
        <div>
          <h4 class="text-white font-bold uppercase tracking-wider mb-4">Help & Info</h4>
          <ul class="space-y-3 text-sm text-neutral-400">
            <li>
              <RouterLink to="/helpcenter&FAQ" class="hover:text-rose-500 transition-colors"
                >Help Center & FAQ</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/trackorder" class="hover:text-rose-500 transition-colors"
                >Track Your Order</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/return&refund" class="hover:text-rose-500 transition-colors"
                >Return & Refund Policy</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/return&refund" class="hover:text-rose-500 transition-colors"
                >Shipping Information</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/return&refund" class="hover:text-rose-500 transition-colors"
                >Privacy Policy</RouterLink
              >
            </li>
          </ul>
        </div>

        <!-- Shop (Simplified based on user feedback) -->
        <div>
          <h4 class="text-white font-bold uppercase tracking-wider mb-4">Shop</h4>
          <ul class="space-y-3 text-sm text-neutral-400">
            <li>
              <a
                href="#"
                @click.prevent="navigateToMerch([])"
                class="hover:text-rose-500 transition-colors text-white"
                >All Merchandise</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="navigateToMerch(['T-Shirts', 'Hoodies & Sweaters'])"
                class="hover:text-rose-500 transition-colors"
                >T-Shirts & Hoodies</a
              >
            </li>
            <li>
              <a
                href="#"
                @click.prevent="navigateToMerch(['Hats & Caps', 'Accessories'])"
                class="hover:text-rose-500 transition-colors"
                >Caps & Accessories</a
              >
            </li>
            <li>
              <RouterLink
                to="/gift-cards"
                class="hover:text-rose-500 transition-colors"
              >
                Gift Cards
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h4 class="text-white font-bold uppercase tracking-wider mb-4">Join The Crew</h4>
          <p class="text-neutral-400 text-sm mb-4">
            Subscribe for updates on new builds and exclusive merch drops.
          </p>
          <form class="flex flex-col gap-3" @submit.prevent>
            <input
              type="email"
              placeholder="Email Address *"
              required
              class="bg-neutral-900 border border-neutral-700 text-sm rounded px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors"
            />
            <label class="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                required
                class="accent-rose-600 rounded bg-neutral-800 border-neutral-700"
              />
              I agree to the Terms & Privacy Policy.
            </label>
            <button
              type="submit"
              class="bg-white text-black hover:bg-rose-600 hover:text-white font-bold uppercase tracking-wider text-sm py-3 rounded transition-colors brand-font mt-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div
        class="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500"
      >
        <p>&copy; 2026 SOA Marketing, LLC / Gotham Garage. All Rights Reserved.</p>
        <div class="flex gap-4 mt-4 md:mt-0 text-xl">
          <i class="fa-brands fa-cc-visa hover:text-white"></i>
          <i class="fa-brands fa-cc-mastercard hover:text-white"></i>
          <i class="fa-brands fa-cc-amex hover:text-white"></i>
          <i class="fa-brands fa-cc-paypal hover:text-white"></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToMerch = (categories) => {
  const query = categories.length > 0 ? { categories: categories.join(',') } : {}
  router.push({
    path: '/merch',
    query,
  })
  window.scrollTo(0, 0)
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
</style>

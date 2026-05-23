<template>
  <div class="app-wrapper antialiased flex flex-col min-h-screen">

    <main class="flex-grow bg-neutral-950 py-10 lg:py-16">
      <div class="container mx-auto px-4 lg:px-8 max-w-7xl">

        <!-- GUEST STATE (Not Logged In) -->
        <div v-if="!authStore.isAuthenticated" class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
          <div class="w-24 h-24 bg-neutral-900 border-2 border-neutral-800 rounded-full flex items-center justify-center mb-6 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h2 class="text-3xl md:text-4xl font-black text-white uppercase brand-font mb-4">No Garage Profile Found</h2>
          <p class="text-neutral-400 text-sm md:text-base max-w-md mb-8">
            You are currently browsing as a guest. Please sign in or create an account to view your order history, saved addresses, and account settings.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink to="/login" class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-3 px-10 rounded transition-colors brand-font shadow-[0_0_15px_rgba(225,29,72,0.3)]">
              Sign In / Sign Up
            </RouterLink>
            <RouterLink to="/" class="bg-transparent border border-neutral-700 hover:border-neutral-500 text-white font-bold uppercase tracking-widest py-3 px-10 rounded transition-colors brand-font">
              Return Home
            </RouterLink>
          </div>
        </div>

        <!-- AUTHENTICATED STATE (Logged In) -->
        <div v-else>

        <!-- Breadcrumbs -->
        <nav class="text-xs text-neutral-500 mb-8 font-semibold tracking-wider uppercase">
          <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
          <span class="mx-2">&gt;</span>
          <span class="text-rose-500">My Account</span>
        </nav>

        <div class="flex flex-col lg:flex-row gap-10">

          <!-- SIDEBAR NAVIGATION -->
          <aside class="w-full lg:w-72 flex-shrink-0">
            <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 lg:sticky lg:top-28">

              <!-- User Greeting (Dynamically pulled from JSON) -->
              <div class="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-6">
                <div class="w-12 h-12 rounded-full bg-neutral-800 border-2 border-rose-600 flex items-center justify-center text-rose-500 text-xl font-bold shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                  {{ userProfile.initials }}
                </div>
                <div>
                  <p class="text-white font-bold brand-font tracking-wider">{{ userProfile.firstName }} {{ userProfile.lastName }}</p>
                  <p class="text-neutral-500 text-xs uppercase tracking-widest mt-1">{{ userProfile.role }}</p>
                </div>
              </div>

              <!-- Profile Menu -->
              <nav class="flex flex-col space-y-2">
                <button
                  @click="activeTab = 'orders'"
                  :class="activeTab === 'orders' ? 'text-rose-500 border-rose-500 bg-neutral-800/50' : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-700'"
                  class="text-left py-3 px-4 border-l-2 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-3 rounded-r"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  Order History
                </button>
                <button
                  @click="activeTab = 'addresses'"
                  :class="activeTab === 'addresses' ? 'text-rose-500 border-rose-500 bg-neutral-800/50' : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-700'"
                  class="text-left py-3 px-4 border-l-2 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-3 rounded-r"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Addresses
                </button>
                <button
                  @click="activeTab = 'settings'"
                  :class="activeTab === 'settings' ? 'text-rose-500 border-rose-500 bg-neutral-800/50' : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-700'"
                  class="text-left py-3 px-4 border-l-2 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-3 rounded-r"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  Account Settings
                </button>
                <button
                  @click="activeTab = 'accessibility'"
                  :class="activeTab === 'accessibility' ? 'text-rose-500 border-rose-500 bg-neutral-800/50' : 'text-neutral-400 border-transparent hover:text-white hover:border-neutral-700'"
                  class="text-left py-3 px-4 border-l-2 font-bold uppercase tracking-wider text-sm transition-colors flex items-center gap-3 rounded-r"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  Accessibility
                </button>

                <!-- Sign Out -->
                <button @click="handleLogout" class="text-left py-3 px-4 border-l-2 border-transparent text-neutral-500 hover:text-rose-500 transition-colors font-bold uppercase tracking-wider text-sm flex items-center gap-3 mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          <!-- MAIN CONTENT AREA -->
          <div class="flex-grow">

            <!-- 1. ORDERS TAB -->
            <div v-if="activeTab === 'orders'" class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Order History</h2>

              <div v-for="order in userOrders" :key="order.id" class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">

                <!-- Order Header -->
                <div class="flex flex-col md:flex-row justify-between md:items-center mb-6 pb-6 border-b border-neutral-800 gap-4">
                  <div>
                    <p class="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Order Placed</p>
                    <p class="text-white font-bold">{{ order.date }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Total Amount</p>
                    <p class="text-rose-500 font-bold brand-font">${{ order.total.toFixed(2) }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-1">Order #</p>
                    <p class="text-white font-bold">{{ order.id }}</p>
                  </div>
<div class="flex flex-col gap-2">
                    <!-- ONLY shows if the order is NOT delivered -->
                    <RouterLink
                      v-if="order.status !== 'Delivered'"
                      to="/trackorder"
                      class="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded transition-colors text-center"
                    >
                      Track Order
                    </RouterLink>

                    <!-- Shows if the order IS delivered -->
                    <button
                      v-else
                      class="bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 rounded transition-colors text-center"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>

                <!-- Items inside order (Now using images from JSON) -->
                <div class="space-y-4">
                  <div v-for="(item, idx) in order.items" :key="idx" class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-neutral-950 rounded border border-neutral-800 flex items-center justify-center overflow-hidden">
                      <img :src="item.image" :alt="item.name" class="w-full h-full object-cover opacity-90" />
                    </div>
                    <div class="flex-grow">
                      <p class="text-white font-bold text-sm">{{ item.name }}</p>
                      <p class="text-neutral-500 text-xs mt-1">Qty: {{ item.qty }} &bull; ${{ item.price.toFixed(2) }}</p>
                    </div>
                    <div class="text-right">
                      <span :class="order.statusClass" class="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border">
                        {{ order.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. ADDRESSES TAB -->
            <div v-if="activeTab === 'addresses'" class="space-y-6 animate-fade-in">
               <div class="flex justify-between items-center mb-6 pb-2 border-b border-neutral-800">
                  <h2 class="text-2xl font-black text-white uppercase brand-font">Saved Addresses</h2>
                  <button class="text-rose-500 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors bg-rose-600/10 hover:bg-rose-600 hover:text-white px-4 py-2 rounded">
                    + Add New
                  </button>
               </div>

               <!-- Loop through addresses in JSON -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="address in userAddresses" :key="address.id" class="bg-neutral-900 border rounded-lg p-6 relative transition-colors" :class="address.isDefault ? 'border-rose-900/50' : 'border-neutral-800 hover:border-neutral-700'">
                    <span v-if="address.isDefault" class="absolute top-4 right-4 bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">Default</span>
                    <h3 class="text-white font-bold mb-2">{{ address.name }}</h3>
                    <p class="text-neutral-400 text-sm leading-relaxed mb-6">
                      {{ address.street }}<br>
                      {{ address.city }}, {{ address.state }} {{ address.zip }}<br>
                      {{ address.country }}
                    </p>
                    <div class="flex gap-4 border-t border-neutral-800 pt-4">
                      <button class="text-neutral-400 hover:text-white text-sm font-bold uppercase transition-colors">Edit</button>
                      <button class="text-neutral-400 hover:text-rose-500 text-sm font-bold uppercase transition-colors">Remove</button>
                    </div>
                  </div>
               </div>
            </div>

            <!-- 3. SETTINGS TAB -->
            <div v-if="activeTab === 'settings'" class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Account Settings</h2>

              <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-8">
                <form @submit.prevent class="space-y-6 max-w-xl">

                  <!-- v-model binds these inputs directly to the reactive JSON data! -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">First Name</label>
                      <input type="text" v-model="userProfile.firstName" class="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Last Name</label>
                      <input type="text" v-model="userProfile.lastName" class="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" v-model="userProfile.email" class="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                  </div>

                  <div class="pt-4 border-t border-neutral-800 mt-6">
                    <button class="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-wider py-3 px-8 rounded transition-colors brand-font shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <!-- Password Change Block -->
              <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-8 mt-6">
                <h3 class="text-lg font-bold text-white mb-4 uppercase tracking-wider">Change Password</h3>
                <form @submit.prevent class="space-y-6 max-w-xl">
                  <div>
                    <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" placeholder="••••••••" class="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" placeholder="Enter new password" class="w-full bg-neutral-950 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors">
                  </div>
                  <div class="pt-2">
                    <button class="bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase tracking-wider py-3 px-8 rounded transition-colors brand-font">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
<div v-if="activeTab === 'accessibility'" class="space-y-6 animate-fade-in">
              <h2 class="text-2xl font-black text-white uppercase brand-font mb-6 pb-2 border-b border-neutral-800">Accessibility Preferences</h2>

              <div class="bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-8">
                <p class="text-neutral-400 text-sm mb-8 leading-relaxed max-w-2xl">
                  Customize your browsing experience. These settings affect how the Gotham Garage interface looks and sounds across both desktop and mobile devices.
                </p>

                <div class="space-y-8 max-w-xl">

                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h4 class="text-white font-bold tracking-wide">Color Blindness Filter</h4>
                      <p class="text-neutral-500 text-xs mt-1">Adjusts the red and green hues across the website to ensure high contrast for Protanopia and Deuteranopia.</p>
                    </div>
                    <button
                      @click="a11yStore.toggleSetting('colorBlind')"
                      class="relative w-12 h-6 rounded-full transition-colors flex-shrink-0 border"
                      :class="a11yStore.colorBlind ? 'bg-rose-600 border-rose-500' : 'bg-neutral-800 border-neutral-700'"
                    >
                      <span class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform" :class="a11yStore.colorBlind ? 'translate-x-6' : 'translate-x-0'"></span>
                    </button>
                  </div>

                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h4 class="text-white font-bold tracking-wide">Touch-to-Speak Reader</h4>
                      <p class="text-neutral-500 text-xs mt-1">When enabled, tapping or hovering over text elements will read the content aloud. Recommended for low-vision users.</p>
                    </div>
                    <button
                      @click="a11yStore.toggleSetting('screenReader')"
                      class="relative w-12 h-6 rounded-full transition-colors flex-shrink-0 border"
                      :class="a11yStore.screenReader ? 'bg-rose-600 border-rose-500' : 'bg-neutral-800 border-neutral-700'"
                    >
                      <span class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform" :class="a11yStore.screenReader ? 'translate-x-6' : 'translate-x-0'"></span>
                    </button>
                  </div>

                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h4 class="text-white font-bold tracking-wide">Reduce Motion</h4>
                      <p class="text-neutral-500 text-xs mt-1">Disables heavy animations, parallax effects, and sliding menus to prevent motion sickness and distraction.</p>
                    </div>
                    <button
                      @click="a11yStore.toggleSetting('reducedMotion')"
                      class="relative w-12 h-6 rounded-full transition-colors flex-shrink-0 border"
                      :class="a11yStore.reducedMotion ? 'bg-rose-600 border-rose-500' : 'bg-neutral-800 border-neutral-700'"
                    >
                      <span class="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform" :class="a11yStore.reducedMotion ? 'translate-x-6' : 'translate-x-0'"></span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          </div>
        </div>


      </div>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import userData from '../data/user.json';
import { useAuthStore } from '../stores/auth';
import { useA11yStore } from '../stores/a11y'; // <-- Add the new store!

const authStore = useAuthStore();
const a11yStore = useA11yStore(); // <-- Initialize the store!
const router = useRouter();

const activeTab = ref('orders');

const userProfile = ref(userData.profile);
const userAddresses = ref(userData.addresses);
const userOrders = ref(userData.orders);

// --- ADD THIS LOGOUT FUNCTION ---
const handleLogout = () => {
  authStore.logout(); // Wipes local storage and pinia state
  router.push('/'); // Sends you back to the home page
};

// NOTICE: All the a11ySettings, speechSynth, and handleTouchToSpeak logic
// has been completely removed from here! It now lives globally in App.vue and a11y.js.
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.app-wrapper {
  font-family: 'Inter', sans-serif;
  background-color: #0a0a0a;
  color: #f3f4f6;
}

h1, h2, h3, h4, .brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Subtle fade-in animation when switching tabs */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>

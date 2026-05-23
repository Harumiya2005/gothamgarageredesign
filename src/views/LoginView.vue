<template>
  <div class="min-h-screen bg-neutral-950 flex font-sans text-neutral-200">
    <!-- LEFT SIDE: Hero Image (Hidden on smaller screens) -->
    <div class="hidden lg:flex w-1/2 bg-neutral-900 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-neutral-950/80 to-transparent z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        alt="Gotham Garage Shop"
        class="w-full h-full object-cover grayscale opacity-50"
      />
      <div class="absolute bottom-20 left-20 z-20 max-w-lg">
        <h1 class="text-5xl font-black text-white uppercase brand-font mb-4 leading-tight">
          Join The <span class="text-rose-600">Crew</span>
        </h1>
        <p class="text-neutral-300 text-lg">
          Create an account to track your orders, save your favorite gear, and checkout faster than
          a pit stop.
        </p>
      </div>
    </div>

    <!-- RIGHT SIDE: Auth Forms -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
      <!-- Back to Home Link -->
      <RouterLink
        to="/"
        class="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2"
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
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Shop
      </RouterLink>

      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-10 text-center">
          <RouterLink to="/" class="text-3xl font-black brand-font text-white tracking-wider">
            GOTHAM<span class="text-rose-600">GARAGE</span>
          </RouterLink>
        </div>

        <!-- ========================================== -->
        <!-- LOGIN FORM -->
        <!-- ========================================== -->
        <transition name="fade" mode="out-in">
          <div v-if="isLoginView" key="login">
            <h2 class="text-3xl font-black text-white uppercase brand-font mb-2">Welcome Back</h2>
            <p class="text-neutral-400 text-sm mb-6">Sign in to access your garage profile.</p>

            <!-- Error Message for Invalid Login -->
            <div
              v-if="loginError"
              class="mb-6 bg-rose-900/20 border border-rose-500/50 text-rose-500 px-4 py-3 rounded text-sm font-bold"
            >
              {{ loginError }}
            </div>

            <!-- @submit.prevent stops the page from reloading and runs our validation function -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <div>
                <label
                  class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2"
                  >Email Address</label
                >
                <!-- Added v-model -->
                <input
                  type="email"
                  v-model="loginEmail"
                  required
                  placeholder="gearhead@example.com"
                  class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                />
              </div>
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-xs font-bold text-neutral-400 uppercase tracking-wider"
                    >Password</label
                  >
                  <a href="#" class="text-xs text-rose-500 hover:text-rose-400 font-bold"
                    >Forgot Password?</a
                  >
                </div>
                <!-- Added v-model -->
                <input
                  type="password"
                  v-model="loginPassword"
                  required
                  placeholder="••••••••"
                  class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                />
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 rounded transition-colors brand-font shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p class="mt-8 text-center text-sm text-neutral-400">
              Don't have an account?
              <button
                @click="toggleView"
                class="text-rose-500 hover:text-white font-bold transition-colors ml-1"
              >
                Sign Up
              </button>
            </p>
          </div>

          <!-- ========================================== -->
          <!-- SIGN UP FORM -->
          <!-- ========================================== -->
          <div v-else key="signup">
            <h2 class="text-3xl font-black text-white uppercase brand-font mb-2">Create Account</h2>
            <p class="text-neutral-400 text-sm mb-8">
              Join the crew to track orders and save favorites.
            </p>

            <form @submit.prevent="handleSignUp" class="space-y-5">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label
                    class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2"
                    >First Name</label
                  >
                  <input
                    type="text"
                    required
                    placeholder="Mark"
                    class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                  />
                </div>
                <div>
                  <label
                    class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    required
                    placeholder="Towle"
                    class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2"
                  >Email Address</label
                >
                <input
                  type="email"
                  required
                  placeholder="mark@gothamgarage.com"
                  class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                />
              </div>

              <div>
                <label
                  class="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2"
                  >Password</label
                >
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  class="w-full bg-neutral-900 border border-neutral-700 text-white text-sm rounded px-4 py-3 focus:outline-none focus:border-rose-600 transition-colors"
                />
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  class="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-bold uppercase tracking-widest py-4 rounded transition-colors brand-font"
                >
                  Create Profile
                </button>
              </div>
            </form>

            <!-- Notification Toast for successful signup -->
            <div
              v-if="showSuccessMsg"
              class="mt-4 bg-green-900/30 border border-green-500/50 text-green-400 p-3 rounded text-sm text-center font-bold"
            >
              Account created! Please log in.
            </div>

            <p class="mt-8 text-center text-sm text-neutral-400">
              Already have an account?
              <button
                @click="toggleView"
                class="text-rose-500 hover:text-white font-bold transition-colors ml-1"
              >
                Sign In
              </button>
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// 1. Initialize the Vue Router
const router = useRouter()

// Auth store
const authStore = useAuthStore()

// 2. Reactive Variables
const isLoginView = ref(true) // Toggles between Login and Sign Up
const showSuccessMsg = ref(false) // Shows a brief message after signing up

// User input variables for login
const loginEmail = ref('')
const loginPassword = ref('')
const loginError = ref('')

// Switch views safely
const toggleView = () => {
  isLoginView.value = !isLoginView.value
  loginError.value = '' // clear any errors when switching views
}

// 3. Validation Logic
const handleLogin = () => {
  // Clear any previous errors
  loginError.value = ''

  // Use the auth store to perform login (persists to localStorage)
  const ok = authStore.login(loginEmail.value, loginPassword.value)
  if (ok) {
    router.push('/')
  } else {
    loginError.value = 'Invalid email or password. Please try again.'
  }
}

const handleSignUp = () => {
  // Shows a success message
  showSuccessMsg.value = true

  // Wait 1.5 seconds, then switch the view back to Login mode
  setTimeout(() => {
    isLoginView.value = true
    showSuccessMsg.value = false
  }, 1500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Smooth fade transition between Login and Sign up forms */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

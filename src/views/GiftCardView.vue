<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-300 py-12 px-4 sm:px-6 lg:px-8 relative">

    <ToastNotification
  :show="showToast"
  variant="sent"
  color="green"
  :itemName="toastMessage"
  @close="showToast = false"
/>

    <div class="max-w-7xl mx-auto">
      <nav class="text-sm font-semibold tracking-wide uppercase text-neutral-500 mb-8 brand-font">
        <RouterLink to="/" class="hover:text-rose-500 transition-colors">Home</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-neutral-300">Gift Cards</span>
      </nav>

      <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

        <div class="mb-10 lg:mb-0">
          <div class="relative w-full aspect-[1.6/1] bg-gradient-to-br from-neutral-800 to-black rounded-2xl border border-neutral-700 shadow-2xl flex flex-col justify-between p-8 overflow-hidden">
            <div class="absolute -right-10 -top-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl"></div>

            <div class="relative z-10">
              <h2 class="text-3xl font-black brand-font text-white tracking-wider">
                GOTHAM<span class="text-rose-600">GARAGE</span>
              </h2>
              <p class="text-neutral-400 font-mono text-sm mt-1 uppercase tracking-widest">Digital Gift Card</p>
            </div>

            <div class="relative z-10 flex justify-between items-end">
              <div class="text-5xl font-black text-white brand-font">
                ${{ selectedAmount }}
              </div>
              <div class="text-neutral-500 font-mono text-xs tracking-widest">
                DELIVERED INSTANTLY
              </div>
            </div>
          </div>

          <div class="mt-6 text-sm text-neutral-400 leading-relaxed">
            <p>Give the gift of choice. Gotham Garage Digital Gift Cards are sent instantly to your recipient's inbox.</p>
            <ul class="list-disc pl-5 mt-3 space-y-1">
              <li>No additional processing fees.</li>
              <li>Never expires.</li>
              <li>Can be used on any merch or gear in the store.</li>
            </ul>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
          <h1 class="text-3xl font-black brand-font text-white mb-2 uppercase tracking-wide">Send a Gift Card</h1>
          <p class="text-2xl text-rose-500 font-bold mb-8">${{ selectedAmount }}.00</p>

          <form @submit.prevent="handleSendGiftCard">
            <div class="mb-8">
              <label class="block text-sm font-bold uppercase tracking-widest text-neutral-400 mb-3 brand-font">Select Amount</label>
              <div class="grid grid-cols-4 gap-3">
                <button
                  v-for="amount in amounts"
                  :key="amount"
                  type="button"
                  @click="selectedAmount = amount"
                  class="py-3 border rounded-lg font-bold transition-all"
                  :class="selectedAmount === amount
                    ? 'bg-rose-600/10 border-rose-600 text-rose-500'
                    : 'border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-800'"
                >
                  ${{ amount }}
                </button>
              </div>
            </div>

            <div class="mb-5">
              <label for="recipientEmail" class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 brand-font">Recipient Email *</label>
              <input
                v-model="form.recipientEmail"
                type="email"
                id="recipientEmail"
                required
                placeholder="Where should we send it?"
                class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors"
              >
            </div>

            <div class="mb-5">
              <label for="senderName" class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 brand-font">Your Name *</label>
              <input
                v-model="form.senderName"
                type="text"
                id="senderName"
                required
                placeholder="Who is it from?"
                class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors"
              >
            </div>

            <div class="mb-8">
              <label for="message" class="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 brand-font">Personal Message (Optional)</label>
              <textarea
                v-model="form.message"
                id="message"
                rows="3"
                placeholder="Add a custom note..."
                class="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rose-600 transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSending"
              class="w-full font-bold tracking-widest uppercase py-4 rounded-lg transition-all flex justify-center items-center gap-3 brand-font disabled:opacity-50 disabled:cursor-not-allowed"
              :class="isSending ? 'bg-neutral-700 text-neutral-400' : 'bg-rose-600 hover:bg-rose-700 text-white'"
            >
              <svg v-if="isSending" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>

              {{ isSending ? 'Sending...' : `Send Now - $${selectedAmount}` }}
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ToastNotification from '../components/ToastNotification.vue'

const amounts = [25, 50, 100, 200]
const selectedAmount = ref(50)
const showToast = ref(false)
const isSending = ref(false)
const toastMessage = ref('') // <--- Bagong lagayan ng frozen message text

const form = reactive({
  recipientEmail: '',
  senderName: '',
  message: ''
})

const handleSendGiftCard = () => {
  // 1. I-set ang button sa loading state
  isSending.value = true

  // 2. Simulate a network request (fake delay of 1.5 seconds)
  setTimeout(() => {
    // Patayin ang loading
    isSending.value = false

    // I-capture at i-lock natin ang text BAGO i-reset ang form!
    toastMessage.value = `$${selectedAmount.value} Gift Card successfully sent to ${form.recipientEmail}`

    // Trigger ang Toast Notification gamit ang na-save na text
    showToast.value = true

    // Ligtas na i-clear ang form dahil naka-save na ang text sa toastMessage
    form.recipientEmail = ''
    form.senderName = ''
    form.message = ''
    selectedAmount.value = 50

    // Itago ang toast pagkatapos ng 4 na segundo
    setTimeout(() => {
      showToast.value = false
    }, 4000)

  }, 1500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

.brand-font {
  font-family: 'Orbitron', sans-serif;
}

/* Toast Slide Animation */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

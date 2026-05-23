<template>
  <div class="mini-cart-wrapper font-sans text-neutral-200">
    <!-- 1. Dark Overlay Background -->
    <transition name="fade">
      <div
        v-if="isOpen"
        @click="$emit('close')"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
      ></div>
    </transition>

    <!-- 2. Sliding Cart Drawer -->
    <transition name="slide-right">
      <div
        v-if="isOpen"
        class="fixed top-0 right-0 h-full w-full sm:w-[400px] md:max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl z-[90] flex flex-col font-['Inter',sans-serif]"
      >
        <!-- Cart Header -->
        <div
          class="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950"
        >
          <h2
            class="text-xl font-black text-white uppercase font-['Orbitron',sans-serif] flex items-center gap-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              class="text-rose-600"
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
            Your Cart
            <span
              class="bg-neutral-800 text-neutral-300 text-xs px-2 py-1 rounded-full font-sans"
              >{{ cartItems.length }}</span
            >
          </h2>
          <button
            @click="$emit('close')"
            class="text-neutral-400 hover:text-rose-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Select / Bulk Actions (REDESIGNED) -->
        <div
          v-if="cartItems.length > 0"
          class="px-6 py-3 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <!-- CUSTOM SELECT ALL BLOCK -->
            <button
              @click="toggleSelectAll"
              class="w-5 h-5 rounded flex items-center justify-center transition-all duration-200"
              :class="
                allSelected
                  ? 'bg-rose-600 border-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)]'
                  : 'bg-neutral-900 border border-neutral-600 hover:border-neutral-400'
              "
            >
              <svg
                v-if="allSelected"
                class="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </button>

            <label
              class="text-xs font-bold text-neutral-400 uppercase tracking-wider cursor-pointer"
              @click="toggleSelectAll"
              >Select all</label
            >

            <button
              @click="promptDeleteSelected"
              :disabled="selectedIds.length === 0"
              class="ml-2 bg-neutral-800 hover:bg-rose-600 disabled:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] px-3 py-1.5 rounded transition-colors font-bold uppercase tracking-wider"
            >
              Delete Selected
            </button>
          </div>

          <!-- CLEANER SELECTED TEXT -->
          <div class="text-xs font-bold tracking-wider uppercase">
            <span :class="selectedIds.length > 0 ? 'text-rose-500' : 'text-neutral-500'">{{
              selectedIds.length
            }}</span>
            <span class="text-neutral-500"> Selected</span>
          </div>
        </div>

        <!-- Cart Items (Scrollable Body) -->
        <div class="flex-grow overflow-y-auto p-6 custom-scrollbar">
          <!-- Empty State -->
          <div
            v-if="cartItems.length === 0"
            class="h-full flex flex-col items-center justify-center text-neutral-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              class="mb-4 opacity-30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="2" x2="12" y2="6"></line>
              <line x1="12" y1="18" x2="12" y2="22"></line>
              <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
              <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
              <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
              <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
            </svg>
            <p class="text-lg font-bold text-white mb-2 font-['Orbitron',sans-serif]">
              Your cart is empty
            </p>
            <p class="text-sm text-center mb-6">Looks like you haven't added any gear yet.</p>
            <button
              @click="$emit('close')"
              class="bg-rose-600 hover:bg-rose-700 transition-colors text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded"
            >
              Start Shopping
            </button>
          </div>

          <!-- Populated State -->
          <div v-else class="space-y-4">
            <div
              v-for="(item, index) in cartItems"
              :key="item.id || index"
              :class="[
                'flex gap-4 p-3 rounded-lg border transition-colors items-center',
                selectedIds.includes(item.id)
                  ? 'bg-neutral-900 border-rose-500/50 shadow-[0_0_10px_rgba(225,29,72,0.1)]'
                  : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700',
              ]"
            >
              <!-- CUSTOM INDIVIDUAL ITEM BLOCK HIGHLIGHT -->
              <button
                @click="toggleSelection(item.id)"
                class="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200"
                :class="
                  selectedIds.includes(item.id)
                    ? 'bg-rose-600 border-rose-600 shadow-[0_0_10px_rgba(225,29,72,0.4)]'
                    : 'bg-neutral-900 border border-neutral-600 hover:border-neutral-400'
                "
              >
                <svg
                  v-if="selectedIds.includes(item.id)"
                  class="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </button>

              <div
                class="w-20 h-20 bg-neutral-900 rounded overflow-hidden flex-shrink-0 border border-neutral-800 cursor-pointer"
                @click="toggleSelection(item.id)"
              >
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              </div>

              <div class="flex-grow flex flex-col justify-between h-full py-1">
                <div>
                  <div class="flex justify-between items-start">
                    <h4
                      class="text-white font-bold text-sm leading-tight pr-2 line-clamp-2 cursor-pointer"
                      @click="toggleSelection(item.id)"
                    >
                      {{ item.name }}
                    </h4>
                    <button
                      @click="promptDeleteSingle(item.id)"
                      class="text-neutral-500 hover:text-rose-500 transition-colors"
                      title="Remove Item"
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                  <p class="text-rose-500 font-bold text-sm mt-1 brand-font">
                    ${{ item.price.toFixed(2) }}
                  </p>
                </div>

                <div class="flex items-center gap-3 mt-2">
                  <div
                    class="flex items-center bg-neutral-900 border border-neutral-700 rounded h-7"
                  >
                    <button
                      @click="decreaseQty(item)"
                      class="w-8 h-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span class="w-8 text-center text-white text-xs font-bold">{{
                      item.quantity
                    }}</span>
                    <button
                      @click="increaseQty(item)"
                      class="w-8 h-full flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
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
        <div v-if="cartItems.length > 0" class="border-t border-neutral-800 p-6 bg-neutral-950">
          <div class="flex justify-between items-center mb-4">
            <span class="text-neutral-400 font-bold uppercase tracking-wider text-sm"
              >Subtotal</span
            >
            <span class="text-2xl font-black text-white font-['Orbitron',sans-serif]"
              >${{ subtotal.toFixed(2) }}</span
            >
          </div>
          <p class="text-xs text-neutral-500 mb-6">Shipping and taxes calculated at checkout.</p>
          <RouterLink
            to="/checkout"
            @click="$emit('close')"
            class="block w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase tracking-widest py-4 rounded transition-colors font-['Orbitron',sans-serif] shadow-[0_0_20px_rgba(225,29,72,0.3)] mb-3"
          >
            Proceed to Checkout
          </RouterLink>
          <button
            @click="$emit('close')"
            class="w-full text-center text-neutral-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider py-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </transition>

    <!-- Confirmation Modal (Kept exactly as you liked it) -->
    <transition name="fade">
      <div v-if="confirmModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center">
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-md"
          @click="confirmModalOpen = false"
        ></div>
        <div
          class="relative z-[110] w-full max-w-sm mx-4 bg-neutral-900 rounded-lg border border-neutral-800 shadow-[0_0_40px_rgba(225,29,72,0.15)] overflow-hidden flex flex-col"
        >
          <div class="p-5 border-b border-neutral-800 bg-neutral-950 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-rose-500"
            >
              <path
                d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
              ></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h3
              class="text-lg font-bold text-white font-['Orbitron',sans-serif] uppercase tracking-wider"
            >
              Confirm Delete
            </h3>
          </div>
          <div class="p-6">
            <p class="text-sm text-neutral-400 mb-4">
              Are you sure you want to remove these items from your cart? This action cannot be
              undone.
            </p>
            <ul class="space-y-2 max-h-32 overflow-y-auto mb-6 pr-2 custom-scrollbar">
              <li
                v-for="item in selectedItems"
                :key="item.id"
                class="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 text-sm flex items-center gap-3 truncate"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-rose-600 flex-shrink-0 shadow-[0_0_5px_rgba(225,29,72,0.8)]"
                ></span>
                <span class="truncate">{{ item.name }}</span>
              </li>
            </ul>
            <div class="flex gap-3 justify-end">
              <button
                @click="confirmModalOpen = false"
                class="px-5 py-2.5 rounded border border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                @click="confirmDelete"
                class="px-5 py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)] transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Delete Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({ isOpen: Boolean })

import { useCartStore } from '../stores/cart'
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const selectedIds = ref([])
const confirmModalOpen = ref(false)

const selectedItems = computed(() =>
  cartItems.value.filter((i) => selectedIds.value.includes(i.id)),
)
const allSelected = computed(
  () =>
    cartItems.value.length > 0 && cartItems.value.every((i) => selectedIds.value.includes(i.id)),
)

const increaseQty = (item) => cartStore.increaseQty(item)
const decreaseQty = (item) => cartStore.decreaseQty(item)
const subtotal = computed(() => cartStore.subtotal)

function toggleSelection(id) {
  const idx = selectedIds.value.indexOf(id)
  if (idx === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(idx, 1)
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = cartItems.value.map((i) => i.id)
  }
}

function promptDeleteSelected() {
  if (selectedIds.value.length === 0) return
  confirmModalOpen.value = true
}

function promptDeleteSingle(id) {
  if (!id) return
  selectedIds.value = [id]
  confirmModalOpen.value = true
}

function confirmDelete() {
  cartStore.removeItemsByIds([...selectedIds.value])
  selectedIds.value = []
  confirmModalOpen.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap');

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

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #e11d48;
}
</style>

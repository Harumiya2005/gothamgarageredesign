import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  // 1. STATE: This is the actual data (the memory)
  state: () => ({
    items: [], // Starts as an empty array!
  }),

  // 2. GETTERS: These calculate things automatically based on the state
  getters: {
    // Counts how many total items are in the cart for the red header bubble
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    // Calculates the total price for the bottom of the cart drawer
    subtotal: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },
  },

  // 3. ACTIONS: These are the functions that modify the state
  actions: {
    addToCart(product) {
      // Check if the item is already in the cart
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1 // If yes, just add 1 to quantity
      } else {
        this.items.push({ ...product, quantity: 1 }) // If no, add the whole product
      }
    },

    removeFromCart(index) {
      this.items.splice(index, 1)
    },

    // Remove multiple items by their ids (used for bulk delete from CartComponent)
    removeItemsByIds(ids) {
      if (!Array.isArray(ids) || ids.length === 0) return
      this.items = this.items.filter((item) => !ids.includes(item.id))
    },

    increaseQty(item) {
      item.quantity++
    },

    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--
      }
    },
  },
})

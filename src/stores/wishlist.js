import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) => state.items.length,
  },

  actions: {
    addToWishlist(product) {
      if (!product || !product.id) return
      const exists = this.items.find((i) => i.id === product.id)
      if (!exists) this.items.push(product)
    },

    removeFromWishlist(id) {
      if (!id) return
      this.items = this.items.filter((i) => i.id !== id)
    },
  },
})

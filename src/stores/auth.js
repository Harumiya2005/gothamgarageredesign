import { defineStore } from 'pinia'
import userData from '../data/user.json'

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Check the browser's memory FIRST! If it says true, stay logged in.
    isAuthenticated: isBrowser ? localStorage.getItem('isLoggedIn') === 'true' : false,

    // Load the user data if they are logged in
    user: isBrowser && localStorage.getItem('isLoggedIn') === 'true' ? userData.profile : null,
  }),
  actions: {
    login(email, password) {
      if (email === userData.profile.email && password === userData.profile.password) {
        this.isAuthenticated = true
        this.user = userData.profile

        // SAVE IT TO THE BROWSER'S MEMORY (only when available)
        if (isBrowser) localStorage.setItem('isLoggedIn', 'true')

        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      this.user = null

      // WIPE IT FROM THE BROWSER'S MEMORY (only when available)
      if (isBrowser) localStorage.removeItem('isLoggedIn')
    },
  },
})

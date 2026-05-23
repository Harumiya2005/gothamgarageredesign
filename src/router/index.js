import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/merch',
      name: 'merch',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MerchView.vue'),
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/VideoView.vue'),
    },
    {
      path: '/helpcenter&FAQ',
      name: 'helpcenter&FAQ',
      component: () => import('../views/HelpCenter&FAQView.vue'),
    },
    {
      path: '/return&refund',
      name: 'return&refund',
      component: () => import('../views/Return&RefundPolicyShippingPrivacyPolicyView.vue'),
    },
    {
      path: '/trackorder',
      name: 'trackorder',
      component: () => import('../views/TrackOrderView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/gift-cards',
      name: 'gift-cards',
      component: () => import('../views/GiftCardView.vue')
    }
  ],
})

export default router

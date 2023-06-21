import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shoppinglist',
      component: () => import('../views/ShoppingListView.vue')
    },
    {
      path: '/manage',
      name: 'manage shoppinglist',
      component: () => import('../views/BackOfficeView.vue')
    },
    {
      path: '/login',
      name: 'autorisation',
      component: () => import('../views/AutorisationView.vue')
    }
  ]
})

export default router

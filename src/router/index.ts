import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const isAuthenticated = ref(localStorage.getItem('klontong-token'))
  if (!isAuthenticated.value && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router

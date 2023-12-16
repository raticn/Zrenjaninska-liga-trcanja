import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Liga from '../views/Liga.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/liga',
      name: 'liga',
      component: Liga
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
  ]
})

export default router

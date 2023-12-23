import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Liga from '../views/Liga.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Rekordi from '../views/Rekordi.vue'
import Onama from '../views/Onama.vue'
import Kontakt from '../views/Kontakt.vue'
import PolitikaPrivatnosti from '../views/PolitikaPrivatnosti.vue'

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
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/rekordi',
      name: 'rekordi',
      component: Rekordi
    },
    {
      path: '/onama',
      name: 'onama',
      component: Onama
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: Kontakt
    },
    {
      path: '/politikaPrivatnosti',
      name: 'politikaPrivatnosti',
      component: PolitikaPrivatnosti
    },
  ]
})

export default router

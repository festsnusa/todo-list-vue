import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    name: "home",
    path: "/",
    component: HomeView
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   redirect: { name: 'home' },
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

export default router

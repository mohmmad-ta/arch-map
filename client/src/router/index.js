import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("token");
//   if (to.name === 'admin' && token === null) next({ name: 'login' })
//   next()
// })

export default router

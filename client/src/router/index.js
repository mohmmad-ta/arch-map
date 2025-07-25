import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import CompletedProjects from '../views/CompletedProjects.vue'
import PlannedProjects from '../views/PlannedProjects.vue'
import UnfinishedProjects from '../views/UnfinishedProjects.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },{
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },{
      path: '/CompletedProjects',
      name: 'CompletedProjects',
      component: CompletedProjects,
    },{
      path: '/PlannedProjects',
      name: 'PlannedProjects',
      component: PlannedProjects,
    },{
      path: '/UnfinishedProjects',
      name: 'UnfinishedProjects',
      component: UnfinishedProjects,
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("token");
//   if (to.name === 'admin' && token === null) next({ name: 'login' })
//   next()
// })

export default router

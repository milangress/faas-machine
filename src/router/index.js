import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Generator from '@/views/Generator'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Generator,
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/gen/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU/BA%20FaaS%20Maschine' }
      // return { path: '/gen', params: { gid: '1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU', sheet: 'BA%20FaaS%20Maschine' } }
    }
    // alias: '/gen/1MuXLBM_WGHm9vS_jhAtDVKHGDK9FJ171fpkqwBXJIKU/BA%20FaaS%20Maschine'
  },
  {
    path: '/overview',
    name: 'HomeOverview',
    component: Home
  },
  {
    path: '/gen/:gid/:sheet',
    name: 'GeneratorID',
    component: Generator
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

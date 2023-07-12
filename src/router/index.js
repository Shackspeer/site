import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props:true
  },
  {
    path: '/wb1',
    name: "website1",
    component: ()=> import("../views/website1.vue")
  },
  {
    path: '/wb2',
    name: "website2",
    component: ()=> import("../views/deneme.vue")
  },
  {
    path: '/wb1',
    name: "website1",
    component: ()=> import('../views/website2.vue')
  },
  {
    path: '/registry',
    name: 'registry',
    component: ()=> import('../views/registry.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: ()=> import('../views/profile.vue')
  },
  {
    path : '/cart',
    name : 'shoppingCart',
    component: ()=>import('../views/shoppingCart.vue'),
    props : true
  },
  {
    path : '/counter',
    name : 'counter',
    component : ()=>import('../views/counter.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

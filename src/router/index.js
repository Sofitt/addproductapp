import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '@/views/main'
Vue.use(VueRouter)

const routes = [
  {
path: '/',
    component: main,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

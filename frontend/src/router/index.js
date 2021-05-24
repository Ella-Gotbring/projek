import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue'
import Flow from '../views/Flow.vue'
import Signup from '../views/Signup.vue'
import Signin from '../views/Signin.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/flow',
    name: 'Flow',
    component: Flow
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/settings',
    name: 'Settnigs',
    component: Settings
  },

]

const router = new VueRouter({
  routes
})

export default router

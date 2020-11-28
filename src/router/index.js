import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main/index.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import toeicexamroute from '@/router/toeicexam.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/toeicexam',
    name: 'TOEICExam',
    component: () => import('@/views/TOEICExam'),
    // beforeEnter: (to, from, next) => {
    //   if
    // }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/TOEICExam/Result.vue')
  },
  toeicexamroute
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path, from.path);
  if (to.path == '/toeicexam'){
    localStorage.clear();
    next();
  }
  else {
    next();
  }
})

export default router

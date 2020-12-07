import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main/index.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import toeicexamroute from '@/router/toeicexam.js';
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/TOEICPreparation',
        name: 'TOEICPreparation',
        component: () => import('../views/TOEICPreparation/index.vue')
      },
      {
        path: '/directory',
        name: 'Directory',
        component: () => import('../views/Directory/index.vue')
      },
      {
        path: '/examtip',
        name: 'ExamTip',
        component: () => import('../views/ExamTip/index.vue')
      }
    ]
  },

  {
    path: '/toeicexam',
    name: 'TOEICExam',
    component: () => import('@/views/TOEICExam'),
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
  if (to.path == '/toeicexam') {
    store.commit("toeicexam/clearAllData");
    // var token = null;
    // if (localStorage.getItem('token'))
    //   token = localStorage.getItem('token');
    localStorage.clear();
    // if (token)
    //   localStorage.setItem('token', token);  
    next();
  }
  else {
    next();
  }
})

export default router

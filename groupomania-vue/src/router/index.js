import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Community from '../views/Community.vue'
import Profile from '../views/Profile.vue'
import VueRouteMiddleware from 'vue-route-middleware';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/',
    name: 'Home',
    meta: {
      middleware: (to, from, next) => {
        let token = sessionStorage.getItem('user-token');
        if(!token){
          next({ name: 'Login' });
        }else{
          next({ name: 'Community' });
        }
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/community',
    name: 'Community',
    component: Community,
    meta: {
      middleware: (to, from, next) => {
        let token = sessionStorage.getItem('user-token');
        if(!token){
          next({ name: 'Login' });
        }
      }
    }
  },{
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      middleware: (to, from, next) => {
        let token = sessionStorage.getItem('user-token');
        if(!token){
          next({ name: 'Login' });
        }
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(VueRouteMiddleware());

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Community from '../views/Community.vue'
import VueRouteMiddleware from 'vue-route-middleware';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }/*,{
    path: '/',
    name: 'Home',
    meta: {
      middleware: (to, from, next) => {
        
        if(!sessionStorage.getItem('user-token')){
          next({ name: 'Login' });
        }else{
          next({ name: 'Community' });
        }
      }
    }
  }*/,
  {
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/community',
    alias: '/',
    name: 'Community',
    component: Community,
    meta: {
      isAuthenticated: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(VueRouteMiddleware());

router.beforeEach((to, from, next) => {
  if(to.meta.isAuthenticated && !sessionStorage.getItem('user-token')){
    next({ name: 'Login'})
  }else{
    next()
  }
})



export default router

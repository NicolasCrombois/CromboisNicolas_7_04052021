import { createApp } from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';



import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Contact from './components/Contact.vue';

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Home },
      { path: '/register', component: Register },
      { path: '/contact', component: Contact }
    ]
  });

createApp(App).use(router).mount('#app')

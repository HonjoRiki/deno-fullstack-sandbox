import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Calc from '../views/Calc.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/calc', component: Calc },
  ],
});

export default router;


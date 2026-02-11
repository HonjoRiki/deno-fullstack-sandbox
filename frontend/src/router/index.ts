import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Calc from '../views/Calc.vue';
import Novel from '../views/Novel.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/calc', component: Calc },
    { path: '/novel', component: Novel },
  ],
});

export default router;


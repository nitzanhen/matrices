import { createRouter, createWebHistory } from 'vue-router';

import WelcomePage from './pages/WelcomePage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: WelcomePage },
  ]
});


import { createRouter, createWebHistory } from 'vue-router';

import WelcomePage from './pages/WelcomePage.vue';
import MatrixAdditionPage from './pages/MatrixAdditionPage.vue';
import MatrixMultiplicationPage from './pages/MatrixMultiplicationPage.vue';
import MatrixTransposePage from './pages/MatrixTransposePage.vue';
import MatrixDeterminantPage from './pages/MatrixDeterminantPage.vue';
import DotProductPage from './pages/DotProductPage.vue';
import CrossProductPage from './pages/CrossProductPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: WelcomePage },
    { path: '/matrix/sum', component: MatrixAdditionPage },
    { path: '/matrix/product', component: MatrixMultiplicationPage },
    { path: '/matrix/transpose', component: MatrixTransposePage },
    { path: '/matrix/determinant', component: MatrixDeterminantPage },
    { path: '/vector/dot', component: DotProductPage },
    { path: '/vector/cross', component: CrossProductPage }
  ]
});

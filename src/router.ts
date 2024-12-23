import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
import Home from '@/views/Home.vue';

export const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Region',
    path: '/:region',
    component: () => import('@/views/Region.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import ContactView from '../views/ContactView.vue';
import ToolsView from '../views/ToolsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: ScheduleView,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView,
  },
  {
    path: '/tools',
    name: 'Tools',
    component: ToolsView,
  },
  // Redirect any other path to the home page
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
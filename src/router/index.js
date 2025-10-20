import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppView from '../views/AppView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import ContactView from '../views/ContactView.vue';
import ToolsView from '../views/ToolsView.vue';
// Import the new lesson flow components
import LessonView from '../views/lessons/LessonView.vue';
import QuizView from '../views/lessons/QuizView.vue';
import PaywallView from '../views/lessons/PaywallView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/app', name: 'App', component: AppView },
  { path: '/schedule', name: 'Schedule', component: ScheduleView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/tools', name: 'Tools', component: ToolsView },
  
  // New routes for the freemium lesson flow
  { 
    path: '/app/lesson/:id', 
    name: 'Lesson', 
    component: LessonView,
    props: true // This allows the ':id' to be passed as a prop to the component
  },
  { 
    path: '/app/quiz/1', 
    name: 'Quiz', 
    component: QuizView 
  },
  { 
    path: '/app/paywall', 
    name: 'Paywall', 
    component: PaywallView 
  },

  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


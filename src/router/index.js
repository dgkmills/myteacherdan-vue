import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppView from '../views/AppView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import ContactView from '../views/ContactView.vue';
import ToolsView from '../views/ToolsView.vue';
import LessonView from '../views/lessons/LessonView.vue';
import QuizView from '../views/lessons/QuizView.vue';
import PaywallView from '../views/lessons/PaywallView.vue';
// THE FIX: Import the new Quiz2View component
import Quiz2View from '../views/lessons/Quiz2View.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/app', name: 'App', component: AppView },
  { path: '/schedule', name: 'Schedule', component: ScheduleView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/tools', name: 'Tools', component: ToolsView },
  
  { 
    path: '/app/lesson/:id', 
    name: 'Lesson', 
    component: LessonView,
    props: true 
  },
  { 
    path: '/app/quiz/1', 
    name: 'Quiz', 
    component: QuizView 
  },
  // THE FIX: Add the new route for the second quiz
  { 
    path: '/app/quiz/2', 
    name: 'Quiz2', 
    component: Quiz2View 
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


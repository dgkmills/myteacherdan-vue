import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppView from '../views/AppView.vue';
import ScheduleView from '../views/ScheduleView.vue';
import ContactView from '../views/ContactView.vue';
import ToolsView from '../views/ToolsView.vue';
import LessonView from '../views/lessons/LessonView.vue';
import QuizView from '../views/lessons/QuizView.vue';
import PaywallView from '../views/lessons/PaywallView.vue';
import Quiz2View from '../views/lessons/Quiz2View.vue';
import AdminView from '../views/AdminView.vue'; // Import the new AdminView
import TrackerView from '../views/TrackerView.vue'; // Import the new TrackerView

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/app', name: 'App', component: AppView },
  { path: '/schedule', name: 'Schedule', component: ScheduleView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/tools', name: 'Tools', component: ToolsView },
  
  // New Admin and Tracker routes
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/tracker', name: 'Tracker', component: TrackerView },

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
  // Scroll to top on route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;

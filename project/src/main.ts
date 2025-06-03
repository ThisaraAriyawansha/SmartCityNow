import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'

// Import page components for routing
import Home from './pages/Home.vue'
import LocalIssues from './pages/LocalIssues.vue'
import Solutions from './pages/Solutions.vue'
import CommunityEvents from './pages/CommunityEvents.vue'
import Feedback from './pages/Feedback.vue'
import TimeLine from './pages/TimeLine.vue'

// Create router instance with web history and route definitions
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home }, // Home page route
    { path: '/local-issues', component: LocalIssues }, // Local issues page route
    { path: '/solutions', component: Solutions }, // Solutions page route
    { path: '/community-events', component: CommunityEvents }, // Community events page route
    { path: '/feedback', component: Feedback }, // Feedback page route
    { path: '/time-line', component: TimeLine } // Timeline page route
  ],
  scrollBehavior() {
    // Scroll to top on route change
    return { top: 0 }
  }
})

// Initialize Pinia store for state management
const pinia = createPinia()

// Create Vue app instance
const app = createApp(App)
// Register router with the app
app.use(router)
// Register Pinia store with the app
app.use(pinia)
// Mount the app to the DOM element with id 'app'
app.mount('#app')
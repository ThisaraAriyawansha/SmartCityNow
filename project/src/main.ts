import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/styles/main.css'

// Import pages
import Home from './pages/Home.vue'
import LocalIssues from './pages/LocalIssues.vue'
import Solutions from './pages/Solutions.vue'
import CommunityEvents from './pages/CommunityEvents.vue'
import Feedback from './pages/Feedback.vue'
import TimeLine from './pages/TimeLine.vue';


// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/local-issues', component: LocalIssues },
    { path: '/solutions', component: Solutions },
    { path: '/community-events', component: CommunityEvents },
    { path: '/feedback', component: Feedback },
    { path: '/time-line', component: TimeLine }

  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// Create pinia store
const pinia = createPinia()

// Create and mount the app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
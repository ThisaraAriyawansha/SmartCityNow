<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['site-header', { 'is-scrolled': isScrolled }]">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo" @click="closeMenu">
          <span class="logo-text">SmartCityNow</span>
        </router-link>
        
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        
        <nav :class="['main-nav', { 'is-open': isMenuOpen }]">
          <ul class="nav-list">
            <li>
              <router-link to="/" @click="closeMenu" :class="{ active: route.path === '/' }">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/local-issues" @click="closeMenu" :class="{ active: route.path === '/local-issues' }">
                Local Issues
              </router-link>
            </li>
            <li>
              <router-link to="/solutions" @click="closeMenu" :class="{ active: route.path === '/solutions' }">
                Solutions
              </router-link>
            </li>
            <li>
              <router-link to="/community-events" @click="closeMenu" :class="{ active: route.path === '/community-events' }">
                Community Events
              </router-link>
            </li>
            <li>
              <router-link to="/time-line" @click="closeMenu" :class="{ active: route.path === '/time-line' }">
                Time Line
              </router-link>
            </li>
            <li>
              <router-link to="/feedback" @click="closeMenu" class="btn-nav" :class="{ active: route.path === '/feedback' }">
                Feedback
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  z-index: 100;
  background-color: transparent;
  transition: all 0.3s ease;
}

.site-header.is-scrolled {
  background-color: white;
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-primary-600);
  z-index: 20;
}

.logo-text {
  background: linear-gradient(90deg, var(--color-primary-500), var(--color-accent-500));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
}

.bar {
  height: 2px;
  width: 100%;
  background-color: var(--color-neutral-800);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.main-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  transition: right 0.3s ease;
  box-shadow: var(--shadow-lg);
  padding-top: 80px;
  z-index: 10;
}

.main-nav.is-open {
  right: 0;
}

@media (min-width: 768px) {
  .main-nav {
    position: relative;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    background-color: transparent;
    box-shadow: none;
    padding-top: 0;
    max-width: none;
  }
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .nav-list {
    flex-direction: row;
    padding: 0;
    align-items: center;
  }
}

.nav-list a {
  display: block;
  font-weight: 500;
  color: var(--color-neutral-700);
  transition: color 0.2s ease;
  padding: var(--space-2) 0;
}

.nav-list a:hover, 
.nav-list a.active {
  color: var(--color-primary-500);
}

.btn-nav {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-lg);
  color: var(--color-primary-500) !important;
  border: 1px solid var(--color-primary-500);
}

.btn-nav:hover, 
.btn-nav.active {
  background-color: var(--color-primary-500);
  color: white !important;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'

// Reactive state for loading status
const isLoading = ref(true)

// Simulate loading delay on component mount
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})
</script>

<template>
  <!-- Main application container -->
  <div class="app-container">
    <!-- Header component -->
    <TheHeader />
    <!-- Main content area with router view -->
    <main>
      <router-view v-slot="{ Component }">
        <!-- Transition for smooth page changes -->
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <!-- Footer component -->
    <TheFooter />
  </div>
</template>

<style>
/* Transition styles for fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Layout styles for app container */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main content styling */
main {
  flex-grow: 1;
  margin-top: 64px;
}
</style>
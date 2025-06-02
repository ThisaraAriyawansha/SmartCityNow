<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.ref = false
  }, 500)
})
</script>

<template>
  <div class="app-container">
    <TheHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  margin-top: 64px;
}
</style>
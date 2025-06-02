<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: string
}>()
</script>

<template>
  <div class="feature-card">
    <div class="feature-icon">{{ icon }}</div>
    <h3 class="feature-title">{{ title }}</h3>
    <p class="feature-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.feature-card {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: var(--space-3);
  color: var(--color-neutral-900);
}

.feature-description {
  color: var(--color-neutral-600);
  margin-bottom: 0;
  flex-grow: 1;
}
</style>
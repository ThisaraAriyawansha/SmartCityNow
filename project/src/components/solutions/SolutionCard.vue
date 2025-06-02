<script setup lang="ts">
defineProps<{
  title: string
  description: string
  benefits: string[]
  imageUrl: string
  icon: string
  anchor: string
}>()
</script>

<template>
  <div class="solution-card" :id="anchor">
    <div class="solution-image" :style="{ backgroundImage: `url(${imageUrl})` }">
      <div class="solution-icon">{{ icon }}</div>
    </div>
    <div class="solution-content">
      <h3 class="solution-title">{{ title }}</h3>
      <p class="solution-description">{{ description }}</p>
      
      <div class="solution-benefits">
        <h4>Key Benefits:</h4>
        <ul class="benefits-list">
          <li v-for="(benefit, index) in benefits" :key="index">{{ benefit }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.solution-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 80px;
}

.solution-image {
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.solution-icon {
  position: absolute;
  bottom: -20px;
  left: var(--space-4);
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: var(--shadow);
}

.solution-content {
  padding: var(--space-6);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.solution-title {
  margin-top: var(--space-2);
  margin-bottom: var(--space-3);
  font-size: 1.25rem;
  color: var(--color-primary-600);
}

.solution-description {
  color: var(--color-neutral-700);
  margin-bottom: var(--space-4);
}

.solution-benefits {
  margin-top: auto;
}

.solution-benefits h4 {
  font-size: 1rem;
  margin-bottom: var(--space-2);
  color: var(--color-neutral-800);
}

.benefits-list {
  list-style: none;
  padding: 0;
}

.benefits-list li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: var(--space-2);
  font-size: 0.9375rem;
  color: var(--color-neutral-600);
}

.benefits-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-secondary-500);
  font-weight: bold;
}
</style>
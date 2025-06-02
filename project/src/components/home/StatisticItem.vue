<script setup lang="ts">
defineProps<{
  value: string
  label: string
  icon: string
}>()
</script>

<template>
  <div class="statistic-item">
    <div class="statistic-icon">{{ icon }}</div>
    <div class="statistic-content">
      <div class="statistic-value">{{ value }}</div>
      <div class="statistic-label">{{ label }}</div>
    </div>
  </div>
</template>

<style scoped>
.statistic-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.statistic-item:hover {
  transform: translateY(-3px);
}

.statistic-icon {
  font-size: 2.5rem;
  color: var(--color-primary-500);
}

.statistic-content {
  flex: 1;
}

.statistic-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary-600);
  line-height: 1.2;
}

.statistic-label {
  color: var(--color-neutral-600);
  font-size: 1rem;
}
</style>
<script setup lang="ts">
defineProps<{
  title: string
  description: string
  impact: string
  icon: string
  imageUrl: string
}>()
</script>

<template>
  <div class="issue-card">
    <div class="issue-image" :style="{ backgroundImage: `url(${imageUrl})` }">
      <div class="issue-icon">{{ icon }}</div>
      <div class="impact-badge" :class="`impact-${impact.toLowerCase()}`">
        {{ impact }} Impact
      </div>
    </div>
    <div class="issue-content">
      <h3 class="issue-title">{{ title }}</h3>
      <p class="issue-description">{{ description }}</p>
      <router-link :to="`/solutions#${title.toLowerCase().replace(/\s+/g, '-')}`" class="issue-link">
        View Solutions
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.issue-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.issue-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.issue-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.issue-icon {
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

.impact-badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

.impact-high {
  background-color: var(--color-error-500);
}

.impact-medium {
  background-color: var(--color-warning-500);
}

.impact-low {
  background-color: var(--color-success-500);
}

.issue-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.issue-title {
  margin-top: var(--space-2);
  margin-bottom: var(--space-3);
  font-size: 1.25rem;
}

.issue-description {
  color: var(--color-neutral-600);
  margin-bottom: var(--space-4);
  flex-grow: 1;
}

.issue-link {
  display: inline-flex;
  align-items: center;
  font-weight: 500;
}

.issue-link:after {
  content: '→';
  margin-left: var(--space-1);
  transition: transform 0.2s ease;
}

.issue-link:hover:after {
  transform: translateX(4px);
}
</style>
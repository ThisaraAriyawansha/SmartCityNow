<script setup lang="ts">
defineProps<{
  quote: string
  author: string
  role: string
}>()
</script>

<template>
  <div class="testimonial-card">
    <div class="testimonial-quote">
      <span class="quote-mark">"</span>
      {{ quote }}
      <span class="quote-mark">"</span>
    </div>
    <div class="testimonial-author">
      <div class="author-avatar"></div>
      <div class="author-info">
        <div class="author-name">{{ author }}</div>
        <div class="author-role">{{ role }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.testimonial-card {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.testimonial-quote {
  font-size: 1.125rem;
  color: var(--color-neutral-700);
  margin-bottom: var(--space-6);
  flex-grow: 1;
  position: relative;
  font-style: italic;
}

.quote-mark {
  color: var(--color-primary-300);
  font-size: 1.5rem;
  font-weight: 700;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--color-neutral-200);
  overflow: hidden;
  background-image: url('https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 600;
  color: var(--color-neutral-900);
}

.author-role {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}
</style>
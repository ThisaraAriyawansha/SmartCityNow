<script setup lang="ts">
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['register'])

const registerForEvent = () => {
  emit('register', props.event)
}
</script>

<template>
  <div class="event-card">
    <div class="event-image" :style="{ backgroundImage: `url(${event.image})` }">
      <div class="event-date">{{ event.date }}</div>
    </div>
    <div class="event-content">
      <h3 class="event-title">{{ event.title }}</h3>
      <div class="event-details">
        <div class="event-detail">
          <span class="detail-icon">🕙</span>
          <span>{{ event.time }}</span>
        </div>
        <div class="event-detail">
          <span class="detail-icon">📍</span>
          <span>{{ event.location }}</span>
        </div>
      </div>
      <p class="event-description">{{ event.description }}</p>
      <div class="event-footer">
        <div class="spots-remaining">
          <span class="spots-count">{{ event.remaining }}</span> spots remaining
        </div>
        <button class="btn btn-primary register-btn" @click="registerForEvent">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: white;
  box-shadow: var(--shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.event-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.event-date {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
}

.event-content {
  padding: var(--space-6);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.event-title {
  margin-bottom: var(--space-3);
  font-size: 1.25rem;
  color: var(--color-neutral-900);
}

.event-details {
  margin-bottom: var(--space-4);
}

.event-detail {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-2);
  font-size: 0.9375rem;
  color: var(--color-neutral-600);
}

.detail-icon {
  margin-right: var(--space-2);
}

.event-description {
  color: var(--color-neutral-700);
  margin-bottom: var(--space-6);
  flex-grow: 1;
  font-size: 0.9375rem;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.spots-remaining {
  font-size: 0.875rem;
  color: var(--color-neutral-600);
}

.spots-count {
  font-weight: 600;
  color: var(--color-accent-600);
}

.register-btn {
  padding: 0.4rem 1rem;
}
</style>
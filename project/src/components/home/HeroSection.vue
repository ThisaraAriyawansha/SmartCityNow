<script setup lang="ts">
</script>

<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Shaping Smart Cities <br> For a Better Tomorrow</h1>
      <p class="hero-subtitle">
        Building sustainable, efficient, and livable urban environments through 
        innovation, technology, and community engagement.
      </p>
      <div class="hero-buttons">
        <router-link to="/local-issues" class="btn btn-primary">Explore Issues</router-link>
        <router-link to="/solutions" class="btn btn-outline">Discover Solutions</router-link>
      </div>
    </div>
    <div class="hero-overlay"></div>
  </section>
</template>

<style scoped>
.hero-section {
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-4);
  background-image: url('https://images.pexels.com/photos/1057840/pexels-photo-1057840.jpeg?auto=compress&cs=tinysrgb&w=1600');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  margin-bottom: var(--space-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-buttons .btn {
  min-width: 160px;
}

.hero-buttons .btn-outline {
  border-color: white;
  color: white;
}

.hero-buttons .btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
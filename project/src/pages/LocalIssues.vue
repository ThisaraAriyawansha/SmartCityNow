<script setup lang="ts">
import IssueCard from '../components/local-issues/IssueCard.vue'

const localIssues = [
  {
    id: 1,
    title: 'Traffic Congestion',
    description: 'Rush hour gridlock causes delays, increases pollution, and reduces productivity. Major hotspots include downtown intersections and highway access points.',
    impact: 'High',
    icon: '🚗',
    imageUrl: 'https://images.pexels.com/photos/4553166/pexels-photo-4553166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Energy Inefficiency',
    description: 'Outdated building systems and infrastructure lead to excessive energy consumption, higher utility costs, and unnecessary carbon emissions.',
    impact: 'Medium',
    icon: '💡',
    imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Waste Management',
    description: 'Inefficient collection routes, overflowing bins, and low recycling rates contribute to street litter, health hazards, and environmental damage.',
    impact: 'High',
    icon: '🗑️',
    imageUrl: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Limited Green Spaces',
    description: 'Urban development has reduced parks and natural areas, limiting recreational opportunities and contributing to the urban heat island effect.',
    impact: 'Medium',
    icon: '🌳',
    imageUrl: 'https://images.pexels.com/photos/417222/pexels-photo-417222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    title: 'Water Management',
    description: 'Aging infrastructure leads to water loss through leaks, while inefficient usage patterns strain supply during peak demand periods.',
    impact: 'Medium',
    icon: '💧',
    imageUrl: 'https://images.pexels.com/photos/6683406/pexels-photo-6683406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    title: 'Public Transportation Gaps',
    description: 'Inadequate coverage and frequency in public transit systems forces car dependency and isolates underserved neighborhoods.',
    impact: 'High',
    icon: '🚌',
    imageUrl: 'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]
</script>

<template>
  <div class="local-issues-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Local Urban Challenges</h1>
        <p class="page-description">
          Understanding the key issues affecting our city is the first step toward creating smarter, 
          more sustainable urban environments. Explore the challenges we face and learn how smart 
          city initiatives can address them.
        </p>
      </div>
    </section>
    
    <!-- Issues Grid -->
    <section class="section issues-section">
      <div class="container">
        <div class="issues-grid">
          <IssueCard 
            v-for="issue in localIssues"
            :key="issue.id"
            :title="issue.title"
            :description="issue.description"
            :impact="issue.impact"
            :icon="issue.icon"
            :imageUrl="issue.imageUrl"
          />
        </div>
      </div>
    </section>
    
    <!-- Traffic Heatmap -->
    <section class="section heatmap-section">
      <div class="container">
        <div class="section-header">
          <h2>Traffic Congestion Heatmap</h2>
          <p>
            This interactive visualization shows real-time traffic congestion across the city, 
            highlighting areas that would benefit from smart traffic management systems.
          </p>
        </div>
        
        <div class="heatmap-container">
          <div class="heatmap-placeholder">
            <div class="map-overlay">
              <div class="map-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #10b981;"></span>
                  <span class="legend-label">Low Congestion</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #f59e0b;"></span>
                  <span class="legend-label">Moderate Congestion</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background-color: #ef4444;"></span>
                  <span class="legend-label">High Congestion</span>
                </div>
              </div>
            </div>
          </div>
          <p class="heatmap-note">
            Note: This heatmap shows typical congestion patterns based on historical data. 
            In a fully implemented system, this would display real-time traffic data from sensors and cameras.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Community Input -->
    <section class="section community-input-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>Share Your Local Challenges</h2>
          <p>
            We want to hear from you! What urban issues do you encounter in your neighborhood? 
            Your input helps us better understand local challenges and develop targeted solutions.
          </p>
        </div>
        
        <div class="cta-card">
          <div class="cta-content">
            <h3>Have insights about urban challenges in your area?</h3>
            <p>
              Your perspective matters. Help us build a more comprehensive understanding of our city's
              needs by sharing your experiences and observations.
            </p>
          </div>
          <router-link to="/feedback" class="btn btn-primary">
            Share Your Feedback
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  background-color: var(--color-primary-600);
  color: white;
  padding: var(--space-16) 0 var(--space-10);
  text-align: center;
}

.page-header h1 {
  margin-bottom: var(--space-4);
  color: white;
}

.page-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
}

.issues-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .issues-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .issues-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.section-header {
  margin-bottom: var(--space-8);
}

.section-header h2 {
  margin-bottom: var(--space-3);
}

.heatmap-section {
  background-color: var(--color-neutral-100);
}

.heatmap-container {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.heatmap-placeholder {
  height: 400px;
  background-image: url('https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-position: center;
  position: relative;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--space-4);
}

.map-legend {
  background-color: white;
  padding: var(--space-4);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-2);
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  margin-right: var(--space-2);
}

.legend-label {
  font-size: 0.875rem;
  color: var(--color-neutral-700);
}

.heatmap-note {
  margin-top: var(--space-3);
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  font-style: italic;
}

.community-input-section {
  background-color: var(--color-primary-50);
}

.cta-card {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    gap: var(--space-8);
  }
}

.cta-content {
  margin-bottom: var(--space-6);
}

@media (min-width: 768px) {
  .cta-content {
    margin-bottom: 0;
  }
}

.cta-content h3 {
  margin-bottom: var(--space-3);
}

.cta-content p {
  margin-bottom: 0;
  color: var(--color-neutral-600);
}
</style>
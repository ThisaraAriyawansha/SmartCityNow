<script setup lang="ts">
import SolutionCard from '../components/solutions/SolutionCard.vue'
import EnergyCalculator from '../components/solutions/EnergyCalculator.vue'

const solutions = [
  {
    id: 1,
    title: 'Smart Traffic Management',
    description: 'AI-powered traffic lights that adapt to real-time conditions, reducing congestion by up to 25%. Uses sensors and cameras to monitor traffic flow and optimize signal timing.',
    benefits: ['Reduced commute times', 'Lower emissions', 'Decreased fuel consumption', 'Emergency vehicle prioritization'],
    imageUrl: 'https://images.pexels.com/photos/14036568/pexels-photo-14036568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '🚦',
    anchor: 'traffic-congestion'
  },
  {
    id: 2,
    title: 'Building Energy Optimization',
    description: 'Smart building systems that monitor and control lighting, heating, and cooling based on occupancy and usage patterns. Can reduce energy consumption by up to 30%.',
    benefits: ['Lower utility costs', 'Reduced carbon footprint', 'Improved comfort', 'Predictive maintenance'],
    imageUrl: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '⚡',
    anchor: 'energy-inefficiency'
  },
  {
    id: 3,
    title: 'IoT Waste Management',
    description: 'Smart waste bins with fill-level sensors that optimize collection routes and schedules. Reduces collection costs while preventing overflow issues.',
    benefits: ['Optimized collection routes', 'Lower operational costs', 'Cleaner streets', 'Reduced emissions from collection vehicles'],
    imageUrl: 'https://images.pexels.com/photos/5558242/pexels-photo-5558242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '♻️',
    anchor: 'waste-management'
  },
  {
    id: 4,
    title: 'Urban Green Infrastructure',
    description: 'Integration of green roofs, vertical gardens, and smart irrigation systems to create sustainable urban green spaces that improve air quality and reduce heat islands.',
    benefits: ['Improved air quality', 'Temperature regulation', 'Stormwater management', 'Enhanced urban biodiversity'],
    imageUrl: 'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '🌳',
    anchor: 'limited-green-spaces'
  },
  {
    id: 5,
    title: 'Smart Water Management',
    description: 'IoT-enabled water monitoring systems that detect leaks, optimize pressure, and provide real-time usage data to utilities and consumers.',
    benefits: ['Reduced water waste', 'Early leak detection', 'Consumption insights', 'Improved infrastructure management'],
    imageUrl: 'https://images.pexels.com/photos/3747578/pexels-photo-3747578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '💧',
    anchor: 'water-management'
  },
  {
    id: 6,
    title: 'Integrated Mobility Platform',
    description: 'Multi-modal transportation app that integrates public transit, bike sharing, ride-hailing, and electric scooters for seamless urban mobility.',
    benefits: ['Simplified trip planning', 'Reduced car dependency', 'First/last mile solutions', 'Lower emissions'],
    imageUrl: 'https://images.pexels.com/photos/16964669/pexels-photo-16964669/free-photo-of-people-waiting-for-a-train-on-a-railway-station.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: '🚌',
    anchor: 'public-transportation-gaps'
  }
]
</script>

<template>
  <div class="solutions-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Smart City Solutions</h1>
        <p class="page-description">
          Discover innovative approaches to addressing urban challenges through technology, 
          data, and community engagement. These solutions are transforming cities around the 
          world and could be implemented in our community.
        </p>
      </div>
    </section>
    
    <!-- Solutions Grid -->
    <section class="section solutions-section">
      <div class="container">
        <div class="solutions-grid">
          <SolutionCard 
            v-for="solution in solutions"
            :key="solution.id"
            :title="solution.title"
            :description="solution.description"
            :benefits="solution.benefits"
            :imageUrl="solution.imageUrl"
            :icon="solution.icon"
            :anchor="solution.anchor"
          />
        </div>
      </div>
    </section>
    
    <!-- Energy Calculator Tool -->
    <section class="section calculator-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>Energy Savings Calculator</h2>
          <p class="section-subtitle">
            See how smart building technologies could reduce your energy consumption and costs.
            Adjust the sliders to customize the calculation for your situation.
          </p>
        </div>
        
        <EnergyCalculator />
      </div>
    </section>
    
    <!-- Implementation Roadmap -->
    <section class="section roadmap-section">
      <div class="container">
        <div class="section-header">
          <h2>Implementation Roadmap</h2>
          <p>
            Smart city solutions require careful planning and phased implementation. 
            This roadmap outlines a practical approach to transforming our urban environment.
          </p>
        </div>
        
        <div class="roadmap">
          <div class="roadmap-item">
            <div class="roadmap-marker">1</div>
            <div class="roadmap-content">
              <h3>Assessment & Planning</h3>
              <p>
                Conduct a comprehensive analysis of current infrastructure, identify priority areas,
                and develop a strategic implementation plan with community input.
              </p>
              <div class="roadmap-timeline">3-6 months</div>
            </div>
          </div>
          
          <div class="roadmap-item">
            <div class="roadmap-marker">2</div>
            <div class="roadmap-content">
              <h3>Pilot Projects</h3>
              <p>
                Launch small-scale implementations in selected neighborhoods to test technologies,
                gather data, and refine approaches based on real-world performance.
              </p>
              <div class="roadmap-timeline">6-12 months</div>
            </div>
          </div>
          
          <div class="roadmap-item">
            <div class="roadmap-marker">3</div>
            <div class="roadmap-content">
              <h3>Infrastructure Development</h3>
              <p>
                Build out the necessary connectivity infrastructure, data platforms, and integration
                systems to support full-scale smart city implementation.
              </p>
              <div class="roadmap-timeline">12-24 months</div>
            </div>
          </div>
          
          <div class="roadmap-item">
            <div class="roadmap-marker">4</div>
            <div class="roadmap-content">
              <h3>Citywide Deployment</h3>
              <p>
                Roll out solutions across the entire city, focusing on integration between
                different systems to maximize efficiency and impact.
              </p>
              <div class="roadmap-timeline">2-4 years</div>
            </div>
          </div>
          
          <div class="roadmap-item">
            <div class="roadmap-marker">5</div>
            <div class="roadmap-content">
              <h3>Continuous Improvement</h3>
              <p>
                Maintain, optimize, and evolve systems based on performance data, emerging
                technologies, and changing urban needs.
              </p>
              <div class="roadmap-timeline">Ongoing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call to Action -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2>Join Our Next Community Workshop</h2>
            <p>
              Learn more about these solutions and share your ideas at our upcoming 
              Smart City Workshop. Together, we can build a more sustainable and efficient urban future.
            </p>
          </div>
          <router-link to="/community-events" class="btn btn-primary">
            View Events
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-header {
  background-color: var(--color-secondary-600);
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

.solutions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .solutions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .solutions-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.section-header {
  margin-bottom: var(--space-8);
}

.section-subtitle {
  max-width: 700px;
  margin: 0 auto;
  color: var(--color-neutral-600);
}

.calculator-section {
  background-color: var(--color-neutral-100);
}

.roadmap-section {
  background-color: white;
}

.roadmap {
  position: relative;
  padding-left: 40px;
}

.roadmap:before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--color-primary-300);
}

.roadmap-item {
  position: relative;
  margin-bottom: var(--space-8);
}

.roadmap-item:last-child {
  margin-bottom: 0;
}

.roadmap-marker {
  position: absolute;
  left: -40px;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary-500);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  z-index: 1;
}

.roadmap-content {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
}

.roadmap-content h3 {
  margin-bottom: var(--space-3);
  color: var(--color-primary-600);
}

.roadmap-content p {
  margin-bottom: var(--space-3);
}

.roadmap-timeline {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--radius);
  font-size: 0.875rem;
  font-weight: 500;
}

.cta-section {
  background-color: var(--color-neutral-50);
}

.cta-card {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-600));
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .cta-card {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
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

.cta-content h2 {
  color: white;
  margin-bottom: var(--space-3);
}

.cta-card .btn-primary {
  background-color: white;
  color: var(--color-primary-600);
}

.cta-card .btn-primary:hover {
  background-color: var(--color-neutral-100);
}
</style>
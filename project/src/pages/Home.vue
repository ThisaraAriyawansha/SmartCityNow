<script setup lang="ts">
import HeroSection from '../components/home/HeroSection.vue'
import FeatureCard from '../components/home/FeatureCard.vue'
import StatisticItem from '../components/home/StatisticItem.vue'
import TestimonialCard from '../components/home/TestimonialCard.vue'

// Define feature data for smart city solutions
const features = [
  {
    id: 1,
    title: 'Smart Traffic Management',
    description: 'Reduce congestion and travel time with AI-powered traffic systems that adapt to real-time conditions.',
    icon: '🚦'
  },
  {
    id: 2,
    title: 'Energy Efficiency',
    description: 'Smart grids and intelligent buildings that reduce energy consumption and promote sustainability.',
    icon: '⚡'
  },
  {
    id: 3,
    title: 'Waste Management',
    description: 'IoT-enabled waste collection systems that optimize routes and reduce environmental impact.',
    icon: '♻️'
  },
  {
    id: 4,
    title: 'Urban Greening',
    description: 'Creating sustainable green spaces that improve air quality and enhance city living.',
    icon: '🌳'
  }
]

// Define statistics data for impact metrics
const statistics = [
  {
    id: 1,
    value: '40%',
    label: 'Reduction in traffic congestion',
    icon: '🚗'
  },
  {
    id: 2,
    value: '35%',
    label: 'Energy savings in smart buildings',
    icon: '🏢'
  },
  {
    id: 3,
    value: '50%',
    label: 'More efficient waste collection',
    icon: '🗑️'
  },
  {
    id: 4,
    value: '10x',
    label: 'Return on smart city investments',
    icon: '💰'
  }
]

// Define testimonial data from community members
const testimonials = [
  {
    id: 1,
    quote: "The smart traffic management system has cut my daily commute time by 15 minutes each way!",
    author: "Sarah Johnson",
    role: "City Resident"
  },
  {
    id: 2,
    quote: "As a business owner, the energy efficiency initiatives have reduced our operating costs significantly.",
    author: "Michael Chen",
    role: "Local Business Owner"
  },
  {
    id: 3,
    quote: "The community gardens initiative has transformed our neighborhood and brought people together.",
    author: "Emma Rodriguez",
    role: "Community Organizer"
  }
]
</script>

<template>
  <div class="home-page">
    <HeroSection />
    
    <!-- Features Section -->
    <section class="section features-section">
        <!-- Main container for the home page -->
      <div class="container">
        <div class="section-header text-center">
          <h2>Building Smarter Cities</h2>
          <p class="section-subtitle">
            Discover how smart technologies are transforming urban environments into more efficient, 
            sustainable, and livable spaces for all residents.
          </p>
        </div>
        
        <div class="features-grid">
          <FeatureCard 
            v-for="feature in features" 
            :key="feature.id"
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
          />
        </div>
      </div>
    </section>
    
    <!-- Impact Section -->
    <section class="section impact-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>Real Impact, Real Results</h2>
          <p class="section-subtitle">
            Smart city initiatives deliver measurable improvements to quality of life, efficiency, and sustainability.
          </p>
        </div>
        
        <div class="statistics-grid">
          <StatisticItem 
            v-for="stat in statistics"
            :key="stat.id"
            :value="stat.value"
            :label="stat.label"
            :icon="stat.icon"
          />
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>What Citizens Are Saying</h2>
          <p class="section-subtitle">
            Smart city solutions are making a difference in people's everyday lives.
          </p>
        </div>
        
        <div class="testimonials-grid">
          <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :quote="testimonial.quote"
            :author="testimonial.author"
            :role="testimonial.role"
          />
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Join the Movement</h2>
          <p>
            Be part of creating a smarter, more sustainable future for our city. Get involved in local 
            initiatives, attend community events, or share your feedback and ideas.
          </p>
          <div class="cta-buttons">
            <router-link to="/community-events" class="btn btn-primary">Find Events</router-link>
            <router-link to="/feedback" class="btn btn-outline">Share Feedback</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.section-header {
  max-width: 800px;
  margin: 0 auto var(--space-12);
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-neutral-600);
  max-width: 700px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.impact-section {
  background-color: var(--color-primary-50);
}

.statistics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .statistics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .statistics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cta-section {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-accent-600));
  color: white;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.cta-content h2 {
  color: white;
}

.cta-content p {
  margin-bottom: var(--space-6);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
}

.cta-buttons .btn-outline {
  border-color: white;
  color: white;
}

.cta-buttons .btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
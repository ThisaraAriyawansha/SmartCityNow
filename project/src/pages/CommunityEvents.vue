<script setup lang="ts">
import EventCard from '../components/events/EventCard.vue'
import RegisterForm from '../components/events/RegisterForm.vue'
import { ref } from 'vue'
import axios from 'axios'

const showRegistrationForm = ref(false)
const selectedEvent = ref(null)
const registrationStatus = ref('')

const openRegistration = (event) => {
  selectedEvent.value = event
  showRegistrationForm.value = true
}

const closeRegistration = () => {
  showRegistrationForm.value = false
  registrationStatus.value = ''
}

const handleRegistration = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/register', {
      event: selectedEvent.value,
      user: userData
    })
    registrationStatus.value = response.data.message
  } catch (error) {
    registrationStatus.value = error.response?.data?.error || 'Registration failed'
  }
}

const upcomingEvents = [
  {
    id: 1,
    title: 'Smart City Planning Workshop',
    date: 'June 15, 2025',
    time: '10:00 AM - 2:00 PM',
    location: 'City Hall, Conference Room A',
    description: 'Join urban planners and technology experts to discuss the future of our city. This interactive workshop will focus on identifying priority areas for smart city implementation and gathering community input on proposed solutions.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    spots: 40,
    remaining: 12
  },
  {
    id: 2,
    title: 'Green Infrastructure Tour',
    date: 'June 22, 2025',
    time: '9:00 AM - 12:00 PM',
    location: 'Downtown Green Corridor',
    description: 'Take a guided walking tour of recent green infrastructure projects in the downtown area. Learn about bioswales, permeable pavements, and smart irrigation systems that are helping make our city more sustainable and resilient.',
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    spots: 25,
    remaining: 8
  },
  {
    id: 3,
    title: 'Tech Expo: Smart City Solutions',
    date: 'July 8-9, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'Convention Center, Main Hall',
    description: 'Explore the latest technologies transforming urban environments at our annual Tech Expo. With demonstrations from leading companies and research institutions, you\'ll get hands-on experience with the innovations shaping our future.',
    image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    spots: 500,
    remaining: 183
  },
  {
    id: 4,
    title: 'Community Clean-Up & IoT Sensor Installation',
    date: 'July 20, 2025',
    time: '8:00 AM - 1:00 PM',
    location: 'Riverside Park',
    description: 'Volunteer for this dual-purpose event! Help clean up our beautiful Riverside Park while learning about the new environmental monitoring sensors being installed. These IoT devices will measure air quality, noise levels, and visitor patterns.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    spots: 75,
    remaining: 31
  },
  {
    id: 5,
    title: 'Energy Efficiency Workshop for Homeowners',
    date: 'August 5, 2025',
    time: '6:30 PM - 8:30 PM',
    location: 'Public Library, Meeting Room 3',
    description: 'Learn practical strategies to reduce your home\'s energy consumption using smart technologies. Experts will demonstrate smart thermostats, lighting systems, and appliances, with information on rebates and incentives available to residents.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    spots: 50,
    remaining: 22
  },
  {
    id: 6,
    title: 'Autonomous Vehicle Demonstration',
    date: 'August 19, 2025',
    time: '11:00 AM - 3:00 PM',
    location: 'Tech Innovation Center',
    description: 'Experience the future of urban transportation with demonstrations of autonomous shuttle technology. Learn how self-driving vehicles will integrate with our city\'s transportation network and the benefits they offer for mobility and accessibility.',
    image: 'https://eu-images.contentstack.com/v3/assets/blt7121b6ec5c11097b/bltd805201499042237/661959be333120672ac1ab65/autonomous_20vehicle.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
    spots: 120,
    remaining: 43
  }
]
</script>

<template>
  <div class="events-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Community Events</h1>
        <p class="page-description">
          Get involved with local smart city initiatives through workshops, tours, expos, and volunteer 
          opportunities. These events bring together residents, experts, and civic leaders to shape our 
          urban future.
        </p>
      </div>
    </section>
    
    <!-- Upcoming Events -->
    <section class="section events-section">
      <div class="container">
        <h2 class="section-title">Upcoming Events</h2>
        
        <div class="events-grid">
          <EventCard 
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
            @register="openRegistration"
          />
        </div>
      </div>
    </section>
    
    <!-- Community Calendar -->
    <section class="section calendar-section">
      <div class="container">
        <h2 class="section-title">Smart City Initiative Timeline</h2>
        <p class="section-subtitle">
          Our community's journey toward becoming a smarter, more sustainable city involves 
          many events and milestones. Here's what's coming up in the months ahead.
        </p>
        
        <div class="calendar-container">
          <div class="timeline">
            <div class="timeline-marker current">
              <div class="marker-label">Now</div>
            </div>
            <div class="timeline-marker">
              <div class="marker-label">3 months</div>
            </div>
            <div class="timeline-marker">
              <div class="marker-label">6 months</div>
            </div>
            <div class="timeline-marker">
              <div class="marker-label">9 months</div>
            </div>
            <div class="timeline-marker">
              <div class="marker-label">12 months</div>
            </div>
          </div>
          
          <div class="timeline-events">
            <div class="timeline-event" style="left: 0%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Community Workshops</div>
                <div class="event-description">Initial planning and feedback sessions</div>
              </div>
            </div>
            
            <div class="timeline-event" style="left: 15%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Pilot Sensor Deployment</div>
                <div class="event-description">Installation of first air quality and traffic sensors</div>
              </div>
            </div>
            
            <div class="timeline-event" style="left: 30%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Mobile App Launch</div>
                <div class="event-description">Release of city services and information app</div>
              </div>
            </div>
            
            <div class="timeline-event" style="left: 50%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Smart Traffic Pilot</div>
                <div class="event-description">Adaptive traffic signals at 5 key intersections</div>
              </div>
            </div>
            
            <div class="timeline-event" style="left: 65%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Green Roof Installation</div>
                <div class="event-description">First public building green roof completion</div>
              </div>
            </div>
            
            <div class="timeline-event" style="left: 85%;">
              <div class="event-dot"></div>
              <div class="event-content">
                <div class="event-title">Smart City Summit</div>
                <div class="event-description">Regional conference hosted in our city</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Host Your Own Event -->
    <section class="section host-section">
      <div class="container">
        <div class="host-content">
          <div class="host-info">
            <h2>Host Your Own Smart City Event</h2>
            <p>
              Do you have expertise or ideas to share with the community? Consider hosting 
              your own smart city event. We provide support for local organizers including 
              venue suggestions, promotion, and connection to subject matter experts.
            </p>
            <ul class="host-benefits">
              <li>Share your knowledge and passion with the community</li>
              <li>Connect with like-minded residents and professionals</li>
              <li>Help shape the future of our urban environment</li>
              <li>Receive support from the Smart City Initiative team</li>
            </ul>
            <a href="#" class="btn btn-primary">Learn About Hosting</a>
          </div>
          <div class="host-image">
            <img src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Community workshop" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Registration Modal -->
    <div v-if="showRegistrationForm" class="registration-modal">
      <div class="modal-backdrop" @click="closeRegistration"></div>
      <div class="modal-content">
        <button class="modal-close" @click="closeRegistration" aria-label="Close registration form">×</button>
        <h3 class="modal-title">Register for {{ selectedEvent?.title }}</h3>
        <p class="modal-details">
          {{ selectedEvent?.date }} at {{ selectedEvent?.time }}<br>
          Location: {{ selectedEvent?.location }}
        </p>
        <p v-if="registrationStatus" class="registration-status">{{ registrationStatus }}</p>
        <RegisterForm :event="selectedEvent" @close="closeRegistration" @submit="handleRegistration" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  background-color: var(--color-accent-600);
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

.section-title {
  margin-bottom: var(--space-6);
  text-align: center;
}

.section-subtitle {
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--space-8);
  color: var(--color-neutral-600);
}

.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .events-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.calendar-section {
  background-color: var(--color-neutral-100);
}

.calendar-container {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow);
  position: relative;
}

.timeline {
  height: 4px;
  background-color: var(--color-neutral-300);
  position: relative;
  margin: var(--space-16) 0;
  display: flex;
  justify-content: space-between;
}

.timeline-marker {
  width: 12px;
  height: 12px;
  background-color: var(--color-neutral-400);
  border-radius: 50%;
  position: absolute;
  top: -4px;
  transform: translateX(-50%);
}

.timeline-marker:nth-child(1) { left: 0%; }
.timeline-marker:nth-child(2) { left: 25%; }
.timeline-marker:nth-child(3) { left: 50%; }
.timeline-marker:nth-child(4) { left: 75%; }
.timeline-marker:nth-child(5) { left: 100%; }

.timeline-marker.current {
  background-color: var(--color-primary-500);
  width: 16px;
  height: 16px;
  top: -6px;
}

.marker-label {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.75rem;
  color: var(--color-neutral-500);
}

.timeline-events {
  position: relative;
  height: 160px;
}

.timeline-event {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
}

.event-dot {
  width: 10px;
  height: 10px;
  background-color: var(--color-primary-500);
  border-radius: 50%;
  margin: 0 auto var(--space-2);
}

.event-content {
  width: 150px;
  background-color: var(--color-primary-50);
  border-left: 3px solid var(--color-primary-500);
  padding: var(--space-3);
  border-radius: 0 var(--radius) var(--radius) 0;
}

.event-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-primary-700);
  margin-bottom: var(--space-1);
}

.event-description {
  font-size: 0.75rem;
  color: var(--color-neutral-600);
}

.host-section {
  background-color: white;
}

.host-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .host-content {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
}

.host-info h2 {
  margin-bottom: var(--space-4);
}

.host-info p {
  margin-bottom: var(--space-4);
  color: var(--color-neutral-700);
}

.host-benefits {
  list-style: none;
  margin-bottom: var(--space-6);
  padding: 0;
}

.host-benefits li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: var(--space-2);
  color: var(--color-neutral-700);
}

.host-benefits li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-secondary-500);
  font-weight: bold;
}

.host-image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.host-image img {
  display: block;
  width: 100%;
  height: auto;
}

/* Registration Modal */
.registration-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  box-shadow: var(--shadow-xl);
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-neutral-500);
  line-height: 1;
}

.modal-title {
  margin-bottom: var(--space-3);
  color: var(--color-primary-700);
}

.modal-details {
  margin-bottom: var(--space-4);
  color: var(--color-neutral-600);
  font-size: 0.9375rem;
}

.registration-status {
  color: var(--color-primary-700);
  margin-bottom: var(--space-4);
  text-align: center;
}
</style>
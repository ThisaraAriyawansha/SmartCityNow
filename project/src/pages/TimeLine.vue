<template>
  <section class="section calendar-section">
    <div class="container">
      <h2 class="section-title">Smart City Initiative Timeline</h2>
      <p class="section-subtitle">
        Our community's journey toward becoming a smarter, more sustainable city involves 
        many events and milestones. Here's what's coming up in the months ahead.
      </p>
      
      <div class="calendar-container">
        <!-- Mobile View - Vertical Timeline -->
        <div class="timeline-mobile">
          <div 
            v-for="(event, index) in timelineEvents" 
            :key="event.id"
            class="timeline-item-mobile"
            :class="{ 
              'active': event.status === 'current',
              'completed': event.status === 'completed',
              'upcoming': event.status === 'upcoming',
              'selected': selectedEventId === event.id
            }"
            @click="selectEvent(event)"
          >
            <div class="timeline-connector">
              <div class="timeline-dot-mobile">
                <div class="dot-inner" :class="event.status">
                  <span v-if="event.status === 'completed'" class="checkmark">✓</span>
                  <span v-else-if="event.status === 'current'" class="current-dot">●</span>
                  <span v-else class="upcoming-dot">{{ index + 1 }}</span>
                </div>
              </div>
              <div v-if="index < timelineEvents.length - 1" class="connector-line"></div>
            </div>
            
            <div class="timeline-content-mobile">
              <div class="timeline-header-mobile">
                <div class="timeline-date">{{ event.timeframe }}</div>
                <div class="event-status-badge" :class="event.status">
                  {{ getStatusText(event.status) }}
                </div>
              </div>
              <div class="timeline-title">{{ event.title }}</div>
              <div class="timeline-description">{{ event.description }}</div>
              
              <div v-if="event.progress !== undefined" class="progress-section-mobile">
                <div class="progress-label">
                  <span>Progress</span>
                  <span>{{ event.progress }}%</span>
                </div>
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: event.progress + '%' }"
                    :class="event.status"
                  ></div>
                </div>
              </div>

              <div v-if="selectedEventId === event.id && event.details" class="expanded-details">
                <h4>Key Details:</h4>
                <ul>
                  <li v-for="detail in event.details" :key="detail">{{ detail }}</li>
                </ul>
                <div v-if="event.nextMilestone" class="next-milestone">
                  <strong>Next Milestone:</strong> {{ event.nextMilestone }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop View - Horizontal Timeline -->
        <div class="timeline-desktop">
          <!-- Timeline Container -->
          <div class="timeline-container">
            <!-- Timeline Line with Progress -->
            <div class="timeline-line">
              <div class="timeline-progress" :style="{ width: calculateOverallProgress() + '%' }"></div>
            </div>
            
            <!-- Timeline Markers -->
            <div class="timeline-markers">
              <div 
                v-for="(event, index) in timelineEvents" 
                :key="event.id"
                class="timeline-marker"
                :class="{ 
                  'active': selectedEventId === event.id,
                  'completed': event.status === 'completed',
                  'current': event.status === 'current',
                  'upcoming': event.status === 'upcoming'
                }"
                :style="{ left: event.position + '%' }"
                @click="selectEvent(event)"
              >
                <div class="marker-dot">
                  <span v-if="event.status === 'completed'" class="checkmark">✓</span>
                  <span v-else-if="event.status === 'current'" class="current-indicator">●</span>
                  <span v-else class="upcoming-number">{{ index + 1 }}</span>
                </div>
                <div class="marker-label">{{ event.timeframe }}</div>
              </div>
            </div>
          </div>
          
          <!-- Event Details Panel -->
          <div class="event-details" v-if="selectedEvent">
            <div class="event-header">
              <h3 class="event-title">{{ selectedEvent.title }}</h3>
              <span class="event-status" :class="selectedEvent.status">
                {{ getStatusText(selectedEvent.status) }}
              </span>
            </div>
            
            <p class="event-description">{{ selectedEvent.description }}</p>
            
            <div v-if="selectedEvent.details" class="event-extra-details">
              <h4>Key Details:</h4>
              <ul>
                <li v-for="detail in selectedEvent.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
            
            <div v-if="selectedEvent.progress !== undefined" class="progress-section">
              <div class="progress-label">
                <span>Progress</span>
                <span>{{ selectedEvent.progress }}%</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: selectedEvent.progress + '%' }"
                  :class="selectedEvent.status"
                ></div>
              </div>
            </div>
            
            <div v-if="selectedEvent.nextMilestone" class="next-milestone">
              <strong>Next Milestone:</strong> {{ selectedEvent.nextMilestone }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedEventId = ref(1)

const timelineEvents = ref([
  {
    id: 1,
    title: 'Community Workshops',
    timeframe: 'Month 1-2',
    position: 8,
    status: 'completed',
    description: 'Initial planning and feedback sessions with community members to gather requirements.',
    progress: 100,
    details: [
      'Conducted 8 community workshops across different neighborhoods',
      'Gathered feedback from 300+ residents',
      'Identified top 5 priority areas for smart city development',
      'Created comprehensive community requirements document'
    ],
    nextMilestone: 'Implementation planning phase begins'
  },
  {
    id: 2,
    title: 'Pilot Sensor Deployment',
    timeframe: 'Month 3-4',
    position: 25,
    status: 'current',
    description: 'Installation of first phase air quality and traffic monitoring sensors.',
    progress: 75,
    details: [
      'Installing 25 air quality sensors across 5 districts',
      'Deploying 15 traffic monitoring points at key intersections',
      'Real-time data dashboard development 90% complete',
      'Mobile app integration testing underway'
    ],
    nextMilestone: 'Complete remaining 8 sensor installations by month end'
  },
  {
    id: 3,
    title: 'Mobile App Launch',
    timeframe: 'Month 5-6',
    position: 42,
    status: 'upcoming',
    description: 'Public release of the Smart City mobile application for residents.',
    progress: 45,
    details: [
      'Beta testing completed with 150 volunteer users',
      'Integration with city services API in progress',
      'Push notification system configured',
      'App store submission scheduled for next month'
    ],
    nextMilestone: 'Beta testing phase begins in 2 weeks'
  },
  {
    id: 4,
    title: 'Smart Traffic System',
    timeframe: 'Month 7-8',
    position: 58,
    status: 'upcoming',
    description: 'Deployment of adaptive traffic signal system at major intersections.',
    progress: 20,
    details: [
      'AI traffic optimization algorithms developed',
      'Hardware procurement 80% complete',
      'Integration with emergency services planned',
      'Expected 30% reduction in average wait times'
    ],
    nextMilestone: 'Equipment installation begins in 6 weeks'
  },
  {
    id: 5,
    title: 'Green Infrastructure',
    timeframe: 'Month 9-10',
    position: 75,
    status: 'upcoming',
    description: 'Smart green roof installation with environmental monitoring systems.',
    progress: 10,
    details: [
      'City Hall green roof design completed',
      'IoT sensors for temperature and moisture monitoring',
      'Educational visitor center planning phase',
      'Partnership with local environmental groups established'
    ],
    nextMilestone: 'Construction permits under review'
  },
  {
    id: 6,
    title: 'Smart City Summit',
    timeframe: 'Month 12',
    position: 92,
    status: 'upcoming',
    description: 'Regional smart city conference showcasing our achievements and lessons learned.',
    progress: 5,
    details: [
      'Venue booking confirmed at Convention Center',
      'International keynote speakers contacted',
      'Live demonstrations of all implemented systems planned',
      'Expected 500+ attendees from regional municipalities'
    ],
    nextMilestone: 'Speaker confirmations due in 8 weeks'
  }
])

const selectedEvent = computed(() => {
  return timelineEvents.value.find(event => event.id === selectedEventId.value)
})

const selectEvent = (event) => {
  selectedEventId.value = event.id
}

const getStatusText = (status) => {
  const statusMap = {
    completed: 'Completed',
    current: 'In Progress',
    upcoming: 'Planning'
  }
  return statusMap[status] || status
}

const calculateOverallProgress = () => {
  const completed = timelineEvents.value.filter(e => e.status === 'completed').length
  const current = timelineEvents.value.filter(e => e.status === 'current').length * 0.5
  const total = timelineEvents.value.length
  return Math.round(((completed + current) / total) * 100)
}

// Auto-select first current event on load
onMounted(() => {
  const currentEvent = timelineEvents.value.find(e => e.status === 'current')
  if (currentEvent) {
    selectedEventId.value = currentEvent.id
  }
})
</script>

<style scoped>
.calendar-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #1e293b;
}

.section-subtitle {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  color: #64748b;
  line-height: 1.6;
  font-size: 1.125rem;
}

.calendar-container {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

/* Mobile Timeline Styles */
.timeline-mobile {
  display: block;
}

.timeline-item-mobile {
  display: flex;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0.75rem;
  padding: 1rem;
  position: relative;
}

.timeline-item-mobile:hover {
  background-color: #f8fafc;
  transform: translateX(0.25rem);
}

.timeline-item-mobile.selected {
  background-color: #eff6ff;
  border-left: 4px solid #3b82f6;
}

.timeline-connector {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.5rem;
  position: relative;
}

.timeline-dot-mobile {
  width: 3rem;
  height: 3rem;
  position: relative;
  z-index: 2;
}

.dot-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dot-inner.completed {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.dot-inner.current {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  animation: pulse 2s infinite;
}

.dot-inner.upcoming {
  background: linear-gradient(135deg, #94a3b8, #64748b);
  color: white;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 10px rgba(59, 130, 246, 0);
  }
}

.connector-line {
  width: 3px;
  flex: 1;
  background: linear-gradient(to bottom, #cbd5e1, #e2e8f0);
  margin-top: 0.5rem;
  border-radius: 2px;
}

.timeline-content-mobile {
  flex: 1;
  min-width: 0;
}

.timeline-header-mobile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.timeline-date {
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 600;
  background-color: #eff6ff;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.event-status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.event-status-badge.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.event-status-badge.current {
  background-color: #dbeafe;
  color: #1e40af;
}

.event-status-badge.upcoming {
  background-color: #f1f5f9;
  color: #475569;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.timeline-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.progress-section-mobile {
  margin-bottom: 1rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.progress-bar {
  height: 0.75rem;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 0.375rem;
  transition: width 1s ease-out;
}

.progress-fill.completed {
  background: linear-gradient(90deg, #10b981, #059669);
}

.progress-fill.current {
  background: linear-gradient(90deg, #3b82f6, #2563eb);
}

.progress-fill.upcoming {
  background: linear-gradient(90deg, #94a3b8, #64748b);
}

.expanded-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #e5e7eb;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expanded-details h4 {
  margin-bottom: 0.75rem;
  color: #1e293b;
  font-size: 1rem;
  font-weight: 600;
}

.expanded-details ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.expanded-details li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.5;
}

.expanded-details li:before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: bold;
}

.next-milestone {
  padding: 0.75rem;
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #1e40af;
  border-left: 4px solid #3b82f6;
}

/* Desktop Timeline Styles */
.timeline-desktop {
  display: none;
}

.timeline-container {
  margin-bottom: 2rem;
}

.timeline-line {
  height: 0.5rem;
  background-color: #e5e7eb;
  position: relative;
  margin: 3rem 0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.timeline-progress {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  border-radius: 0.25rem;
  transition: width 2s ease-out;
}

.timeline-markers {
  position: relative;
  height: 4rem;
}

.timeline-marker {
  position: absolute;
  top: -2rem;
  transform: translateX(-50%);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.timeline-marker:hover {
  transform: translateX(-50%) translateY(-0.25rem);
}

.marker-dot {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.timeline-marker.completed .marker-dot {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.timeline-marker.current .marker-dot {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  animation: pulse 2s infinite;
}

.timeline-marker.upcoming .marker-dot {
  background: linear-gradient(135deg, #94a3b8, #64748b);
  color: white;
}

.timeline-marker.active .marker-dot {
  transform: scale(1.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(59, 130, 246, 0.2);
}

.marker-label {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  white-space: nowrap;
  font-weight: 600;
}

.event-details {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 1rem;
  padding: 2rem;
  border-left: 6px solid #3b82f6;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.event-title {
  color: #1e293b;
  margin: 0;
  flex: 1;
  font-size: 1.5rem;
  font-weight: 700;
}

.event-status {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.event-status.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.event-status.current {
  background-color: #dbeafe;
  color: #1e40af;
}

.event-status.upcoming {
  background-color: #f1f5f9;
  color: #475569;
}

.event-description {
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.event-extra-details {
  margin-bottom: 1.5rem;
}

.event-extra-details h4 {
  margin-bottom: 1rem;
  color: #1e293b;
  font-size: 1.125rem;
  font-weight: 600;
}

.event-extra-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.event-extra-details li {
  padding-left: 1.5rem;
  position: relative;
  color: #4b5563;
  line-height: 1.6;
}

.event-extra-details li:before {
  content: '▸';
  position: absolute;
  left: 0;
  color: #3b82f6;
  font-weight: bold;
  font-size: 1.125rem;
}

.progress-section {
  margin-bottom: 1.5rem;
}

/* Responsive Design */
@media (min-width: 768px) {
  .timeline-mobile {
    display: none;
  }
  
  .timeline-desktop {
    display: block;
  }
  
  .calendar-container {
    padding: 3rem;
  }
  
  .section-title {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .event-header {
    align-items: center;
  }
  
  .event-extra-details ul {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
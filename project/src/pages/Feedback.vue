<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CommentList from '../components/feedback/CommentList.vue'
import CommentForm from '../components/feedback/CommentForm.vue'
import LocationPicker from '../components/feedback/LocationPicker.vue'
import FeedbackMap from '../components/feedback/FeedbackMap.vue'

// Simulated comments data
const comments = ref([
  {
    id: 1,
    author: 'Sarah Johnson',
    date: '2025-05-12T10:30:00',
    content: 'I love the idea of smart traffic management! My commute is currently a nightmare during rush hour. How soon could we see this implemented in the downtown area?',
    likes: 8,
    replies: [
      {
        id: 101,
        author: 'Michael Chen',
        date: '2025-05-12T11:45:00',
        content: 'I agree with Sarah. The traffic congestion on Main Street is getting worse every month. Smart traffic lights would make a huge difference.',
        likes: 3
      }
    ]
  },
  {
    id: 2,
    author: 'David Wilson',
    date: '2025-05-10T15:22:00',
    content: 'The waste management solution looks promising. I\'ve seen similar systems in European cities and they work really well. Would the smart bins be solar powered?',
    likes: 5,
    replies: []
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    date: '2025-05-09T09:15:00',
    content: 'I\'m concerned about the privacy implications of all these sensors and cameras. How will the data be protected, and will it be anonymized?',
    likes: 12,
    replies: [
      {
        id: 102,
        author: 'Admin',
        date: '2025-05-09T10:20:00',
        content: 'Great question, Emma. All data collected by sensors will be anonymized and aggregated. No personally identifiable information will be stored, and all systems comply with the latest data protection regulations.',
        likes: 7
      }
    ]
  }
])

// Feedback data with location
const feedbackItems = ref([
  {
    id: 1001,
    author: 'Kamal Perera',
    date: '2025-05-15T14:30:00',
    title: 'Traffic congestion near Galle Face',
    category: 'Traffic & Transportation',
    description: 'The traffic near Galle Face Green during weekends is unbearable. We need smart traffic lights to manage the flow.',
    location: { lat: 6.9271, lng: 79.8412 }, // Colombo coordinates
    status: 'Under Review'
  },
  {
    id: 1002,
    author: 'Nimali Fernando',
    date: '2025-05-14T09:15:00',
    title: 'Waste collection in Kandy',
    category: 'Waste Management',
    description: 'The waste collection schedule in Kandy city center is inconsistent. Smart bins with fill-level sensors would help optimize collection routes.',
    location: { lat: 7.2906, lng: 80.6337 }, // Kandy coordinates
    status: 'In Progress'
  }
])

const activeTab = ref('comments')
const showLocationPicker = ref(false)
const selectedLocation = ref<{lat: number, lng: number} | null>(null)
const selectedFeedback = ref<any>(null)
const showFeedbackModal = ref(false)

const feedbackCategories = ref([
  'Traffic & Transportation',
  'Energy & Utilities',
  'Waste Management',
  'Green Spaces',
  'Public Safety',
  'Digital Services',
  'Other'
])

// Form data
const feedbackForm = ref({
  name: '',
  email: '',
  category: '',
  title: '',
  description: '',
  location: null as {lat: number, lng: number} | null
})

// Add a new comment
const addComment = (newComment: any) => {
  const commentObj = {
    id: comments.value.length + 10,
    author: newComment.author,
    date: new Date().toISOString(),
    content: newComment.content,
    likes: 0,
    replies: []
  }
  
  comments.value.unshift(commentObj)
}

// Add a reply to a comment
const addReply = (commentId: number, reply: any) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    const replyObj = {
      id: Date.now(),
      author: reply.author,
      date: new Date().toISOString(),
      content: reply.content,
      likes: 0
    }
    
    comment.replies.push(replyObj)
  }
}

// Like a comment
const likeComment = (commentId: number, isReply = false, parentId = null) => {
  if (!isReply) {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      comment.likes++
    }
  } else if (parentId) {
    const comment = comments.value.find(c => c.id === parentId)
    if (comment) {
      const reply = comment.replies.find(r => r.id === commentId)
      if (reply) {
        reply.likes++
      }
    }
  }
}

// Open location picker
const openLocationPicker = () => {
  showLocationPicker.value = true
}

// Handle location selection
const handleLocationSelect = (location: {lat: number, lng: number}) => {
  selectedLocation.value = location
  feedbackForm.value.location = location
  showLocationPicker.value = false
}

// Submit feedback
const submitFeedback = () => {
  if (!feedbackForm.value.name || !feedbackForm.value.title || !feedbackForm.value.description) {
    alert('Please fill in all required fields')
    return
  }
  
  const newFeedback = {
    id: Date.now(),
    author: feedbackForm.value.name,
    date: new Date().toISOString(),
    title: feedbackForm.value.title,
    category: feedbackForm.value.category || 'Other',
    description: feedbackForm.value.description,
    location: feedbackForm.value.location,
    status: 'New'
  }
  
  feedbackItems.value.unshift(newFeedback)
  
  // Reset form
  feedbackForm.value = {
    name: '',
    email: '',
    category: '',
    title: '',
    description: '',
    location: null
  }
  
  selectedLocation.value = null
  activeTab.value = 'comments'
}

// View feedback details
const viewFeedbackDetails = (feedback: any) => {
  selectedFeedback.value = feedback
  showFeedbackModal.value = true
}

// Close feedback modal
const closeFeedbackModal = () => {
  showFeedbackModal.value = false
}
</script>

<template>
  <div class="feedback-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Community Feedback</h1>
        <p class="page-description">
          Share your thoughts, ideas, and concerns about smart city initiatives in Sri Lanka. 
          Your feedback helps shape the future of our urban environment.
        </p>
      </div>
    </section>
    
    <!-- Feedback Tabs -->
    <section class="section feedback-section">
      <div class="container">
        <div class="tabs">
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'comments' }"
            @click="activeTab = 'comments'"
          >
            Discussion Forum
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: activeTab === 'ideas' }"
            @click="activeTab = 'ideas'"
          >
            Submit Feedback
          </button>
        </div>
        
        <div class="tab-content">
          <!-- Comments Tab -->
          <div v-if="activeTab === 'comments'" class="comments-tab">
            <div class="comments-header">
              <h2>Community Discussion</h2>
              <p>
                Join the conversation about smart city initiatives in Sri Lanka. 
                Share your thoughts, ask questions, and engage with other community members.
              </p>
            </div>
            
            <CommentForm @submit="addComment" />
            
            <CommentList 
              :comments="comments" 
              @reply="addReply" 
              @like="likeComment" 
            />
          </div>
          
          <!-- Ideas Tab -->
          <div v-if="activeTab === 'ideas'" class="ideas-tab">
            <div class="ideas-header">
              <h2>Submit Your Feedback</h2>
              <p>
                Have ideas for improving our cities in Sri Lanka? Share your suggestions, 
                report issues, or propose innovative solutions to urban challenges.
              </p>
            </div>
            
            <div class="feedback-form">
              <div class="form-group">
                <label for="name" class="form-label">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  class="form-input" 
                  placeholder="Enter your name"
                  v-model="feedbackForm.name"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  class="form-input" 
                  placeholder="Enter your email"
                  v-model="feedbackForm.email"
                >
              </div>
              
              <div class="form-group">
                <label for="category" class="form-label">Feedback Category</label>
                <select 
                  id="category" 
                  class="form-input"
                  v-model="feedbackForm.category"
                >
                  <option value="">Select a category</option>
                  <option 
                    v-for="category in feedbackCategories" 
                    :key="category" 
                    :value="category"
                  >
                    {{ category }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="title" class="form-label">Feedback Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  class="form-input" 
                  placeholder="Enter a brief title for your feedback"
                  v-model="feedbackForm.title"
                  required
                >
              </div>
              
              <div class="form-group">
                <label for="description" class="form-label">Detailed Description *</label>
                <textarea 
                  id="description" 
                  class="form-input form-textarea" 
                  placeholder="Please provide details about your feedback, idea, or concern..."
                  v-model="feedbackForm.description"
                  required
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="form-label">Location (if applicable)</label>
                <div class="location-section">
                  <button 
                    type="button" 
                    class="btn btn-outline"
                    @click="openLocationPicker"
                  >
                    {{ feedbackForm.location ? 'Change Location' : 'Select Location on Map' }}
                  </button>
                  
                  <div v-if="feedbackForm.location" class="location-preview">
                    <p>Selected Location:</p>
                    <p>Latitude: {{ feedbackForm.location.lat.toFixed(4) }}, Longitude: {{ feedbackForm.location.lng.toFixed(4) }}</p>
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button 
                  class="btn btn-primary"
                  @click="submitFeedback"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Feedback Map Section -->
    <section class="section map-section">
      <div class="container">
        <div class="section-header">
          <h2>Feedback Locations</h2>
          <p class="section-subtitle">
            View community feedback pinned on the Sri Lanka map. Click on markers to see details.
          </p>
        </div>
        
        <div class="map-container">
          <FeedbackMap 
            :feedbackItems="feedbackItems"
            @marker-click="viewFeedbackDetails"
          />
        </div>
      </div>
    </section>
    
    <!-- Success Stories -->
    <section class="section success-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>Community Impact Stories</h2>
          <p class="section-subtitle">
            See how community feedback has shaped our smart city initiatives across Sri Lanka.
          </p>
        </div>
        
        <div class="success-grid">
          <div class="success-card">
            <img src="https://media.istockphoto.com/id/1914071335/photo/crowds-and-businesses-on-the-streets-of-colombo-sri-lanka.jpg?s=612x612&w=0&k=20&c=ompqTDP1ADYtJpaFM13rV2LgPIU309f1OItJFL7vaJY=" alt="Smart traffic lights in Colombo" class="success-image">
            <h3>Colombo Traffic Management</h3>
            <p>
              Resident feedback led to smart traffic lights at 10 major intersections in Colombo,
              reducing average commute times by 25% during peak hours.
            </p>
          </div>
          
          <div class="success-card">
            <img src="https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/05/Intrepid-Travel-sri-lanka_kandy_building_tuk-tuk.jpg" alt="Smart crosswalk in Kandy" class="success-image">
            <h3>Kandy Pedestrian Safety</h3>
            <p>
              Community suggestions resulted in smart crosswalks with motion sensors near schools
              in Kandy, improving safety for thousands of students.
            </p>
          </div>
          
          <div class="success-card">
            <img src="https://news.navy.lk/assets/images/news/neela_haritha_news/front_img/202408041000.jpg" alt="Solar-powered waste bin in Galle" class="success-image">
            <h3>Galle Waste Management</h3>
            <p>
              Feedback from Galle residents led to solar-powered smart waste bins that notify
              collectors when full, reducing overflow incidents by 80%.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Location Picker Modal -->
    <div v-if="showLocationPicker" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Select Location on Sri Lanka Map</h3>
          <button class="modal-close" @click="showLocationPicker = false">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <LocationPicker 
            @location-selected="handleLocationSelect"
            @cancel="showLocationPicker = false"
          />
        </div>
      </div>
    </div>
    
    <!-- Feedback Details Modal -->
    <div v-if="showFeedbackModal" class="modal-overlay">
      <div class="modal-content feedback-modal">
        <div class="modal-header">
          <h3>{{ selectedFeedback?.title }}</h3>
          <button class="modal-close" @click="closeFeedbackModal">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div class="feedback-meta">
            <p><strong>Submitted by:</strong> {{ selectedFeedback?.author }}</p>
            <p><strong>Date:</strong> {{ new Date(selectedFeedback?.date).toLocaleDateString() }}</p>
            <p><strong>Category:</strong> {{ selectedFeedback?.category }}</p>
            <p><strong>Status:</strong> <span class="status-badge">{{ selectedFeedback?.status }}</span></p>
          </div>
          
          <div class="feedback-description">
            <h4>Description:</h4>
            <p>{{ selectedFeedback?.description }}</p>
          </div>
          

        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeFeedbackModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  background-color: #2563eb;
  color: white;
  padding: 4rem 0 2.5rem;
  text-align: center;
  background-image: url('https://t3.ftcdn.net/jpg/05/09/61/26/360_F_509612635_GUNAL869yGzr1DUOAjFahmDqDzgXaq9G.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.page-header .container {
  position: relative;
  z-index: 2;
}

.page-header h1 {
  margin-bottom: 1rem;
  color: white;
  font-size: 2.5rem;
}

.page-description {
  max-width: 800px;
  margin: 0 auto 1.5rem;
  font-size: 1.125rem;
  line-height: 1.6;
}


.tabs {
  display: flex;
  border-bottom: 1px solid var(--color-neutral-200);
  margin-bottom: var(--space-6);
}

.tab-btn {
  padding: var(--space-3) var(--space-4);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-neutral-600);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  color: var(--color-primary-600);
  border-bottom-color: var(--color-primary-500);
}

.tab-btn:hover:not(.active) {
  color: var(--color-neutral-800);
  background-color: var(--color-neutral-50);
}

.comments-header,
.ideas-header {
  margin-bottom: var(--space-6);
}

.comments-header h2,
.ideas-header h2 {
  margin-bottom: var(--space-2);
}

.comments-header p,
.ideas-header p {
  color: var(--color-neutral-600);
}

.feedback-form {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.location-section {
  margin-top: var(--space-2);
}

.location-preview {
  margin-top: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-neutral-50);
  border-radius: var(--radius);
  font-size: 0.875rem;
}

.form-actions {
  margin-top: var(--space-6);
  text-align: right;
}

.btn {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
  border: 1px solid var(--color-primary-600);
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--color-primary-600);
  color: var(--color-primary-600);
}

.btn-outline:hover {
  background-color: var(--color-primary-50);
}

.map-section {
  background-color: var(--color-neutral-100);
  padding-bottom: var(--space-10);
}

.map-container {
  height: 500px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.success-section {
  background-color: var(--color-neutral-100);
}

.section-header {
  margin-bottom: var(--space-8);
}

.section-header.text-center {
  text-align: center;
}

.section-subtitle {
  max-width: 700px;
  margin: 0 auto;
  color: var(--color-neutral-600);
}

.success-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .success-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.success-card {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow);
  text-align: center;
}

.success-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.success-card h3 {
  margin-bottom: var(--space-3);
  color: var(--color-primary-600);
}

.success-card p {
  color: var(--color-neutral-600);
  font-size: 0.9375rem;
  margin-bottom: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-neutral-600);
}

.modal-body {
  padding: var(--space-6);
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-neutral-200);
  text-align: right;
}

/* Feedback Modal Specific Styles */
.feedback-modal .modal-body {
  display: grid;
  gap: var(--space-6);
}

.feedback-meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.feedback-description {
  margin-top: var(--space-4);
}

.mini-map {
  height: 200px;
  border-radius: var(--radius);
  overflow: hidden;
  margin-top: var(--space-3);
}

.status-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  background-color: var(--color-primary-100);
  color: var(--color-primary-800);
}

.success-section {
  padding: 50px 0;
  background-color: #f8f9fa; /* Light background for contrast */
}

.success-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.success-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.success-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.success-image {
  width: 100%;
  height: 200px;
  object-fit: cover; /* Ensures images fit nicely without distortion */
  border-radius: 8px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.success-card:hover .success-image {
  transform: scale(1.05); /* Slight zoom effect on hover */
}

.success-card h3 {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
}

.success-card p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .success-grid {
    grid-template-columns: 1fr;
  }

  .success-image {
    height: 150px; /* Smaller height for mobile */
  }
}
</style>
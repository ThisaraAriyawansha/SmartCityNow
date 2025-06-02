<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CommentList from '../components/feedback/CommentList.vue'
import CommentForm from '../components/feedback/CommentForm.vue'

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

const activeTab = ref('comments')
const feedbackCategories = ref([
  'Traffic & Transportation',
  'Energy & Utilities',
  'Waste Management',
  'Green Spaces',
  'Public Safety',
  'Digital Services',
  'Other'
])

// Add a new comment
const addComment = (newComment) => {
  const commentObj = {
    id: comments.value.length + 10, // Simple ID generation
    author: newComment.author,
    date: new Date().toISOString(),
    content: newComment.content,
    likes: 0,
    replies: []
  }
  
  comments.value.unshift(commentObj)
}

// Add a reply to a comment
const addReply = (commentId, reply) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    const replyObj = {
      id: Date.now(), // Simple ID generation
      author: reply.author,
      date: new Date().toISOString(),
      content: reply.content,
      likes: 0
    }
    
    comment.replies.push(replyObj)
  }
}

// Like a comment
const likeComment = (commentId, isReply = false, parentId = null) => {
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
</script>

<template>
  <div class="feedback-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Community Feedback</h1>
        <p class="page-description">
          Share your thoughts, ideas, and concerns about smart city initiatives. Your feedback 
          helps shape the future of our urban environment and ensures that solutions address 
          real community needs.
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
                Join the conversation about smart city initiatives. Share your thoughts, 
                ask questions, and engage with other community members.
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
                Have ideas for improving our city? Share your suggestions, report issues, 
                or propose innovative solutions to urban challenges.
              </p>
            </div>
            
            <div class="feedback-form">
              <div class="form-group">
                <label for="name" class="form-label">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  class="form-input" 
                  placeholder="Enter your name"
                >
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  class="form-input" 
                  placeholder="Enter your email"
                >
              </div>
              
              <div class="form-group">
                <label for="category" class="form-label">Feedback Category</label>
                <select id="category" class="form-input">
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
                <label for="title" class="form-label">Feedback Title</label>
                <input 
                  type="text" 
                  id="title" 
                  class="form-input" 
                  placeholder="Enter a brief title for your feedback"
                >
              </div>
              
              <div class="form-group">
                <label for="description" class="form-label">Detailed Description</label>
                <textarea 
                  id="description" 
                  class="form-input form-textarea" 
                  placeholder="Please provide details about your feedback, idea, or concern..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="form-label">Location (if applicable)</label>
                <div class="location-map">
                  <div class="map-placeholder">
                    <div class="map-overlay">
                      <p>Click on the map to select a location</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-actions">
                <button class="btn btn-primary">Submit Feedback</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Success Stories -->
    <section class="section success-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>Community Impact Stories</h2>
          <p class="section-subtitle">
            See how community feedback has shaped our smart city initiatives and made a real difference.
          </p>
        </div>
        
        <div class="success-grid">
          <div class="success-card">
            <div class="success-icon">💡</div>
            <h3>Neighborhood Solar Program</h3>
            <p>
              A resident's suggestion led to a community solar initiative that now powers 
              street lights in three neighborhoods, reducing energy costs by 40%.
            </p>
          </div>
          
          <div class="success-card">
            <div class="success-icon">🚸</div>
            <h3>School Zone Safety</h3>
            <p>
              Parent feedback resulted in smart crosswalks with motion sensors and warning 
              lights near schools, improving pedestrian safety for children.
            </p>
          </div>
          
          <div class="success-card">
            <div class="success-icon">♻️</div>
            <h3>Community Composting</h3>
            <p>
              A suggestion from our feedback forum led to the creation of five community 
              composting stations, diverting tons of organic waste from landfills.
            </p>
          </div>
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

.location-map {
  border-radius: var(--radius);
  overflow: hidden;
}

.map-placeholder {
  height: 200px;
  background-image: url('https://images.pexels.com/photos/417322/pexels-photo-417322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.form-actions {
  margin-top: var(--space-6);
}

.success-section {
  background-color: var(--color-neutral-100);
}

.section-header {
  margin-bottom: var(--space-8);
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
</style>
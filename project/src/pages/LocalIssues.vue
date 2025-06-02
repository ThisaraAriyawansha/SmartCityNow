<script setup lang="ts">
import IssueCard from '../components/local-issues/IssueCard.vue'
import { ref, computed } from 'vue'

interface LocalIssue {
  id: number
  title: string
  description: string
  impact: 'Low' | 'Medium' | 'High'
  icon: string
  imageUrl: string
  category?: string
  upvotes?: number
  location?: string
  reportedDate?: string
  reportedBy?: string
}

const localIssues = ref<LocalIssue[]>([
  {
    id: 1,
    title: 'Traffic Congestion',
    description: 'Rush hour gridlock causes delays, increases pollution, and reduces productivity. Major hotspots include downtown intersections and highway access points.',
    impact: 'High',
    icon: '🚗',
    imageUrl: 'https://images.pexels.com/photos/4553166/pexels-photo-4553166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Transportation',
    upvotes: 124,
    location: 'Downtown area',
    reportedDate: '2023-10-15'
  },
  {
    id: 2,
    title: 'Energy Inefficiency',
    description: 'Outdated building systems and infrastructure lead to excessive energy consumption, higher utility costs, and unnecessary carbon emissions.',
    impact: 'Medium',
    icon: '💡',
    imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Environment',
    upvotes: 87,
    location: 'City-wide',
    reportedDate: '2023-09-22'
  },
  {
    id: 3,
    title: 'Waste Management',
    description: 'Inefficient collection routes, overflowing bins, and low recycling rates contribute to street litter, health hazards, and environmental damage.',
    impact: 'High',
    icon: '🗑️',
    imageUrl: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Sanitation',
    upvotes: 156,
    location: 'Residential areas',
    reportedDate: '2023-11-05'
  },
  {
    id: 4,
    title: 'Limited Green Spaces',
    description: 'Urban development has reduced parks and natural areas, limiting recreational opportunities and contributing to the urban heat island effect.',
    impact: 'Medium',
    icon: '🌳',
    imageUrl: 'https://images.pexels.com/photos/417222/pexels-photo-417222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Environment',
    upvotes: 92,
    location: 'Urban core',
    reportedDate: '2023-08-30'
  },
  {
    id: 5,
    title: 'Water Management',
    description: 'Aging infrastructure leads to water loss through leaks, while inefficient usage patterns strain supply during peak demand periods.',
    impact: 'Medium',
    icon: '💧',
    imageUrl: 'https://www.csrmandate.org/wp-content/uploads/2021/08/main-photo-e1627901807532.jpg',
    category: 'Infrastructure',
    upvotes: 68,
    location: 'City-wide',
    reportedDate: '2023-10-01'
  },
  {
    id: 6,
    title: 'Public Transportation Gaps',
    description: 'Inadequate coverage and frequency in public transit systems forces car dependency and isolates underserved neighborhoods.',
    impact: 'High',
    icon: '🚌',
    imageUrl: 'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Transportation',
    upvotes: 143,
    location: 'Suburban areas',
    reportedDate: '2023-09-10'
  }
])

// Form for new issue
const showAddForm = ref(false)
const newIssue = ref<Omit<LocalIssue, 'id'>>({
  title: '',
  description: '',
  impact: 'Medium',
  icon: '📍',
  imageUrl: '', // Will store base64 string or object URL
  category: '',
  location: '',
  reportedBy: 'Anonymous'
})
const categoryOptions = [
  'Transportation',
  'Environment',
  'Sanitation',
  'Infrastructure',
  'Public Safety',
  'Education',
  'Healthcare'
]

const impactOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' }
]

const iconOptions = [
  { value: '🚗', label: 'Traffic' },
  { value: '💡', label: 'Energy' },
  { value: '🗑️', label: 'Waste' },
  { value: '🌳', label: 'Green Space' },
  { value: '💧', label: 'Water' },
  { value: '🚌', label: 'Transport' },
  { value: '🏥', label: 'Healthcare' },
  { value: '👮', label: 'Safety' },
  { value: '🏫', label: 'Education' }
]
// Handle image file upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    // Validate file type (optional, restricts to images)
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (e.g., PNG, JPEG).')
      return
    }
    // Validate file size (optional, e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      newIssue.value.imageUrl = e.target?.result as string // Store base64 string
    }
    reader.readAsDataURL(file)
  }
}

// Filter functionality
const filter = ref<string>('all')
const searchQuery = ref<string>('')

const filteredIssues = computed(() => {
  let issues = localIssues.value
  
  // Apply category filter
  if (filter.value !== 'all') {
    issues = issues.filter(issue => 
      issue.category?.toLowerCase().includes(filter.value.toLowerCase()))
  }
  
  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    issues = issues.filter(issue => 
      issue.title.toLowerCase().includes(query) || 
      issue.description.toLowerCase().includes(query) ||
      issue.location?.toLowerCase().includes(query))
  }
  
  return issues
})

// Sorting functionality
const sortBy = ref<string>('upvotes') // Default sort by upvotes

const sortedIssues = computed(() => {
  const issues = [...filteredIssues.value]
  
  switch (sortBy.value) {
    case 'upvotes':
      return issues.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    case 'recent':
      return issues.sort((a, b) => 
        new Date(b.reportedDate || 0).getTime() - new Date(a.reportedDate || 0).getTime())
    case 'impact':
      const impactOrder = { 'High': 3, 'Medium': 2, 'Low': 1 }
      return issues.sort((a, b) => impactOrder[b.impact] - impactOrder[a.impact])
    default:
      return issues
  }
})

// Upvote functionality
const upvoteIssue = (id: number) => {
  const issue = localIssues.value.find(issue => issue.id === id)
  if (issue && issue.upvotes !== undefined) {
    issue.upvotes++
  }
}

// Add new issue
const addNewIssue = () => {
  if (!newIssue.value.title || !newIssue.value.description) {
    alert('Please fill in required fields (Title and Description)')
    return
  }

  const issue: LocalIssue = {
    id: Math.max(...localIssues.value.map(i => i.id), 0) + 1,
    ...newIssue.value,
    upvotes: 0,
    reportedDate: new Date().toISOString().split('T')[0]
  }

  localIssues.value.unshift(issue)
  resetForm()
  showAddForm.value = false
}

const resetForm = () => {
  newIssue.value = {
    title: '',
    description: '',
    impact: 'Medium',
    icon: '📍',
    imageUrl: '',
    category: '',
    location: '',
    reportedBy: 'Anonymous'
  }
}

// Get unique categories for filter dropdown
const categories = computed(() => {
  const allCategories = localIssues.value.map(issue => issue.category)
  return ['all', ...new Set(allCategories.filter(Boolean)) as unknown as string[]]
})
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
        <button 
          @click="showAddForm = !showAddForm" 
          class="btn btn-outline"
        >
          {{ showAddForm ? 'Cancel' : 'Report New Issue' }}
        </button>
      </div>
    </section>

    <!-- Add New Issue Form -->
    <section v-if="showAddForm" class="section add-issue-section">
  <div class="container">
    <div class="add-issue-form">
      <h2>Report a Local Issue</h2>
      <form @submit.prevent="addNewIssue">
        <div class="form-grid">
          <div class="form-group">
            <label for="issue-title">Title*</label>
            <input
              id="issue-title"
              v-model="newIssue.title"
              type="text"
              required
              placeholder="Brief title of the issue"
            >
          </div>

          <div class="form-group">
            <label for="issue-category">Category</label>
            <select
              id="issue-category"
              v-model="newIssue.category"
            >
              <option value="">Select a category</option>
              <option 
                v-for="category in categoryOptions"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="issue-impact">Impact Level</label>
            <select
              id="issue-impact"
              v-model="newIssue.impact"
            >
              <option 
                v-for="option in impactOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="issue-icon">Icon</label>
            <select
              id="issue-icon"
              v-model="newIssue.icon"
            >
              <option 
                v-for="option in iconOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }} {{ option.value }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="issue-location">Location</label>
            <input
              id="issue-location"
              v-model="newIssue.location"
              type="text"
              placeholder="Where is this issue occurring?"
            >
          </div>

          <div class="form-group">
            <label for="issue-image">Image (optional)</label>
            <input
              id="issue-image"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
            >
            <!-- Optional: Preview the uploaded image -->
            <div v-if="newIssue.imageUrl" class="image-preview">
              <img :src="newIssue.imageUrl" alt="Image preview" style="max-width: 200px; margin-top: 0.5rem;" />
            </div>
          </div>

          <div class="form-group full-width">
            <label for="issue-description">Description*</label>
            <textarea
              id="issue-description"
              v-model="newIssue.description"
              required
              rows="4"
              placeholder="Detailed description of the issue..."
            ></textarea>
          </div>

          <div class="form-group">
            <label for="issue-reporter">Your Name (optional)</label>
            <input
              id="issue-reporter"
              v-model="newIssue.reportedBy"
              type="text"
              placeholder="Anonymous"
            >
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">
            Submit Issue
          </button>
          <button 
            type="button" 
            @click="resetForm"
            class="btn btn-secondary"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  </div>
</section>

    <!-- Filter and Search Section -->
    <section class="section filter-section">
      <div class="container">
        <div class="filter-controls">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search issues..."
              class="search-input"
            >
            <span class="search-icon">🔍</span>
          </div>
          
          <div class="filter-group">
            <label for="category-filter">Filter by:</label>
            <select 
              id="category-filter" 
              v-model="filter"
              class="filter-select"
            >
              <option value="all">All Categories</option>
              <option 
                v-for="category in categories" 
                :key="category" 
                :value="category"
                v-if="category !== 'all'"
              >
                {{ category }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="sort-by">Sort by:</label>
            <select 
              id="sort-by" 
              v-model="sortBy"
              class="filter-select"
            >
              <option value="upvotes">Most Upvoted</option>
              <option value="recent">Most Recent</option>
              <option value="impact">Impact Level</option>
            </select>
          </div>
        </div>
        
        <div class="results-count">
          Showing {{ filteredIssues.length }} of {{ localIssues.length }} issues
        </div>
      </div>
    </section>
    
    <!-- Issues Grid -->
    <section class="section issues-section">
      <div class="container">
        <div v-if="filteredIssues.length === 0" class="no-results">
          <h3>No issues found matching your criteria</h3>
          <p>Try adjusting your search or filters</p>
        </div>
        
        <div v-else class="issues-grid">
          <IssueCard 
            v-for="issue in sortedIssues"
            :key="issue.id"
            :title="issue.title"
            :description="issue.description"
            :impact="issue.impact"
            :icon="issue.icon"
            :imageUrl="issue.imageUrl"
            :upvotes="issue.upvotes"
            :location="issue.location"
            :category="issue.category"
            :reportedDate="issue.reportedDate"
            :reportedBy="issue.reportedBy"
            @upvote="upvoteIssue(issue.id)"
          />
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
  background-color: #2563eb;
  color: white;
  padding: 4rem 0 2.5rem;
  text-align: center;
  background-image: url('https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
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

/* Filter Section Styles */
.filter-section {
  background-color: #f8fafc;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
}

.search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  color: #334155;
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  background-color: white;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: #2563eb;
}

.results-count {
  font-size: 0.875rem;
  color: #64748b;
}

/* Add Issue Form Styles */
.add-issue-section {
  background-color: #eff6ff;
  border-bottom: 1px solid #e2e8f0;
}

.add-issue-form {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 1000px;
  margin: 0 auto;
}

.add-issue-form h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #1e293b;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.full-width {
  grid-column: 1 / -1;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}



/* Issues Grid */
.issues-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
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

.no-results {
  text-align: center;
  padding: 3rem 0;
  color: #64748b;
}

.no-results h3 {
  margin-bottom: 0.5rem;
  color: #334155;
}

/* Community Input Section */
.community-input-section {
  background-color: #eff6ff;
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-header h2 {
  margin-bottom: 0.75rem;
  font-size: 1.75rem;
  color: #1e293b;
}

.section-header p {
  max-width: 700px;
  margin: 0 auto;
  color: #475569;
}

.cta-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    gap: 2rem;
  }
}

.cta-content {
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .cta-content {
    margin-bottom: 0;
  }
}

.cta-content h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: #1e293b;
}

.cta-content p {
  margin-bottom: 0;
  color: #64748b;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section {
  padding: 3rem 0;
}

.form-group input[type="file"] {
  padding: 0.5rem;
  font-size: 1rem;
}

.image-preview {
  margin-top: 0.5rem;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  border: 1px solid #cbd5e1;
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

.btn-outline {
  border-color: white;
  color: white;
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
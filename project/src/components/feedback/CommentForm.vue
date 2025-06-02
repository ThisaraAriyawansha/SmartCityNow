<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const formData = ref({
  author: '',
  content: ''
})

const formError = ref('')

const submitForm = () => {
  if (!formData.value.author.trim()) {
    formError.value = 'Please enter your name'
    return
  }
  
  if (!formData.value.content.trim()) {
    formError.value = 'Please enter your comment'
    return
  }
  
  emit('submit', { ...formData.value })
  
  // Reset form
  formData.value.author = ''
  formData.value.content = ''
  formError.value = ''
}
</script>

<template>
  <div class="comment-form-container">
    <h3>Share Your Thoughts</h3>
    
    <div v-if="formError" class="form-error">
      {{ formError }}
    </div>
    
    <div class="form-group">
      <label for="comment-author" class="form-label">Your Name</label>
      <input 
        type="text" 
        id="comment-author" 
        v-model="formData.author" 
        class="form-input" 
        placeholder="Enter your name"
      >
    </div>
    
    <div class="form-group">
      <label for="comment-content" class="form-label">Your Comment</label>
      <textarea 
        id="comment-content" 
        v-model="formData.content" 
        class="form-input form-textarea" 
        placeholder="Share your thoughts, questions, or feedback..."
      ></textarea>
    </div>
    
    <div class="form-actions">
      <button class="btn btn-primary" @click="submitForm">
        Post Comment
      </button>
    </div>
  </div>
</template>

<style scoped>
.comment-form-container {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  box-shadow: var(--shadow);
}

.comment-form-container h3 {
  margin-bottom: var(--space-4);
  color: var(--color-primary-700);
}

.form-error {
  background-color: var(--color-error-500);
  color: white;
  padding: var(--space-3);
  border-radius: var(--radius);
  margin-bottom: var(--space-4);
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

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
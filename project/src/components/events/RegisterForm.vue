<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const formData = ref({
  name: '',
  email: '',
  phone: '',
  attendees: 1
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const formError = ref('')

const validateForm = () => {
  if (!formData.value.name.trim()) {
    formError.value = 'Please enter your name'
    return false
  }
  
  if (!formData.value.email.trim()) {
    formError.value = 'Please enter your email'
    return false
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(formData.value.email)) {
    formError.value = 'Please enter a valid email address'
    return false
  }
  
  if (formData.value.attendees < 1) {
    formError.value = 'Number of attendees must be at least 1'
    return false
  }
  
  if (formData.value.attendees > props.event.remaining) {
    formError.value = `Only ${props.event.remaining} spots available`
    return false
  }
  
  formError.value = ''
  return true
}

const submitForm = () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  formError.value = ''
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
  }, 1000)
}
</script>

<template>
  <div class="registration-form">
    <div v-if="!isSubmitted">
      <div class="form-error" v-if="formError">{{ formError }}</div>
      
      <div class="form-group">
        <label for="name" class="form-label">Full Name</label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          class="form-input" 
          placeholder="Enter your name"
        >
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">Email Address</label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          class="form-input" 
          placeholder="Enter your email"
        >
      </div>
      
      <div class="form-group">
        <label for="phone" class="form-label">Phone Number (Optional)</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          class="form-input" 
          placeholder="Enter your phone number"
        >
      </div>
      
      <div class="form-group">
        <label for="attendees" class="form-label">Number of Attendees</label>
        <input 
          type="number" 
          id="attendees" 
          v-model="formData.attendees" 
          class="form-input" 
          min="1" 
          :max="event.remaining"
        >
        <p class="form-help">Maximum {{ event.remaining }} spots available</p>
      </div>
      
      <div class="form-actions">
        <button 
          class="btn btn-outline" 
          @click="emit('close')" 
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button 
          class="btn btn-primary" 
          @click="submitForm" 
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Registering...' : 'Register Now' }}
        </button>
      </div>
    </div>
    
    <div v-else class="success-message">
      <div class="success-icon">✓</div>
      <h3>Registration Successful!</h3>
      <p>
        Thank you for registering for {{ event.title }}. A confirmation email has been sent to {{ formData.email }} 
        with all the details you'll need.
      </p>
      <button class="btn btn-primary" @click="emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.registration-form {
  margin-top: var(--space-4);
}

.form-error {
  background-color: var(--color-error-500);
  color: white;
  padding: var(--space-3);
  border-radius: var(--radius);
  margin-bottom: var(--space-4);
  font-size: 0.9375rem;
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
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

.form-help {
  margin-top: var(--space-1);
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.success-message {
  text-align: center;
  padding: var(--space-4) 0;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: var(--color-success-500);
  color: white;
  border-radius: 50%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
}

.success-message h3 {
  margin-bottom: var(--space-3);
  color: var(--color-success-500);
}

.success-message p {
  margin-bottom: var(--space-6);
  color: var(--color-neutral-600);
}
</style>
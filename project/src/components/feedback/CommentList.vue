<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['reply', 'like'])

const replyForms = ref({})

const showReplyForm = (commentId) => {
  replyForms.value = {
    ...replyForms.value,
    [commentId]: !replyForms.value[commentId]
  }
}

const submitReply = (commentId, event) => {
  event.preventDefault()
  const form = event.target
  const author = form.author.value.trim()
  const content = form.content.value.trim()
  
  if (author && content) {
    emit('reply', commentId, { author, content })
    form.reset()
    replyForms.value[commentId] = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const likeComment = (commentId, isReply = false, parentId = null) => {
  emit('like', commentId, isReply, parentId)
}
</script>

<template>
  <div class="comment-list">
    <h3 v-if="comments.length === 0" class="empty-message">
      No comments yet. Be the first to share your thoughts!
    </h3>
    
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <div class="comment-header">
        <div class="comment-author">{{ comment.author }}</div>
        <div class="comment-date">{{ formatDate(comment.date) }}</div>
      </div>
      
      <div class="comment-content">
        {{ comment.content }}
      </div>
      
      <div class="comment-actions">
        <button class="action-btn like-btn" @click="likeComment(comment.id)">
          <span class="like-icon">👍</span> {{ comment.likes }}
        </button>
        <button class="action-btn reply-btn" @click="showReplyForm(comment.id)">
          Reply
        </button>
      </div>
      
      <!-- Reply Form -->
      <div v-if="replyForms[comment.id]" class="reply-form-container">
        <form class="reply-form" @submit="submitReply(comment.id, $event)">
          <div class="form-group">
            <label for="author" class="form-label">Your Name</label>
            <input 
              type="text" 
              name="author" 
              id="author" 
              class="form-input" 
              placeholder="Enter your name"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="content" class="form-label">Your Reply</label>
            <textarea 
              name="content" 
              id="content" 
              class="form-input form-textarea" 
              placeholder="Write your reply..."
              required
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-outline" @click="showReplyForm(comment.id)">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Post Reply
            </button>
          </div>
        </form>
      </div>
      
      <!-- Replies -->
      <div v-if="comment.replies && comment.replies.length > 0" class="replies">
        <div v-for="reply in comment.replies" :key="reply.id" class="reply">
          <div class="comment-header">
            <div class="comment-author">{{ reply.author }}</div>
            <div class="comment-date">{{ formatDate(reply.date) }}</div>
          </div>
          
          <div class="comment-content">
            {{ reply.content }}
          </div>
          
          <div class="comment-actions">
            <button class="action-btn like-btn" @click="likeComment(reply.id, true, comment.id)">
              <span class="like-icon">👍</span> {{ reply.likes }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-list {
  margin-top: var(--space-8);
}

.empty-message {
  text-align: center;
  color: var(--color-neutral-500);
  padding: var(--space-8) 0;
}

.comment {
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  box-shadow: var(--shadow);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.comment-author {
  font-weight: 600;
  color: var(--color-primary-700);
}

.comment-date {
  font-size: 0.875rem;
  color: var(--color-neutral-500);
}

.comment-content {
  margin-bottom: var(--space-4);
  color: var(--color-neutral-800);
}

.comment-actions {
  display: flex;
  gap: var(--space-4);
}

.action-btn {
  background: transparent;
  border: none;
  font-size: 0.875rem;
  color: var(--color-neutral-600);
  cursor: pointer;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.action-btn:hover {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-800);
}

.like-icon {
  font-size: 1rem;
}

.reply-form-container {
  margin: var(--space-4) 0;
  padding: var(--space-4);
  background-color: var(--color-neutral-50);
  border-radius: var(--radius);
}

.form-group {
  margin-bottom: var(--space-3);
}

.form-label {
  display: block;
  margin-bottom: var(--space-1);
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: var(--space-2);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius);
  font-size: 0.9375rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.replies {
  margin-top: var(--space-4);
  padding-left: var(--space-4);
  border-left: 2px solid var(--color-neutral-200);
}

.reply {
  background-color: var(--color-neutral-50);
  border-radius: var(--radius);
  padding: var(--space-4);
  margin-bottom: var(--space-3);
}

.reply:last-child {
  margin-bottom: 0;
}
</style>
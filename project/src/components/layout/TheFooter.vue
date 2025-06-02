<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3 class="footer-logo">SmartCityNow</h3>
          <p class="footer-tagline">
            Building sustainable urban futures through technology and community engagement.
          </p>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-group">
            <h4>Navigation</h4>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/local-issues">Local Issues</router-link></li>
              <li><router-link to="/solutions">Solutions</router-link></li>
              <li><router-link to="/community-events">Community Events</router-link></li>
              <li><router-link to="/feedback">Feedback</router-link></li>
            </ul>
          </div>
          
          <div class="footer-links-group">
            <h4>Connect</h4>
            <ul>
              <li><a href="#" target="_blank">Twitter</a></li>
              <li><a href="#" target="_blank">Facebook</a></li>
              <li><a href="#" target="_blank">Instagram</a></li>
              <li><a href="#" target="_blank">LinkedIn</a></li>
            </ul>
          </div>
          
          <div class="footer-links-group">
            <h4>Resources</h4>
            <ul>
              <li><a href="#" target="_blank">Smart City Guide</a></li>
              <li><a href="#" target="_blank">Research Papers</a></li>
              <li><a href="#" target="_blank">Sustainability Tips</a></li>
              <li><a href="#" target="_blank">Urban Planning</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} SmartCityNow. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-neutral-800);
  color: var(--color-neutral-100);
  padding: var(--space-12) 0 var(--space-6);
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 2fr;
  }
}

.footer-logo {
  font-size: 1.75rem;
  background: linear-gradient(90deg, var(--color-primary-400), var(--color-accent-400));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: var(--space-2);
}

.footer-tagline {
  color: var(--color-neutral-300);
  max-width: 300px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-6);
}

.footer-links-group h4 {
  color: white;
  margin-bottom: var(--space-4);
  font-size: 1.125rem;
}

.footer-links-group ul {
  list-style: none;
}

.footer-links-group li {
  margin-bottom: var(--space-2);
}

.footer-links-group a {
  color: var(--color-neutral-300);
  transition: color 0.2s ease;
}

.footer-links-group a:hover {
  color: var(--color-primary-400);
}

.footer-bottom {
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-neutral-700);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.footer-bottom p {
  color: var(--color-neutral-400);
  margin-bottom: 0;
}

.footer-legal {
  display: flex;
  gap: var(--space-4);
}

.footer-legal a {
  color: var(--color-neutral-400);
  font-size: 0.875rem;
}

.footer-legal a:hover {
  color: var(--color-neutral-200);
}
</style>
<template>
  <div ref="mapContainer" class="feedback-map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  feedbackItems: {
    type: Array as () => any[],
    required: true
  },
  interactive: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['marker-click'])
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
const markers = ref<L.Marker[]>([])

onMounted(() => {
  if (mapContainer.value) {
    // Initialize map centered on Sri Lanka
    map = L.map(mapContainer.value).setView([7.8731, 80.7718], 7)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    
    updateMarkers()
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

watch(() => props.feedbackItems, () => {
  updateMarkers()
})

const updateMarkers = () => {
  if (!map) return
  
  // Clear existing markers
  markers.value.forEach(marker => map?.removeLayer(marker))
  markers.value = []
  
  // Add new markers
  props.feedbackItems.forEach(feedback => {
    if (feedback.location) {
      const marker = L.marker([feedback.location.lat, feedback.location.lng], {
        title: feedback.title
      }).addTo(map!)
      
      if (props.interactive) {
        marker.on('click', () => {
          emit('marker-click', feedback)
        })
      }
      
      markers.value.push(marker)
    }
  })
}
</script>

<style scoped>
.feedback-map {
  height: 100%;
  width: 100%;
  min-height: 400px;
}
</style>
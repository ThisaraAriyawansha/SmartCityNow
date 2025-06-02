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
const initialCenter = [7.8731, 80.7718] as L.LatLngTuple // Sri Lanka center
const initialZoom = 7 // Initial zoom level

onMounted(() => {
  if (mapContainer.value) {
    // Initialize map centered on Sri Lanka
    map = L.map(mapContainer.value, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: props.interactive // Enable/disable zoom control based on interactivity
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    updateMarkers()

    // Optional: Listen to zoom events to stabilize center
    map.on('zoomend', () => {
      const currentCenter = map.getCenter()
      // If the center drifts too far, gently nudge it back
      if (
        Math.abs(currentCenter.lat - initialCenter[0]) > 0.5 ||
        Math.abs(currentCenter.lng - initialCenter[1]) > 0.5
      ) {
        map.flyTo(initialCenter, map.getZoom(), { animate: true, duration: 0.5 })
      }
    })
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

watch(() => props.feedbackItems, (newItems) => {
  updateMarkers()
}, { deep: true })

const updateMarkers = () => {
  if (!map) return

  // Clear existing markers
  markers.value.forEach(marker => map?.removeLayer(marker))
  markers.value = []

  // Add new markers with validation
  props.feedbackItems.forEach(feedback => {
    if (
      feedback.location &&
      typeof feedback.location.lat === 'number' &&
      typeof feedback.location.lng === 'number' &&
      !isNaN(feedback.location.lat) &&
      !isNaN(feedback.location.lng)
    ) {
      const marker = L.marker([feedback.location.lat, feedback.location.lng], {
        title: feedback.title
      }).addTo(map!)

      if (props.interactive) {
        marker.on('click', () => {
          emit('marker-click', feedback)
        })
      }

      markers.value.push(marker)
    } else {
      console.warn(`Invalid location data for feedback: ${feedback.title}`)
    }
  })

  // Ensure map stays centered after updating markers
  map.setView(initialCenter, map.getZoom())
}
</script>

<style scoped>
.feedback-map {
  height: 100%;
  width: 100%;
  min-height: 400px;
}
</style>
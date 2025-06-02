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
const maxDrift = 0.2 // More sensitive drift threshold (degrees)

// Custom debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

onMounted(() => {
  if (mapContainer.value) {
    map = L.map(mapContainer.value, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: props.interactive,
      zoomAnimation: true,
      fadeAnimation: true,
      minZoom: 5,
      maxZoom: 15
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    updateMarkers()

    const handleZoomEnd = debounce(() => {
      const currentCenter = map!.getCenter()
      const distance = Math.sqrt(
        Math.pow(currentCenter.lat - initialCenter[0], 2) +
        Math.pow(currentCenter.lng - initialCenter[1], 2)
      )

      if (distance > maxDrift) {
        map!.flyTo(initialCenter, map!.getZoom(), {
          animate: true,
          duration: 0.8
        })
      }
    }, 500)

    map.on('zoomend moveend', handleZoomEnd)
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

watch(
  () => props.feedbackItems,
  () => {
    updateMarkers()
  },
  { deep: true }
)

const updateMarkers = () => {
  if (!map) return

  markers.value.forEach(marker => map?.removeLayer(marker))
  markers.value = []

  const validMarkers: L.Marker[] = []
  props.feedbackItems.forEach(feedback => {
    if (
      feedback.location &&
      typeof feedback.location.lat === 'number' &&
      typeof feedback.location.lng === 'number' &&
      !isNaN(feedback.location.lat) &&
      !isNaN(feedback.location.lng)
    ) {
      const marker = L.marker([feedback.location.lat, feedback.location.lng], {
        title: feedback.title,
        icon: L.divIcon({
          className: 'custom-marker',
          html: `
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 8.837 12 20 12 20s12-11.163 12-20c0-6.627-5.373-12-12-12z" fill="#0000ff"/>
              <circle cx="12" cy="12" r="4" fill="#ffffff"/>
            </svg>
          `,
          iconSize: [24, 32],
          iconAnchor: [12, 32], // Anchor at the bottom of the pin
          popupAnchor: [0, -32] // Popup above the pin
        })
      }).addTo(map!)

      if (props.interactive) {
        marker.on('click', () => {
          emit('marker-click', feedback)
        })
      }

      validMarkers.push(marker)
    } else {
      console.warn(`Invalid location data for feedback: ${feedback.title}`)
    }
  })

  markers.value = validMarkers

  if (validMarkers.length > 0) {
    const group = L.featureGroup(validMarkers)
    map.fitBounds(group.getBounds().pad(0.15), {
      animate: true,
      duration: 0.5
    })
  } else {
    map.setView(initialCenter, initialZoom, { animate: true })
  }
}
</script>

<style scoped>
.feedback-map {
  height: 100%;
  width: 100%;
  min-height: 400px;
}

.custom-marker {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
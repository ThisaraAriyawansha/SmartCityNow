<template>
  <div class="location-picker">
    <div ref="mapContainer" class="map-container"></div>
    <div class="picker-actions">
      <button class="btn btn-outline" @click="$emit('cancel')">
        Cancel
      </button>
      <button 
        class="btn btn-primary" 
        @click="confirmSelection"
        :disabled="!selectedLocation"
      >
        Confirm Location
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let marker: L.Marker | null = null
const selectedLocation = ref<{lat: number, lng: number} | null>(null)

onMounted(() => {
  if (mapContainer.value) {
    // Initialize map centered on Sri Lanka
    map = L.map(mapContainer.value).setView([7.8731, 80.7718], 8)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    
    // Add click handler
    map.on('click', (e: L.LeafletMouseEvent) => {
      selectedLocation.value = { lat: e.latlng.lat, lng: e.latlng.lng }
      updateMarker()
    })
  }
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

const updateMarker = () => {
  if (!map || !selectedLocation.value) return

  // Remove existing marker
  if (marker) {
    map.removeLayer(marker)
  }

  // Add new marker
  marker = L.marker(
    [selectedLocation.value.lat, selectedLocation.value.lng],
    { draggable: true }
  ).addTo(map)

  // Update position if marker is dragged
  marker.on('dragend', (e: L.DragEndEvent) => {
    const newPos = e.target.getLatLng()
    selectedLocation.value = { lat: newPos.lat, lng: newPos.lng }
  })
}

const confirmSelection = () => {
  if (selectedLocation.value) {
    emit('location-selected', selectedLocation.value)
  }
}

const emit = defineEmits(['location-selected', 'cancel'])
</script>

<style scoped>
.location-picker {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.map-container {
  flex-grow: 1;
  min-height: 400px;
}

.picker-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px;
  border-top: 1px solid #eee;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
  border: none;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #ccc;
}
</style>
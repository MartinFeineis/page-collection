<script setup>
import { ref, onMounted } from 'vue';
import h3 from 'h3-js';

// API endpoint (adjust if needed)
const API_URL = '/api/loc';

// State variables
const currentH3 = ref(null); // The current H3 index
const cities = ref([]); // Stores city locations

// Function to get the current H3 index (mocked for now, replace with real logic)
const getCurrentH3Index = () => {
  // Example: Set a fixed H3 index for testing (replace with actual logic)
  return '882a1224b7fffff';
};

// Fetch cities within the H3 ring
const fetchCities = async () => {
  currentH3.value = getCurrentH3Index(); // Get the current H3 index

  if (!currentH3.value) {
    console.error("No H3 index available.");
    return;
  }

  // Get neighboring H3 indexes (ring size = 2)
  const ringSize = 2;
  const h3Indexes = h3.gridDisk(currentH3.value, ringSize);

  console.log("Sending H3 indexes to API:", h3Indexes);

  try {
    // Call the API
    const response = await fetch(`${API_URL}?h3indexes=${h3Indexes.join(',')}`);
    const data = await response.json();

    // Filter results to include only cities
    cities.value = data.locations.filter(loc => loc.city);

    console.log("Cities received:", cities.value);
  } catch (error) {
    console.error("Error fetching city data:", error);
  }
};

// Fetch cities when the component loads
onMounted(fetchCities);
</script>

<template>
  <div class="container">
    <h2>Nearby Cities</h2>
    <p v-if="!cities.length">No cities found in this area.</p>
    <ul v-else>
      <li v-for="city in cities" :key="city.h3index">
        {{ city.name }} ({{ city.h3index }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #007bff;
  color: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: center;
}
</style>

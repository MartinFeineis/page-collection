<template>
  <div>
    <h1>User Location</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="location">
      <p>Latitude: {{ location.latitude }}</p>
      <p>Longitude: {{ location.longitude }}</p>
      <p>H3 Index: {{ h3index }}</p>
      <p>Neighbors: {{ response }}</p>
    </div>
    <button @click="fetchLocation">Get Location</button>
    <button @click="fetchCities" :disabled="!h3index">Find Nearby Cities</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { latLngToCell, gridDisk } from "h3-js";

const API_URL = "/api/loc";

export default {
  name: "DisplayLocation",
  setup() {
    const location = ref(null);
    const error = ref(null);
    const h3index = ref(null);
    const response = ref(null); // Make response reactive

    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        error.value = "Geolocation is not supported by your browser.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          location.value = { latitude, longitude };
          h3index.value = latLngToCell(latitude, longitude, 8); // Calculate H3 index
          error.value = null;
        },
        (err) => {
          error.value = `Unable to retrieve location: ${err.message}`;
        }
      );
    };

    const fetchCities = async () => {
      if (!h3index.value) {
        console.error("No H3 index available.");
        return;
      }

      // Get neighboring H3 indexes (ring size = 2)
      const ringSize = 2;
      const h3Indexes = gridDisk(h3index.value, ringSize);

      console.log("Sending H3 indexes to API:", h3Indexes);

      try {
        const res = await fetch(`${API_URL}?h3indexes=${h3Indexes.join(",")}`);
        const data = await res.json();

        // Store API response
        response.value = data.locations.filter((loc) => loc.city);

        console.log("Cities received:", response.value);
      } catch (err) {
        console.error("Error fetching city data:", err);
      }
    };

    return {
      location,
      error,
      fetchLocation,
      h3index,
      response,
      fetchCities, // Include fetchCities in return
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>

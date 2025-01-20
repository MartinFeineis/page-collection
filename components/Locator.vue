<template>
  <div>
    <h1>User Location</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="h3Index">
      <p>H3 Index: {{ h3Index }}</p>
    </div>
    <button @click="fetchLocation">Get Location</button>
  </div>
</template>

<script>
import { ref } from "vue";
import * as h3 from "h3-js"; // Correct import for h3-js

export default {
  name: "DisplayLocation",
  setup() {
    const location = ref(null);
    const error = ref(null);
    const h3Index = ref(null);
    const H3_RESOLUTION = 8;

    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        error.value = "Geolocation is not supported by your browser.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          location.value = { latitude, longitude };
          h3Index.value = h3.latLngToCell(latitude, longitude, H3_RESOLUTION); // Use correct path
          error.value = null;
        },
        (err) => {
          error.value = `Unable to retrieve location: ${err.message}`;
        }
      );
    };

    return {
      location,
      error,
      fetchLocation,
      h3Index,
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

<template>
  <div>
    <h1>User Location</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="location">
      <p>Latitude: {{ location.latitude }}</p>
      <p>Longitude: {{ location.longitude }}</p>
      <p>H3 Index: {{ h3index }}</p>
    </div>
    <button @click="fetchLocation">Get Location</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { latLngToCell } from "h3-js";

export default {
  name: "DisplayLocation",
  setup() {
    const location = ref(null);
    const error = ref(null);
    const h3index = ref(null); // Make it reactive

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

    return {
      location,
      error,
      fetchLocation,
      h3index,
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
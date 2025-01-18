<template>
  <div>
    <h4>Locator</h4>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="location">
      <p>Latitude: {{ location.latitude }}, Longitude: {{ location.longitude }}</p>
    </div>
  </div>
</template>

<script>
import { useLocation } from "@/composables/useLocation";

export default {
  setup() {
    const { location, error } = useLocation();

    return {
      location,
      error,
    };
  },
};
</script>

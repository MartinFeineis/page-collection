<template>
    <div>
      <h1>Send Location to API</h1>
      <div v-if="error">{{ error }}</div>
      <div v-else-if="location">
        <p>Location sent successfully: Latitude {{ location.latitude }}, Longitude {{ location.longitude }}</p>
      </div>
      <button @click="sendLocation">Send Location</button>
    </div>
</template>
  
  <script>
  import { useLocation } from "@/composables/useLocation";
  
  export default {
    setup() {
      const { location, error, sendLocationToBackend } = useLocation();
  
      const sendLocation = async () => {
        try {
          await sendLocationToBackend("https://your-backend-api.com/location");
        } catch (err) {
          console.error(err);
        }
      };
  
      return {
        location,
        error,
        sendLocation,
      };
    },
  };
  </script>
  
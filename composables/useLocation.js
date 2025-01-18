import { ref } from "vue";

export function useLocation() {
  const location = ref(null);
  const error = ref(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        error.value = "Geolocation is not supported by your browser.";
        reject(error.value);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          location.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          error.value = null;
          resolve(location.value);
        },
        (err) => {
          error.value = `Unable to retrieve location: ${err.message}`;
          reject(error.value);
        }
      );
    });
  };

  return {
    location,
    error,
    getLocation,
  };
}
// /composables/useCurrentDatetime.js
import { ref } from 'vue';

// Composable function to return current datetime
export function useCurrentDatetime() {
  const currentDatetime = ref('');

  // Function to update the current datetime
  const updateDatetime = () => {
    currentDatetime.value = new Date().toLocaleString(); // Get current date and time as string
  };

  // Call the function immediately to set the initial datetime
  updateDatetime();

  // Return the reactive datetime and a function to update it
  return {
    currentDatetime,
    updateDatetime,
  };
}

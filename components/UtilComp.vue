<template>
    <div>
      <p>Current Datetime: {{ currentDatetime }}</p>
      <button @click="updateDatetime">Refresh Datetime</button>
    </div>
  </template>
  
  <script>
  import { useCurrentDatetime } from '@/composables/useCurrentDatetime.js';
  
  export default {
    setup() {
      // Use the composable to get current datetime and the update function
      const { currentDatetime, updateDatetime } = useCurrentDatetime();
  
      return {
        currentDatetime,
        updateDatetime,
      };
    },
  };
  </script>
  
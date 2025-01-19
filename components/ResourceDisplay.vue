<template>
    <div>
      <h1>Resources</h1>
      <button @click="fetchResources" :disabled="loading">
        {{ loading ? "Loading..." : "Get Random Resources" }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="resources.length > 0">
        <h2>Fetched Resources:</h2>
        <ul>
          <li v-for="resource in resources" :key="resource.resource_id">
            <strong>Type:</strong> {{ resource.resource_type }} | 
            <strong>Amount:</strong> {{ resource.resource_amount }}
          </li>
        </ul>
      </div>
      <div v-else-if="!loading && !error">
        <p>No resources to display. Click the button to fetch!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // State variables
  const resources = ref([]);
  const loading = ref(false);
  const error = ref("");
  
  // Fetch resources from the API
  const fetchResources = async () => {
    loading.value = true;
    error.value = "";
  
    try {
      const response = await fetch("/api/findresources");
      if (!response.ok) {
        throw new Error("Failed to fetch resources.");
      }
  
      const data = await response.json();
      console.log(data)
      resources.value = data.data; // Populate resources from the API response
    } catch (err) {
      error.value = err.message || "An unknown error occurred.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .error {
    color: red;
    margin-top: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  </style>
  
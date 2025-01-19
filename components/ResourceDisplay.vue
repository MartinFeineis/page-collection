<template>
    <div>
      <h1>Resources</h1>
      <button @click="fetchResources" :disabled="loading">
        {{ loading ? "Loading..." : "Get Random Resources" }}
      </button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="resources.length > 0">
        <h2>Fetched Resources:</h2>
        <table>
          <thead>
            <tr>
              <th>Resource Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in resources" :key="resource.resource_id">
              <td>{{ resource.resource_type }}</td>
              <td>{{ resource.resource_amount }}</td>
              <td><button @click="gatherResource(resource)">Gather</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else-if="!loading && !error">
        <p>No resources to display. Click the button to fetch!</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
import { useSupabaseUser } from '#imports'
  
  // State variables
  const resources = ref([]);
  const loading = ref(false);
  const error = ref("");
  const user = useSupabaseUser()
  
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
      console.log(data);
      resources.value = data.data; // Populate resources from the API response
    } catch (err) {
      error.value = err.message || "An unknown error occurred.";
    } finally {
      loading.value = false;
    }
  };
  
  const gatherResource = async (resource) => {
  const userId = user.value.id // Get user ID from Supabase auth

  if (!userId) {
    alert('You must be logged in to gather resources.')
    return
  }

  try {
    const response = await fetch('/api/updateInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resourceType: resource.resource_type,
        resourceAmount: resource.resource_amount,
        userId,
      }),
    })

    const data = await response.json()
    if (response.ok) {
      alert(`Successfully gathered ${resource.resource_amount} of ${resource.resource_type}.`)
    } else {
      alert(`Failed to gather resource: ${data.message}`)
    }
  } catch (error) {
    alert('An unexpected error occurred while gathering resource.')
  }
}


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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  td button {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  td button:hover {
    background-color: #218838;
  }
  </style>
  
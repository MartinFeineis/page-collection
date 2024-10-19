<template>
  <div>
    <h1>Directory Info Table</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else class="directory-table">
      <thead>
        <tr>
          <th>Directory Name</th>
          <th>Path</th>
          <th>Hidden</th>
          <th>System</th>
          <th>Last Indexed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in directoryInfo" :key="entry.id">
          <td>{{ entry.directory_name }}</td>
          <td>{{ entry.path }}</td>
          <td v-if="entry.hidden" class="hidden-tag">Yes</td>
          <td v-else>No</td>
          <td v-if="entry.system_status" class="system-tag">Yes</td>
          <td v-else>No</td>
          <td v-if="entry.last_time_indexed">{{ new Date(entry.last_time_indexed).toLocaleString() }}</td>
          <td v-else>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Import composables
import { ref, onMounted } from 'vue';

// Reactive variables for directory info, loading status, and error messages
const directoryInfo = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch data from the server-side API on component mount
onMounted(async () => {
  try {
    const response = await fetch('/api/dirinfo');  // Updated API route here
    if (response.ok) {
      directoryInfo.value = await response.json();
    } else {
      throw new Error('Failed to fetch directory information.');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.directory-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.directory-table th, .directory-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.directory-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.directory-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.hidden-tag {
  color: red;
  font-weight: bold;
}

.system-tag {
  color: blue;
  font-weight: bold;
}
</style>

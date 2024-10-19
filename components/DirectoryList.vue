<template>
  <div>
    <h1>Directory Info Table</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else class="directory-table">
      <thead>
        <tr>
          <th @click="sortBy('directory_name')">Directory Name</th>
          <th @click="sortBy('path')">Path</th>
          <th @click="sortBy('hidden')">Hidden</th>
          <th @click="sortBy('system_status')">System</th>
          <th @click="sortBy('last_time_indexed')">Last Indexed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in sortedDirectoryInfo" :key="entry.id">
          <td>{{ entry.directory_name }}</td>
          <td>{{ entry.path }}</td>
          <td>{{ entry.hidden ? 'Yes' : 'No' }}</td>
          <td>{{ entry.system_status ? 'Yes' : 'No' }}</td>
          <td v-if="entry.last_time_indexed">{{ new Date(entry.last_time_indexed).toLocaleString() }}</td>
          <td v-else>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Import composables
import { ref, computed, onMounted } from 'vue';

// Reactive variables for directory info, loading status, and error messages
const directoryInfo = ref([]);
const loading = ref(true);
const error = ref(null);

// Sort state
const currentSortColumn = ref('directory_name'); // Default sort column
const currentSortDirection = ref('asc'); // Default sort direction

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

// Computed property to sort the directoryInfo based on the current sort column and direction
const sortedDirectoryInfo = computed(() => {
  const sortedData = [...directoryInfo.value];

  sortedData.sort((a, b) => {
    let modifier = currentSortDirection.value === 'asc' ? 1 : -1;
    
    // Handle sorting for different column types
    if (currentSortColumn.value === 'last_time_indexed') {
      // Special case for date sorting
      const dateA = new Date(a[currentSortColumn.value] || 0);
      const dateB = new Date(b[currentSortColumn.value] || 0);
      return (dateA - dateB) * modifier;
    } else if (typeof a[currentSortColumn.value] === 'boolean') {
      // Special case for boolean sorting (convert to 0/1 for sorting)
      return (a[currentSortColumn.value] === b[currentSortColumn.value] ? 0 : a[currentSortColumn.value] ? 1 : -1) * modifier;
    } else {
      // Default string/number sorting
      const valueA = a[currentSortColumn.value]?.toString().toLowerCase();
      const valueB = b[currentSortColumn.value]?.toString().toLowerCase();
      if (valueA < valueB) return -1 * modifier;
      if (valueA > valueB) return 1 * modifier;
      return 0;
    }
  });

  return sortedData;
});

// Function to handle sorting when a column header is clicked
const sortBy = (column) => {
  if (currentSortColumn.value === column) {
    // Toggle the sort direction if the same column is clicked
    currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    // Sort by the new column in ascending order
    currentSortColumn.value = column;
    currentSortDirection.value = 'asc';
  }
};
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
  cursor: pointer;
}

.directory-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.directory-table th:hover {
  background-color: #e0e0e0;
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

<template>
  <div>
    <h1>File Info Table</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <table v-else class="file-table">
      <thead>
        <tr>
          <th @click="sortBy('filename')">File Name</th>
          <th @click="sortBy('file_extension')">Extension</th>
          <th @click="sortBy('path')">Path</th>
          <th @click="sortBy('hidden')">Hidden</th>
          <th @click="sortBy('system_status')">System</th>
          <th @click="sortBy('last_time_modified')">Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in sortedFileInfo" :key="entry.id">
          <td>{{ entry.filename }}</td>
          <td>{{ entry.file_extension || 'N/A' }}</td>
          <td>{{ entry.directory_path }}</td>
          <td>{{ entry.hidden ? 'Yes' : 'No' }}</td>
          <td>{{ entry.system_status ? 'Yes' : 'No' }}</td>
          <td v-if="entry.last_time_modified">{{ new Date(entry.last_time_modified).toLocaleString() }}</td>
          <td v-else>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Import composables
import { ref, computed, onMounted } from 'vue';

// Reactive variables for file info, loading status, and error messages
const fileInfo = ref([]);
const loading = ref(true);
const error = ref(null);

// Sort state
const currentSortColumn = ref('filename'); // Default sort column
const currentSortDirection = ref('asc'); // Default sort direction

// Fetch data from the server-side API on component mount
onMounted(async () => {
  try {
    const response = await fetch('/api/fileinfo');  // Updated API route here
    if (response.ok) {
      fileInfo.value = await response.json();
    } else {
      throw new Error('Failed to fetch file information.');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

// Computed property to sort the fileInfo based on the current sort column and direction
const sortedFileInfo = computed(() => {
  const sortedData = [...fileInfo.value];

  sortedData.sort((a, b) => {
    let modifier = currentSortDirection.value === 'asc' ? 1 : -1;

    // Handle sorting for different column types
    if (currentSortColumn.value === 'last_time_modified') {
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

.file-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.file-table th, .file-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

.file-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.file-table th:hover {
  background-color: #e0e0e0;
}

.file-table tr:nth-child(even) {
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

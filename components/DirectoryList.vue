<template>
  <div>
    <h1>Directory Info Table</h1>

    <!-- Dropdown to select number of entries per page -->
    <div class="entries-control">
      <label for="entries">Show entries:</label>
      <select id="entries" v-model="pagination.limit" @change="onLimitChange">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>

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

    <!-- Pagination Controls -->
    <div v-if="pagination.totalPages > 1" class="pagination">
      <button @click="prevPage" :disabled="pagination.currentPage === 1">Previous</button>
      <span>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
      <button @click="nextPage" :disabled="pagination.currentPage === pagination.totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Initialize pagination object with default values to prevent undefined errors
const pagination = ref({
  total: 0,
  totalPages: 1,  // Default to at least 1 page
  currentPage: 1, // Default to page 1
  limit: 10,      // Default to showing 10 entries per page
});

// Other reactive variables
const directoryInfo = ref([]);
const loading = ref(true);
const error = ref(null);

// Sort state
const currentSortColumn = ref('directory_name');
const currentSortDirection = ref('asc');

// Fetch data from the API
const fetchData = async () => {
  try {
    loading.value = true;
    const response = await fetch(`/api/dirinfo?limit=${pagination.value.limit}&page=${pagination.value.currentPage}`);
    if (response.ok) {
      const data = await response.json();
      directoryInfo.value = data.directories;
      pagination.value.total = data.pagination.total || 0;
      pagination.value.totalPages = data.pagination.totalPages || 1;
      pagination.value.currentPage = data.pagination.currentPage || 1;
    } else {
      throw new Error('Failed to fetch directory information.');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Fetch data on component mount
onMounted(fetchData);

// Watch for changes in pagination limit and page, and refetch data when they change
watch(() => pagination.value.limit, fetchData);
watch(() => pagination.value.currentPage, fetchData);

// Sorting functionality
const sortedDirectoryInfo = computed(() => {
  const sortedData = [...directoryInfo.value];
  let modifier = currentSortDirection.value === 'asc' ? 1 : -1;

  sortedData.sort((a, b) => {
    if (currentSortColumn.value === 'last_time_indexed') {
      const dateA = new Date(a[currentSortColumn.value] || 0);
      const dateB = new Date(b[currentSortColumn.value] || 0);
      return (dateA - dateB) * modifier;
    } else if (typeof a[currentSortColumn.value] === 'boolean') {
      return (a[currentSortColumn.value] === b[currentSortColumn.value] ? 0 : a[currentSortColumn.value] ? 1 : -1) * modifier;
    } else {
      const valueA = a[currentSortColumn.value]?.toString().toLowerCase();
      const valueB = b[currentSortColumn.value]?.toString().toLowerCase();
      if (valueA < valueB) return -1 * modifier;
      if (valueA > valueB) return 1 * modifier;
      return 0;
    }
  });

  return sortedData;
});

const sortBy = (column) => {
  if (currentSortColumn.value === column) {
    currentSortDirection.value = currentSortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn.value = column;
    currentSortDirection.value = 'asc';
  }
};

// Function to handle when the limit changes (dropdown value)
const onLimitChange = () => {
  pagination.value.currentPage = 1; // Reset to the first page when the limit changes
  fetchData(); // Refetch the data with the new limit
};

// Pagination control handlers
const nextPage = () => {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    pagination.value.currentPage++;
    fetchData();
  }
};

const prevPage = () => {
  if (pagination.value.currentPage > 1) {
    pagination.value.currentPage--;
    fetchData();
  }
};
</script>

<style scoped>
/* Same styling as before */
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

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 10px;
}

.entries-control {
  margin-bottom: 10px;
}

.entries-control select {
  margin-left: 10px;
  padding: 5px;
}
</style>

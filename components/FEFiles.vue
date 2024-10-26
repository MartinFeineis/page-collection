<template>
    <div>
      <h2>File Search by Extension</h2>
  
      <!-- Input for file extension search -->
      <input
        v-model="extension"
        @input="fetchFiles"
        placeholder="Enter file extension"
      />
  
      <!-- Dropdown for selecting number of entries per page -->
      <label for="entries">Entries per page:</label>
      <select id="entries" v-model="limit" @change="fetchFiles">
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="500">500</option>
      </select>
  
      <table v-if="files.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Filename</th>
            <th>Extension</th>
            <th>Date Created</th>
            <th>Last Modified</th>
            <th>Hidden</th>
            <th>System Status</th>
            <th>Directory Path</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.id">
            <td>{{ file.id }}</td>
            <td>{{ file.filename }}</td>
            <td>{{ file.file_extension }}</td>
            <td>{{ file.date_created }}</td>
            <td>{{ file.last_time_modified }}</td>
            <td>{{ file.hidden ? 'Yes' : 'No' }}</td>
            <td>{{ file.system_status }}</td>
            <td>{{ file.directory_path }}</td>
          </tr>
        </tbody>
      </table>
  
      <p v-else>No files found with the specified extension.</p>
  
      <!-- Pagination Controls -->
      <div v-if="total > limit" class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        extension: '',
        files: [],
        page: 1,
        limit: 20, // Default to 20 entries per page
        total: 0,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.total / this.limit);
      },
    },
    methods: {
      async fetchFiles() {
        if (this.extension.trim() === '') {
          this.files = [];
          return;
        }
  
        try {
          const response = await fetch(`/api/fesearch?extension=${this.extension}&page=${this.page}&limit=${this.limit}`);
          if (!response.ok) throw new Error('Failed to fetch files');
          const data = await response.json();
          this.files = data.files || [];
          this.total = data.total || 0;
        } catch (error) {
          console.error(error);
          this.files = [];
        }
      },
      nextPage() {
        if (this.page < this.totalPages) {
          this.page++;
          this.fetchFiles();
        }
      },
      prevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchFiles();
        }
      },
    },
    watch: {
      extension() {
        this.page = 1; // Reset to the first page when the extension changes
        this.fetchFiles();
      },
      limit() {
        this.page = 1; // Reset to the first page when limit changes
        this.fetchFiles();
      },
    },
    mounted() {
      this.fetchFiles();
    },
  };
  </script>
  
  <style scoped>
  /* Basic styling */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid #ddd;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    width: 200px;
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  select {
    margin-left: 10px;
    padding: 5px;
  }
  </style>
  
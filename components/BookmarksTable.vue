<template>
  <div class="tableWrap">
    <table class="tbl">
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Folder</th>
          <th>Device</th>
          <th v-if="showCreatedAt">Created</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loading">
          <td :colspan="showCreatedAt ? 5 : 4" class="muted">Loading…</td>
        </tr>

        <tr v-else-if="error">
          <td :colspan="showCreatedAt ? 5 : 4" class="error">
            {{ error }}
          </td>
        </tr>

        <tr v-else-if="bookmarks.length === 0">
          <td :colspan="showCreatedAt ? 5 : 4" class="muted">No bookmarks found.</td>
        </tr>

        <tr v-else v-for="b in bookmarks" :key="b.id">
          <td class="title">{{ b.title }}</td>
          <td class="url">
            <a :href="b.address" target="_blank" rel="noopener noreferrer">
              {{ b.address }}
            </a>
          </td>
          <td>{{ b.folder }}</td>
          <td>{{ b.device_name }}</td>
          <td v-if="showCreatedAt">{{ formatDate(b.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export interface Bookmark {
  id: number
  title: string
  address: string
  folder: string
  device_name: string
  created_at: string
}

defineProps<{
  bookmarks: Bookmark[]
  loading: boolean
  error?: string
  showCreatedAt?: boolean
}>()

function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}
</script>

<style scoped>
.tableWrap {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th, td {
  padding: 10px 12px;
  border-bottom: 1px solid #eef2f7;
  vertical-align: top;
}
th {
  text-align: left;
  background: #fafafa;
  font-weight: 600;
}
.title {
  max-width: 320px;
  word-break: break-word;
}
.url a {
  word-break: break-all;
  text-decoration: underline;
}
.muted {
  color: #6b7280;
}
.error {
  color: #b91c1c;
}
</style>

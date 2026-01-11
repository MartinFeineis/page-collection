<template>
  <div class="page">
    <header class="header">
      <h1>Bookmarks</h1>

      <div class="controls">
        <input
          v-model="q"
          class="input"
          type="search"
          placeholder="Search title or URL…"
        />

        <select v-model="device" class="select">
          <option value="">All devices</option>
          <option v-for="d in meta.devices" :key="d" :value="d">
            {{ d }}
          </option>
        </select>

        <select v-model="folder" class="select">
          <option value="">All folders</option>
          <option v-for="f in meta.folders" :key="f" :value="f">
            {{ f }}
          </option>
        </select>

        <select v-model="sort" class="select">
          <option value="created_at">Newest</option>
          <option value="title">Title</option>
        </select>

        <select v-model="dir" class="select" :disabled="sort === 'created_at'">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      <div class="meta">
        <span class="pill">Total: {{ meta.total }}</span>
        <button class="btn" @click="reset">Reset</button>
      </div>
    </header>

    <BookmarksTable
      :bookmarks="meta.items"
      :loading="pending"
      :error="errorText"
      :showCreatedAt="true"
    />

    <footer class="footer">
      <button class="btn" :disabled="meta.offset <= 0 || pending" @click="prevPage">Prev</button>
      <span class="pill">Page {{ page }}</span>
      <button
        class="btn"
        :disabled="meta.offset + meta.limit >= meta.total || pending"
        @click="nextPage"
      >
        Next
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Bookmark } from '~/components/BookmarksTable.vue'

type SortKey = 'created_at' | 'title'
type SortDir = 'asc' | 'desc'

const q = ref('')
const device = ref('')
const folder = ref('')
const sort = ref<SortKey>('created_at')
const dir = ref<SortDir>('desc')

const limit = ref(50)
const offset = ref(0)

const query = computed(() => ({
  q: q.value || undefined,
  device: device.value || undefined,
  folder: folder.value || undefined,
  sort: sort.value,
  dir: sort.value === 'created_at' ? 'desc' : dir.value,
  limit: limit.value,
  offset: offset.value,
}))

const { data, pending, error, refresh } = await useFetch('/api/bookmarks', {
  query,
  watch: [query],
})

const meta = computed(() => {
  return (
    data.value ?? {
      items: [] as Bookmark[],
      total: 0,
      folders: [] as string[],
      devices: [] as string[],
      limit: limit.value,
      offset: offset.value,
    }
  )
})

const errorText = computed(() => (error.value ? String(error.value) : undefined))

const page = computed(() => Math.floor((meta.value.offset ?? 0) / (meta.value.limit ?? 50)) + 1)

function reset() {
  q.value = ''
  device.value = ''
  folder.value = ''
  sort.value = 'created_at'
  dir.value = 'desc'
  offset.value = 0
  refresh()
}

function nextPage() {
  offset.value = Math.min(meta.value.total, offset.value + limit.value)
}

function prevPage() {
  offset.value = Math.max(0, offset.value - limit.value)
}

watch([q, device, folder, sort, dir], () => {
  offset.value = 0
})
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 16px;
}
.header {
  display: grid;
  gap: 12px;
  margin-bottom: 12px;
}
.controls {
  display: grid;
  grid-template-columns: 1fr repeat(4, minmax(140px, 200px));
  gap: 10px;
}
@media (max-width: 900px) {
  .controls {
    grid-template-columns: 1fr 1fr;
  }
}
.input, .select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.meta {
  display: flex;
  gap: 10px;
  align-items: center;
}
.pill {
  display: inline-flex;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  font-size: 13px;
}
.btn {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
}
</style>
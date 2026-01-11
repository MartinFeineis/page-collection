import { usePostgres } from '../utils/postgres'

type SortKey = 'created_at' | 'title'
type SortDir = 'asc' | 'desc'

interface BookmarkRow {
  id: number
  title: string
  address: string
  folder: string
  device_name: string
  created_at: string
}

function toInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'string' ? Number.parseInt(value, 10) : Number.NaN
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

function normalizeSort(value: unknown): SortKey {
  return value === 'title' ? 'title' : 'created_at'
}

function normalizeDir(value: unknown): SortDir {
  return value === 'asc' ? 'asc' : 'desc'
}

export default defineEventHandler(async (event) => {
  const sql = usePostgres()
  const q = (getQuery(event).q as string | undefined)?.trim() || ''
  const folder = (getQuery(event).folder as string | undefined)?.trim() || ''
  const device = (getQuery(event).device as string | undefined)?.trim() || ''
  const sort = normalizeSort(getQuery(event).sort)
  const dir = normalizeDir(getQuery(event).dir)

  const limit = toInt(getQuery(event).limit, 50, 1, 200)
  const offset = toInt(getQuery(event).offset, 0, 0, 1_000_000)

  const whereParts: any[] = []
  if (q) {
    const like = `%${q}%`
    whereParts.push(sql`(title ILIKE ${like} OR address ILIKE ${like})`)
  }
  if (folder) whereParts.push(sql`folder = ${folder}`)
  if (device) whereParts.push(sql`device_name = ${device}`)

  const whereSql =
    whereParts.length > 0 ? sql`WHERE ${sql.join(whereParts, sql` AND `)}` : sql``

  const orderCol = sort === 'title' ? sql`title` : sql`created_at`
  const orderDir = dir === 'asc' ? sql`ASC` : sql`DESC`

  const items = await sql<BookmarkRow[]>`
    SELECT id, title, address, folder, device_name, created_at
    FROM public.mybookmarks
    ${whereSql}
    ORDER BY ${orderCol} ${orderDir}, id DESC
    LIMIT ${limit} OFFSET ${offset}
  `

  const totalRows = await sql<{ total: number }[]>`
    SELECT COUNT(*)::int AS total
    FROM public.mybookmarks
    ${whereSql}
  `
  const total = totalRows[0]?.total ?? 0

  const folders = await sql<{ folder: string }[]>`
    SELECT DISTINCT folder
    FROM public.mybookmarks
    ORDER BY folder ASC
  `

  const devices = await sql<{ device_name: string }[]>`
    SELECT DISTINCT device_name
    FROM public.mybookmarks
    ORDER BY device_name ASC
  `

  return {
    items,
    total,
    folders: folders.map((r) => r.folder),
    devices: devices.map((r) => r.device_name),
    limit,
    offset,
  }
})
import { usePostgres } from '../utils/postgres'

export default defineEventHandler(async (event) => {
  const sql = usePostgres()
  const query = getQuery(event)
  const name = query.name as string || ''
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const offset = (page - 1) * limit

  try {
    // SQL query to search files by name with pagination
    const files = await sql`
      SELECT 
        f.id,
        f.filename,
        f.file_extension,
        f.date_created,
        f.last_time_modified,
        f.hidden,
        f.system_status,
        d.path AS directory_path
      FROM file_info f
      JOIN directory_info d ON f.directory_id = d.id
      WHERE f.filename ILIKE ${'%' + name + '%'}
      LIMIT ${limit} OFFSET ${offset}
    `

    // Get total count of files matching the name filter
    const [{ count }] = await sql`
      SELECT COUNT(*) AS count
      FROM file_info
      WHERE filename ILIKE ${'%' + name + '%'}
    `

    // Close the database connection
    event.waitUntil(sql.end())

    return {
      files,
      total: count,
      page,
      limit,
    }
  } catch (error) {
    throw error
  }
})

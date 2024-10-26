import { usePostgres } from '../utils/postgres'

export default defineEventHandler(async (event) => {
  const sql = usePostgres()
  const query = getQuery(event)
  const name = query.name as string || ''

  try {
    // SQL query to search files by name using LIKE
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
      WHERE f.filename ILIKE ${'%' + name + '%'}  -- Case-insensitive search
    `

    // Close the database connection after the request is processed
    event.waitUntil(sql.end())

    return { files }
  } catch (error) {
    throw error
  }
})

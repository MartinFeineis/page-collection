import { usePostgres } from '../utils/postgres'

export default defineEventHandler(async (event) => {
  const sql = usePostgres()

  // Parse query parameters for pagination
  const query = getQuery(event)
  const limit = parseInt(query.limit as string) || 10  // Default limit: 10 items per page
  const page = parseInt(query.page as string) || 1     // Default page: 1

  const offset = (page - 1) * limit  // Calculate the offset for the SQL query

  try {
    // SQL query with LIMIT and OFFSET for pagination
    const directories = await sql`
      SELECT * FROM directory_info
      LIMIT ${limit}
      OFFSET ${offset}
    `

    // Get the total count of records (for calculating total pages)
    const totalRecords = await sql`
      SELECT COUNT(*) FROM directory_info
    `
    const total = totalRecords[0].count
    const totalPages = Math.ceil(total / limit)

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())

    return {
      directories,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    }
  } catch (error) {
    throw error
  }
})

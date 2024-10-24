export default eventHandler(async (event) => {
  const sql = usePostgres();

  // Parse query parameters for pagination
  const query = getQuery(event)
  const limit = parseInt(query.limit as string) || 10  // Default limit: 10 items per page
  const page = parseInt(query.page as string) || 1     // Default page: 1

  const offset = (page - 1) * limit  // Calculate the offset for the SQL query

  try {
    // SQL query with JOIN, LIMIT, and OFFSET for pagination
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
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    // Get the total count of records (for calculating total pages)
    const totalRecords = await sql`
      SELECT COUNT(*) FROM file_info
    `
    const total = totalRecords[0].count
    const totalPages = Math.ceil(total / limit)

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end());

    return {
      files,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    throw error;
  }
});

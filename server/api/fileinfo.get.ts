export default eventHandler(async (event) => {
  const sql = usePostgres();

  // SQL query to fetch file information along with the directory path using a JOIN
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
  `;

  // Ensure the database connection is closed after the request is processed
  event.waitUntil(sql.end());
  return files;
});


export default eventHandler(async (event) => {
  const sql = usePostgres()

  const products = await sql`SELECT * FROM directory_info`

  // Ensure the database connection is closed after the request is processed
  event.waitUntil(sql.end())
  return products
})

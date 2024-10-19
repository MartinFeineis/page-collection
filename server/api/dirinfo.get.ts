// export default eventHandler(async (event) => {
//   const sql = usePostgres()

//   const products = await sql`SELECT * FROM directory_info`

//   // Ensure the database connection is closed after the request is processed
//   event.waitUntil(sql.end())
//   return products
// })


import { usePostgres } from '../utils/postgres'

export default defineEventHandler(async (event) => {
  // Use the custom usePostgres utility to get the correct database connection
  const sql = usePostgres()

  const directories = await sql`SELECT * FROM directory_info`

  // Ensure the database connection is closed after the request is processed
  event.waitUntil(sql.end())
  return directories
})

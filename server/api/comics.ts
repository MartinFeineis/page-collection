import { createPool, sql } from '@vercel/postgres'

export default defineEventHandler(async () => {
  const db = createPool()
  try {
    const { rows: comics } = await db.query('SELECT * FROM sw_comics')
    return {
      comics: comics,
    }
  } catch (error) {
      throw error
  }
})
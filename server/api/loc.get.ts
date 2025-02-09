import { createPool, sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;
  const db = createPool()
  try {
    const { rows, fields } = await db.query('SELECT name FROM locations WHERE h3index = ${h3index}')
    return {
      'h3': h3index, 'cur': rows, 'fields': fields
    }
  } catch (error) {
      throw error
  }
});

import { sql } from '@vercel/postgres'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;
    const { rows, fields } = await sql`SELECT * FROM locations WHERE h3index = ${h3index}`
    return {
      'h3': h3index, 'cur': rows, 'fields': fields
    }
});

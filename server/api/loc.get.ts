import { sql } from '@vercel/postgres'
import { gridDiskDistances }from 'h3-js';

const ringSize = 3

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;
  const neighbors = gridDiskDistances(h3index, ringSize)

  const { rows, fields } = await sql`SELECT * FROM locations WHERE h3index = ${h3index}`
  return {
    'h3': h3index, 'cur': rows, 'neighbors': neighbors, 'fields': fields
  }
});

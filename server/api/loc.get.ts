import { sql } from '@vercel/postgres'
import { gridDiskDistances } from 'h3-js';

export default defineEventHandler(async (event) => {
  const ringSize = 3
  const query = getQuery(event);
  const h3index = query.h3index as string;
  const neighbors = gridDiskDistances(h3index, ringSize).flat();

  const { rows, fields } = await sql`SELECT * FROM locations WHERE h3index = ${h3index}`
  return {
    'h3': h3index, 'cur': rows //, 'neighbors': neighbors, 'fields': fields
  }
});

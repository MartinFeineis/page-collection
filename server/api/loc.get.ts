import { defineEventHandler, getQuery } from 'h3';
import { sql } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3indexesParam = query.h3indexes as string;

  if (!h3indexesParam) {
    return { error: "Missing h3indexes parameter" };
  }

  // Split the input into an array of H3 indexes
  const h3indexes = h3indexesParam.split(',').map(index => index.trim());

  if (h3indexes.length === 0) {
    return { error: "No valid H3 indexes provided" };
  }

  try {
    // Query multiple H3 indexes using WHERE IN
    const { rows } = await sql`
      SELECT * FROM locations WHERE h3index = ANY(${h3indexes})
    `;

    return { locations: rows };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Internal server error" };
  }
});

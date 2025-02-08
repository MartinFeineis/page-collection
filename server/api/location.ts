import { defineEventHandler, getQuery } from 'h3';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in your environment variables
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;

  if (!h3index) {
    return { error: 'Missing h3index parameter' };
  }

  try {
    // Fetch the current location
    const currentQuery = `
      SELECT name FROM locations WHERE h3index = $1
    `;
    const currentResult = await pool.query(currentQuery, [h3index]);

    if (currentResult.rowCount === 0) {
      return { error: 'Location not found' };
    }

    const currentLocation = currentResult.rows[0].name;

    // Fetch the next nearest city
    const cityQuery = `
      SELECT name FROM locations WHERE city = true 
      ORDER BY h3index <-> $1 LIMIT 1
    `;
    const cityResult = await pool.query(cityQuery, [h3index]);

    const nextCity = cityResult.rowCount > 0 ? cityResult.rows[0].name : null;

    return {
      currentLocation,
      nextCity,
    };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Database error' };
  }
});

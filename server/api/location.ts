import { defineEventHandler, getQuery } from 'h3';
import { createPool, sql } from '@vercel/postgres';
import h3 from 'h3-js';

const pool = createPool();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;

  if (!h3index) {
    return { error: 'Missing h3index parameter' };
  }

  try {
    // Fetch the current location
    const currentResult = await sql`
      SELECT name FROM locations WHERE h3index = ${h3index}
    `;

    if (currentResult.rows.length === 0) {
      return { error: 'Location not found' };
    }

    const currentLocation = currentResult.rows[0].name;

    // Fetch all city locations
    const cityResults = await sql`
      SELECT h3index, name FROM locations WHERE city = true
    `;

    if (cityResults.rows.length === 0) {
      return {
        currentLocation,
        nextCity: "No city found",
      };
    }

    // Find the nearest city using H3 grid distance
    let nextCity = null;
    let minDistance = Infinity;

    for (const city of cityResults.rows) {
      const distance = h3.gridDistance(h3index, city.h3index);

      if (distance !== null && distance < minDistance) {
        minDistance = distance;
        nextCity = city.name;
      }
    }

    return {
      currentLocation,
      nextCity,
    };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Database error' };
  }
});

import { defineEventHandler, getQuery } from 'h3';
import { createPool, sql } from '@vercel/postgres';
import h3 from 'h3-js';

const pool = createPool();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const h3index = query.h3index as string;

  console.log(`Received request for h3index: ${h3index}`);

  if (!h3index) {
    console.error("Missing h3index parameter");
    return { error: 'Missing h3index parameter' };
  }

  try {
    // Fetch the current location
    console.log(`Fetching location name for h3index: ${h3index}`);
    const currentResult = await sql`
      SELECT name FROM locations WHERE h3index = ${h3index}
    `;

    if (currentResult.rows.length === 0) {
      console.warn(`No location found for h3index: ${h3index}`);
      return { error: 'Location not found' };
    }

    const currentLocation = currentResult.rows[0].name;
    console.log(`Current location: ${currentLocation}`);

    // Fetch all city locations
    console.log("Fetching all city locations...");
    const cityResults = await sql`
      SELECT h3index, name FROM locations WHERE city = true
    `;

    if (cityResults.rows.length === 0) {
      console.warn("No cities found in the database.");
      return {
        currentLocation,
        nextCity: "No city found",
      };
    }

    console.log(`Found ${cityResults.rows.length} cities. Calculating nearest city...`);

    // Find the nearest city using H3 grid distance
    let nextCity = null;
    let minDistance = Infinity;

    for (const city of cityResults.rows) {
      console.log(`Calculating distance to city: ${city.name} (h3index: ${city.h3index})`);
      const distance = h3.gridDistance(h3index, city.h3index);

      if (distance === null) {
        console.warn(`Invalid distance calculation between ${h3index} and ${city.h3index}`);
        continue;
      }

      console.log(`Distance to ${city.name}: ${distance}`);

      if (distance < minDistance) {
        minDistance = distance;
        nextCity = city.name;
        console.log(`New closest city: ${nextCity} (Distance: ${minDistance})`);
      }
    }

    console.log(`Final closest city: ${nextCity}`);
    return {
      currentLocation,
      nextCity,
    };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Database error' };
  }
});

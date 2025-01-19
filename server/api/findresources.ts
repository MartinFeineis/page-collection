// server/api/findresources.ts

import { sql } from '@vercel/postgres'; // Import the Vercel Postgres client
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs

export default defineEventHandler(async (event) => {
  // Define possible resource types
  const resourceTypes = ['gold', 'stone', 'lumber', 'water', 'food'];

  // Generate a random number of resources (1-10)
  const numberOfEntries = Math.floor(Math.random() * 10) + 1;

  // Generate random resources
  const newResources = Array.from({ length: numberOfEntries }, () => ({
    Resource_ID: uuidv4(), // Generate a unique ID
    Resource_Type: resourceTypes[Math.floor(Math.random() * resourceTypes.length)], // Random resource type
    Resource_Amount: Math.floor(Math.random() * 100) + 1, // Random amount between 1 and 100
    Username: 'testuser', // Replace with dynamic username if needed
  }));

  // Build an insert query
  const values = newResources
    .map(
      ({ Resource_ID, Resource_Type, Resource_Amount, Username }) =>
        `('${Resource_ID}', '${Resource_Type}', ${Resource_Amount}, '${Username}', NOW())`
    )
    .join(',');

  try {
    // Insert the new resources into the database
    await sql`
      INSERT INTO Resources (Resource_ID, Resource_Type, Resource_Amount, Username, Created_At)
      VALUES ${sql.raw(values)};
    `;

    // Fetch the inserted resources
    const result = await sql`
      SELECT * FROM Resources
      WHERE Resource_ID IN (${sql.join(
        newResources.map((res) => res.Resource_ID)
      )});
    `;

    // Return the inserted resources
    return {
      status: 'success',
      data: result.rows,
    };
  } catch (error) {
    // Handle errors
    return {
      status: 'error',
      message: error.message,
    };
  }
});

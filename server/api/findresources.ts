import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
  const resourceTypes = ['gold', 'stone', 'lumber', 'water', 'food'];

  // Generate a random number of entries (1-10)
  const numberOfEntries = Math.floor(Math.random() * 10) + 1;

  // Generate random resources
  const newResources = Array.from({ length: numberOfEntries }, () => ({
    Resource_ID: uuidv4(),
    Resource_Type: resourceTypes[Math.floor(Math.random() * resourceTypes.length)],
    Resource_Amount: Math.floor(Math.random() * 100) + 1,
    Username: 'testuser', // Replace with dynamic username if needed
  }));

  // Construct the INSERT query
  const queryText = `
    INSERT INTO Resources (Resource_ID, Resource_Type, Resource_Amount, Username, Created_At)
    VALUES ${newResources
      .map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4}, NOW())`)
      .join(', ')};
  `;

  const queryValues = newResources.flatMap((resource) => [
    resource.Resource_ID,
    resource.Resource_Type,
    resource.Resource_Amount,
    resource.Username,
  ]);

  try {
    // Insert resources into the database
    await sql.query(queryText, queryValues);

    // Fetch the inserted resources
    const fetchQuery = `
      SELECT * FROM Resources
      WHERE Resource_ID IN (${newResources.map((_, i) => `$${i + 1}`).join(', ')});
    `;
    const fetchValues = newResources.map((resource) => resource.Resource_ID);
    const result = await sql.query(fetchQuery, fetchValues);

    // Return the inserted resources
    return {
      status: 'success',
      data: result.rows,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Database operation failed:', error);
      return {
        status: 'error',
        message: error.message,
      };
    }

    console.error('Unknown error occurred:', error);
    return {
      status: 'error',
      message: 'An unknown error occurred.',
    };
  }
});

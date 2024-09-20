// server/api/test.post.js
import { readBody } from 'h3'; // If you're using Nuxt 3 or a similar framework

export default defineEventHandler(async (event) => {
  try {
    // Parse the incoming request body
    const body = await readBody(event);
    console.log("Received message:", body.message);

    // Sample response to return, could be dynamic based on your logic
    return {       // Echo back the incoming request body
      response: body  // Add any other computed result or response
    };
  } catch (error) {
    // Handle and return an error if something goes wrong
    console.error("Error handling the request:", error);
    return { error: 'Failed to process the request.' };
  }
});
// server/api/gpt.js

import { readBody } from 'h3'; // For handling requests in Nuxt 3
import { OpenAI } from 'openai'; // Import the OpenAI SDK
import { ref } from 'vue'; // Import ref to handle reactive variables

// Create a client instance of the OpenAI SDK
const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is properly configured
});

function useOpenAI() {
  const loading = ref(false);
  const error = ref(null);
  const response = ref('');
  console.log("L17 response: ", response)
  const callOpenAI = async (messages) => {
    console.log("L19 Message in callOpenAI: ", messages)
    loading.value = true;
    error.value = null;

    try {
      // Use the OpenAI SDK to make a chat request
      
      const result = await openai.chat.completions.create({
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        messages: [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": messages}
        ],
      });

      // Store the result in the response ref
      const response = result.choices[0].message.content; // Assuming you're interested in the first choice
      console.log("L33 Response here: ",response)
      return response
    } catch (err) {
      error.value = err.message;
      console.log("L37 Error: ", error.value)
    } finally {
      loading.value = false;
      console.log("L43 Loading: ", loading.value)
    }
    console.log("L45 Response here: ",response)
    //return response; // Return the response after processing
  };
  console.log("L48 response: ", response.value)
  return {
    loading,
    error,
    response,
    callOpenAI,
  };
}

export default defineEventHandler(async (event) => {
  try {
    // Parse the incoming request body
    const body = await readBody(event);
    console.log("61 Received message:", body);
    
    // Call the OpenAI API using the useOpenAI composable
    //const openaiInstance = useOpenAI();

    // Await the OpenAI response
    console.log("67 Calling openIA")
    const aiMsg = await useOpenAI().callOpenAI(body.message);
    //const aiMsg = await openaiInstance.callOpenAI(body.message);
    console.log("L70 called OpenAI", aiMsg)

    // Return the AI response along with the original message
    return {
      airesponse: aiMsg,
      response: body // Echo back the incoming request body or other data
    };
  } catch (error) {
    // Handle and return an error if something goes wrong
    console.error("Error handling the request:", error);
    return { error: 'Failed to process the request.' };
  }
});

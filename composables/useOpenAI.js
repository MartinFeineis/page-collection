// composables/useOpenAI.js
import { ref } from 'vue';
import { OpenAI } from 'openai';

// Create a client instance of the OpenAI SDK
const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is properly configured in environment variables
});

export function useOpenAI() {
  const loading = ref(false);
  const error = ref(null);
  const response = ref(null);

  const callOpenAI = async (messages) => {
    loading.value = true;
    error.value = null;

    try {
      // Use the OpenAI SDK to make a chat request
      const result = await openai.chat.completions.create({
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        messages: messages,
      });

      // Store the result in the response ref
      response.value = result.choices[0].message.content; // Assuming you're interested in the first choice
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    response,
    callOpenAI,
  };
}

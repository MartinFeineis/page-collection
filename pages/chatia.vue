<template>
  <Home />
  <div>
    <textarea
      v-model="userInput"
      placeholder="Ask something to OpenAI"
      rows="5"
      cols="50"
    ></textarea>
    <br />
    <button @click="sendMessage">Send to OpenAI</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error">Error: {{ error }}</p>
    <pre v-if="responseMessage">{{ responseMessage.response.message }}</pre>
    <p>{{  responseMessage.airesponse }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Import ref to handle reactive variables

// Create a client instance of the OpenAI SDK
// const openaiinst = new OpenAI({
//   dangerouslyAllowBrowser: true,
//   apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is properly configured
// });

const userInput = ref('');        // User input from the text field
const responseMessage = ref('');  // Will hold the API response
const loading = ref(false);       // To show loading indicator
const error = ref(null);          // To hold any error messages

async function sendMessage() {
  console.log(userInput.value)
  try {
    console.log()
    const body = await $fetch('/api/gpt', {
      method: 'POST',
      body: { message: userInput.value }
    });

    // Update the responseMessage property with the response from the API
    if (body && body.response) {
      responseMessage.value = body;  // Update the HTML element with the response
    } else {
      responseMessage.value = "No response received.";
    }
  } catch (error) {
    console.error("Error sending message:", error);
    responseMessage.value = "An error occurred while sending the message.";
  }
}
</script>

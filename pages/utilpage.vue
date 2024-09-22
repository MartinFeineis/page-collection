<script setup lang="ts">
import UtilComp from '~/components/UtilComp.vue';
const userInput = ref('');        // User input from the text field
const responseMessage = ref('');  // Will hold the API response

// Function to send the message
async function sendMessage() {
  try {
    const body = await $fetch('/api/test', {
      method: 'POST',
      body: { message: userInput.value }
    });

    // Update the responseMessage property with the response from the API
    if (body && body.response) {
      responseMessage.value = body.response;  // Update the HTML element with the response
    } else {
      responseMessage.value = "No response received.";
    }
  } catch (error) {
    console.error("Error sending message:", error);
    responseMessage.value = "An error occurred while sending the message.";
  }
}
const myVal = ref('')
async function myTest() {
  myVal.value = "Hello Button Function"
  console.log("Pressed Button")
  return "Hello world"
}
</script>

<template>
    <Home />
    <h2>Utilities page</h2>
    <UtilComp />
    <div>
      <textarea
        v-model="userInput"
        placeholder="Ask something to OpenAI"
        rows="5"
        cols="50"
      ></textarea>
      <br />
      <button @click="sendMessage" >Send to OpenAI</button>
      <p v-if="loading">Loading...</p>
      <p v-if="error">Error: {{ error }}</p>
      <pre v-if="response">{{ response }}</pre>
    </div>
    <div id="responseDiv">
      <p>{{ responseMessage }}</p>
    </div>
    <div>
      <p> Learn Async: {{  myVal }}</p>
      <button @click="myTest">Test button</button>
    </div>
</template>

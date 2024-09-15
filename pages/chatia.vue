<template>
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const { loading, error, response, callOpenAI } = useOpenAI();
  const userInput = ref('');
  
  // Function to send user's input to OpenAI
  const sendMessage = () => {
    if (!userInput.value) return;
  
    callOpenAI([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userInput.value }
    ]);
  
    userInput.value = ''; // Clear input after sending
  };
  </script>
  
<script setup>
import { ref, computed } from 'vue';
const error = useError();

const quotes = ref([
  "Oops! Something went wrong.",
  "Well, this is awkward.",
  "Houston, we have a problem.",
  "Whoops! That didn't work.",
  "Error 404: Fun not found.",
  "This is not the page you're looking for.",
  "Something broke. We're on it!",
  "Yikes! That wasn't supposed to happen.",
  "Oh no! An error occurred.",
  "Keep calm and try again."
]);

const randomQuote = computed(() => {
  const index = Math.floor(Math.random() * quotes.value.length);
  return quotes.value[index];
});
</script>

<template>
  <h1>{{ randomQuote }}</h1>
  <h2>We got a {{ error.statusCode }}</h2>
</template>
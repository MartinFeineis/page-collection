<script setup>
const error = useError();
</script>
<template>
    <h1>That didn't work!</h1>
    <h2>We got a {{  error.statusCode }}</h2>
</template>
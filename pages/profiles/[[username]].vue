<script setup>
// import { getProfile } from './profile.js'

// const { profileData } = getProfile()
const route = useRoute()
const user = route.params.username
</script>
<template>
<h1>This is the Profile for {{ user }}</h1>
</template>

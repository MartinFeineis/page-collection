<script setup>
// import { getProfile } from './profile.js'

// const { profileData } = getProfile()
const foo = useFoo()
const route = useRoute()
const user = route.params.username
</script>
<template>
<h1>This is the Profile for {{ user }}</h1>
<p>https://media.404founders.com/martinfeineis/profile.json</p>
<div>
    {{ foo }}
  </div>
</template>

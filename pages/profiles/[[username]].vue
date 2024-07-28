<template>
  <h1>This is the Profile for {{ user }}</h1>
  <!-- <Appalert :msg="profile.jobs" /> -->
  <div>
    <Profile :prof="profile.profile" :uname="user.value" />
    <!-- <TechIcons /> -->
    <Jobs :jobs="profile.jobs" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(route.params.username)
console.log(user.value)

let url = `https://media.404founders.com/${user.value}/profile.json`
console.log(url)

const { data: profile, error } = await useFetch(url)

const isJson = ref(false)

if (error.value) {
  console.error('Error fetching profile:', error.value)
} else {
  try {
    // Attempt to parse the data as JSON
    const parsedData = JSON.parse(JSON.stringify(profile.value))
    // If parsing is successful, set isJson to true
    isJson.value = true
    console.log(parsedData)
  } catch (e) {
    // If parsing fails, log an error and set isJson to false
    console.error('Response is not valid JSON:', e)
    isJson.value = false
  }
}
</script>
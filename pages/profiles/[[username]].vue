<template>
  <h1>This is the Profile for {{ user }}</h1>
  <!-- <Appalert :msg="profile.jobs" /> -->
  <div>
    <!-- <pre v-if="isJson">{{ profile.jobs }}</pre>
    <p v-else>Failed to load profile data. The response is not valid JSON.</p> -->
    <TechIcons />
    <Jobs :jobs="profile.jobs" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
let tarry =  [
    {
      id: 4,
      Company: 'Cognizant',
      selectStr: '#Cognizant',
      Positions: [Array]
    },
    {
      id: 3,
      Company: 'Berkadia',
      selectStr: '#Berkadia',
      Positions: [Array]
    },
    {
      id: 2,
      Company: 'Cloudmine',
      selectStr: '#Cloudmine',
      Positions: [Array]
    },
    {
      id: 1,
      Company: 'PointIO',
      selectStr: '#PointIO',
      Positions: [Array]
    }
  ]
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
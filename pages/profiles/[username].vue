<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(route.params.username)
const error = ref(null)
const profurl = `https://media.404founders.com/${user.value}/profile.json`;
const profile  = await useFetch(profurl)
</script>

<template>
  <Home />
  <div v-if="profile">
    <Profile :prof="profile.data.value.profile" :uname="user" />
    <Jobs :jobs="profile.data.value.jobs" />
    <!-- <TechIcons :username="user" /> -->
  </div>
  <div v-else>
    <p v-if="error">Error fetching profile: {{ error }}</p>
    <p v-else>Loading profile... </p>
  </div>
</template>
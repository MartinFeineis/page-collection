<script setup>
const supabase = useSupabaseClient()
loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, bio, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false
</script>

<template>
  <Home />
<div> {{ data }}</div>
</template>
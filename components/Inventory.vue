<template>
    <div>
      <h1>Your Inventory</h1>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <p><strong>Gold:</strong> {{ inventory.gold }}</p>
        <p><strong>Stone:</strong> {{ inventory.stone }}</p>
        <p><strong>Lumber:</strong> {{ inventory.lumber }}</p>
        <p><strong>Water:</strong> {{ inventory.water }}</p>
        <p><strong>Food:</strong> {{ inventory.food }}</p>
        <p><strong>Last Updated:</strong> {{ new Date(inventory.updated_at).toLocaleString() }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useSupabaseClient, useSupabaseUser } from '#imports'
  
  const inventory = ref(null)
  const loading = ref(true)
  const error = ref(null)
  
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  onMounted(async () => {
    if (!user.value) {
      error.value = 'You must be logged in to view your inventory.'
      loading.value = false
      return
    }
  
    try {
      const { data, error: fetchError } = await supabase
        .from('inventory')
        .select('*')
        .eq('user_id', user.value.id)
        .single()
  
      if (fetchError) {
        error.value = fetchError.message
      } else {
        inventory.value = data
      }
    } catch (err) {
      error.value = 'An unexpected error occurred while fetching inventory.'
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  p {
    margin: 10px 0;
  }
  
  div {
    max-width: 500px;
    margin: auto;
  }
  </style>
  
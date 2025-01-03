<script setup>
const user = useSupabaseUser()

const logout = async () => {
    const { error } = await supabase.auth.signOut()
    navigateTo("/")
}
</script>
<template>
    <div>
        <p><NuxtLink to="/">go Home</NuxtLink></p>
        <div v-if="user">
            <button @click="logout">logout</button>
        </div>
        <div v-else>
            <NuxtLink to="/login">Login</NuxtLink>
        </div>
    </div>
</template>
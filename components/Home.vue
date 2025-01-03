<script setup>
const supabase = useSupabaseClient();
const login =  async () => {
  const {error} = supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
    redirectTo: `http://pages.rjo.me/login`,
  },
  });

  if (error) {
    console.log(error)
  }
};
const user = useSupabaseUser()
const logout = () => {
    supabase.auth.signOut()
}
</script>
<template>
    <div>
        <p><NuxtLink to="/">go Home</NuxtLink></p>
        <div v-if="user">
            <button @click="logout">logout</button>
        </div>
        <div v-else>
            <button @click="login">login</button>
        </div>
    </div>
</template>
<template>
  <Home />
    <div>
        <h1>Login Page</h1>
    </div>
    <div class="mt-10">
      <h2 class="text-5xl font-bold mb-7">Log in</h2>
      <button @click="login">Login with Google</button>
    </div>
    <div><p>User is: {{ user }}</p></div>
</template>

<script setup>
const supabase = useSupabaseClient();
const login =  async () => {
  const {error} = supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
    redirectTo: `http://pages.rjo.me/gprofile`,
  },
  });

  if (error) {
    console.log(error)
  }
};
const user = useSupabaseUser()
</script>
<style>
    h1 {
        background-color: #cc8932;
    }
</style>
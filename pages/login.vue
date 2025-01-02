<template>
  <Home />
    <div>
        <h1>Login Page</h1>
    </div>
    <div class="mt-10">
      <h2 class="text-5xl font-bold mb-7">Log in</h2>
      <button @click="login">Login with Google</button>
    </div>
</template>

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
// const user_profile = ref(null); // Initialize user_profile
// function onSignIn(googleUser) {
//   var user_profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }
// export default {
//   data() {
//     return {
//       profile: user_profile
//     };
//   }
// };
</script>
<style>
    h1 {
        background-color: #cc8932;
    }
</style>
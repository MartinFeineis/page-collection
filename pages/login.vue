<template>
  <Home />
    <div>
        <h1>Page</h1>
    </div>
</template>
<script>
function onSignIn(googleUser) {
  var user_profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
export default {
  data() {
    return {
      profile: user_profile
    };
  }
};
</script>
<style>
    h1 {
        background-color: #9932CC;
    }
</style>
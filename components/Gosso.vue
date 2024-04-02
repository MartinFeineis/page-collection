<template>
    <div>
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GoogleSignIn',
    methods: {
      onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
    },
    mounted() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSignIn,
      });
    }
  }
  </script>
  
  <style scoped>
  </style>

<style></style>
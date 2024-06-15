<template>
  <meta name="google-signin-client_id" content="969151254190-pl534uplm25np58ajk2fi93hhidqp4pn.apps.googleusercontent.com">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js">
  </script>
  <script src="https://apis.google.com/js/client:platform.js?onload=start" async defer>
  </script>
  <div>
    <p><h3>Hello google Signin</h3></p>
  </div>
  <div class="g-signin2" data-onsuccess="onSignIn"></div>
  <Loggedin />
</template>
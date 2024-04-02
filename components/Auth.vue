 <script>
 //import  Issuer  from 'openid-client';
 //import Provider from 'oidc-provider';
export default {
  data() {
    return {
      // uname: '',
      // pword: ''
    };
  },
  methods: {
    login() {
        // console.log("Password: ".concat(this.pword, " Username: ", this.uname ));
        // const configuration = {
        //     // refer to the documentation for other available configuration
        //     clients: [{
        //       client_id: 'admin',
        //       client_secret: 'PMtNy69PWWLfkpiuQ15OWmgG4kiac2c4',
        //       redirect_uris: ['http://optiplex:3000/'],
        //       // ... other client properties
        //   }],
        // };
        // const oidc = new Provider('http://optiplex:8080',configuration);
        // oidc.listen(8080, () => {
        //   console.log('oidc-provider listening on port 8080, check http://optiplex:8080/realms/castlePenguin/.well-known/openid-configuration');
        // });

        //const googleIssuer = await Issuer.discover('https://accounts.google.com');
        //console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);
    }
  }
};
</script>
  
<style></style>

<template>
    <h1>AuthN and AuthZ</h1>
    <section class="vh-100" style="background-color: #508bfc;">
      <!-- start comment
  <div class="container py-5 h-100">
    <form @submit.prevent="login">
      <label >Username:</label><br>
      <input v-model="uname" type="text" placeholder="username or e-mail"><br>
      <label >Password:</label><br>
      <input v-model="pword" type="password" placeholder="Password" >
      <input type="submit" value="Submit">
    </form> 
  </div> 
-->
</section>
<h3>Auth done</h3>
</template>

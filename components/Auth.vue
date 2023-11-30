 <script>
export default {
data() {
    return {
    name: 'Apples',
    message: 'I like apples'
    }
}
};
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://keycloak-server${kc_base_path}',
    realm: 'myrealm',
    clientId: 'myapp'
});

try {
    const authenticated = await keycloak.init();
    console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
} catch (error) {
    console.error('Failed to initialize adapter:', error);
}
</script>
  
<style></style>

<template>
<div>
    <form @submit.prevent="calculateMortgage">
        <input v-model="OutstandingMortgage" type="text" class="form-control" placeholder="500.000" aria-label="" aria-describedby="basic-addon1">
    </form>
    <h2>{{ name }}</h2>
    <p>{{ message }}</p>
</div>
</template>
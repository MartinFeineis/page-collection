 <script>
export default {
data() {
    return {
    name: 'Keycloak',
    message: 'Authenticating'
    }
}
}

</script>
  
<style></style>

<template>
    <h1>AuthN and AuthZ</h1>
<div>
    <form @submit.prevent="calculateMortgage">
        <input v-model="OutstandingMortgage" type="text" class="form-control" placeholder="500.000" aria-label="" aria-describedby="basic-addon1">
    </form>
    <h2>{{ name }}</h2>
    <p>{{ message }}</p>
</div>
<h3>Auth done</h3>
</template>
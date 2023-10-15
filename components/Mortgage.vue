<template>
  <div>
    <form @submit.prevent="calculateMortgage">
        <input v-model="OutstandingMortgage" type="text" class="form-control" placeholder="500.000" aria-label="" aria-describedby="basic-addon1">
    </form>
    <h2>{{ name }}</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Apples',
      message: 'I like apples'
    }
  }
};
</script>

<style></style>

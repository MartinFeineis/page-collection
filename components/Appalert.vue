<template>
    <p v-for="(message, index) in msg" :key="index">
      comprende? {{ message.Company }} is it here{{ index }}?
    </p>
</template>
<script>
export default {
  props: {
    msg: {
      type: Array,
      required: false
    }
  }
}
</script>
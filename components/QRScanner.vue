<template>
  <div>
    <qrcode-stream @detect="onDetect"></qrcode-stream>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Apples',
      message: 'I like apples'
    }
  },
  methods: {
  onDetect (detectedCodes) {
    console.log("test")
  }
}
};
</script>

<style></style>

<template>
  <div>
    <qrcode-stream></qrcode-stream>
    <qrcode-drop-zone></qrcode-drop-zone>
    <qrcode-capture></qrcode-capture>
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

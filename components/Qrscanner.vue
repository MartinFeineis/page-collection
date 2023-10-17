<template>
  <div>
    <qrcode-stream></qrcode-stream>
    <qrcode-drop-zone></qrcode-drop-zone>
    <qrcode-capture></qrcode-capture>
      <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
        <h2>The decoded value in QR/barcode is</h2>
        <h2>{{ decodedText }}</h2>
  </div>
  <div>Am I getting imported?</div>
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

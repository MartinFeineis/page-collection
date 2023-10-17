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
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

const decodedText = ref("");

const onLoaded = () => {
  console.log("loaded");
};

const onDecode = (text) => {
  decodedText.value = text;
};
</script>

<style></style>

<script setup>
import { useHead } from "@vueuse/head"; // For setting metadata
import { onMounted } from "vue";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";

// Set page title and metadata
useHead({
  title: "Reveal.js - Nuxt Presentation",
  meta: [{ charset: "utf-8" }],
});

onMounted(() => {
  let deck = new Reveal({
    plugins: [Markdown],
  });
  deck.initialize();
});
</script>

<template>
<Home />
  <div class="reveal">
    <div class="slides">
      <section>
        <h2>Barebones Presentation</h2>
        <p>This example contains the bare minimum includes and markup required to run a Reveal.js presentation.</p>
      </section>
      <section>
        <h2>No Theme</h2>
        <p>There's no theme included, so it will fall back on browser defaults.</p>
      </section>
    </div>
  </div>
</template>

<style>
@import "/node_modules/reveal.js/dist/reveal.css";
@import "/node_modules/reveal.js/dist/theme/black.css";
</style>

<script setup lang="ts">
import Locator from '~/components/Locator.vue';

</script>

<template>
  <Home />
  <div>
    <h1>Pages Index page</h1>
    <ul>
    <li><NuxtLink to="/login" >Login</NuxtLink></li>
    <li><NuxtLink to="/mortgage" >Mortgage calculator</NuxtLink></li>
    <li><NuxtLink to="/qrscan" >QR Code Scanner</NuxtLink></li>
    <li><NuxtLink to="/notes" >Notes</NuxtLink></li>
    <li><NuxtLink to="/swcomics" >Star Wars Comics</NuxtLink></li>
    <li><NuxtLink to="/chatia">AI Chat</NuxtLink></li>
    <li><NuxtLink to="/utilpage">Utilities page</NuxtLink></li>
    <li><NuxtLink to="/filer">Files List page</NuxtLink></li>
    <li><NuxtLink to="/directory">Directory List page</NuxtLink></li>
    <li><NuxtLink to="/searcher">Search Files and Directories</NuxtLink></li>
    <li><NuxtLink to="/profiles/martinfeineis" >Resume</NuxtLink></li>
  </ul>
  <Locator />
  </div>
                  <p>Last Commit: locationing 4</p>"
</template>


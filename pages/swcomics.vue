<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core'; // Make sure you have this or adjust the import based on your setup

const comics = ref([]);

async function fetchComics() {
  const response = await useFetch('/api/comics');
  comics.value = response.data._value.comics;
}

onMounted(fetchComics);

console.log(comics);
console.log(typeof comics);
</script>

<template>
  <div>
    <h1>Hello New Component</h1>
    <p>List of my Starwars comicbooks</p>
  </div>
  <div>
    <table id="swtable" class="table table-bordered table-dark">
      <thead>
        <tr>
          <th scope="col">Band Nr.</th>
          <th scope="col">Titel</th>
          <th scope="col">Notizen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in comics" :key="item.band">
          <td>{{ item.band }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.notes }}</td>
          <!-- <td>{{ item }} new element</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

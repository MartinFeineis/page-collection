<template>
  <Home />
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
        <tr v-for="item in comics.data._value.comics" :key="item.band">
          <td>{{ item.band }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
const comics = useFetch('/api/comics')
</script>
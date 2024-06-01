<script setup>
import { ref } from 'vue';
import { sql } from '@vercel/postgres';

let comics = ref([])
//const comics = sql`SELECT * FROM sw_comics;`;
function fetchComics() {
    let data = sql`SELECT * FROM sw_comics;`;
    //console.log("Data logged: ", data);
}
comics = fetchComics()
console.log("Logged comics: ", comics);
</script>
<template>
    <div>
        <h1>Hello New Component</h1>
        <p>Comics?: {{  comics.rows }}</p>
    </div>
    <div>
        <table>
            <th>Band Nr.</th>
            <th>Titel</th>
            <th>Notizen</th>
            <tr v-for="item in comics.rows">
                <td>{{ item.band }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.notes }}</td>
            </tr>
        </table>
    </div>
</template>
<style>
h1 {
    background-color: #9932CC;
}
</style>
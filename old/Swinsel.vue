<script setup>
import { ref } from 'vue';
import { sql } from '@vercel/postgres';
try {
    const comics = sql`SELECT * FROM sw_comics;`;
    console.log("Comics: ", comics);
} catch (error) {
    console.error("Error: ", error);
}
//var tlength = document.getElementById("swtable").rows.length;
let comics = ref([])
//const comics = sql`SELECT * FROM sw_comics;`;
function fetchComics() {
    let data = sql`SELECT * FROM sw_comics;`;
    //console.log("Data logged: ", data);
}
// if (tlength > 1) {
//     comics = fetchComics()
// }
//comics = fetchComics()
console.log("Logged comics: ", comics);
</script>
<template>
    <div>
        <h1>Hello New Component</h1>
        <p>Comics?: {{  comics }}</p>
        <p>Length: {{ tlength }}</p>
    </div>
    <div>
        <table id="swtable">
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
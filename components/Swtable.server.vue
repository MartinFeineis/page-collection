<template>
    <div>
        <h1>Hello New Component</h1>
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
<script>
import { ref } from 'vue';
import { sql } from '@vercel/postgres';
let comics = ref(null);

async function fetchComics() {
    comics = await sql`SELECT * FROM sw_comics;`;
    console.log(comics);
}
comics = fetchComics()
export default {
    data(){
        return{
            comics
        }
    }
}
</script>
<style>
h1 {
    background-color: #9932CC;
}
</style>
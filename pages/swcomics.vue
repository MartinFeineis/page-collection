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
let tdata =  [
    {
      band: 10,
      title: 'Dark Times - Blutige Ernte',
      notes: 'Checkout Kurosawas \\"Yojimbo - Der Leibwaechter\\" and \\"Dir verborgene Festung\\"',
      owned: true,
      wishlist: false
    },
    {
      band: 28,
      title: 'Blutsband II: Boba Fett ist tot',
      notes: 'kein toller Zeichenstil',
      owned: true,
      wishlist: false
    },
    {
      band: 35,
      title: 'Crimson Empire II - Das Blutsgericht',
      notes: 'Nom Anor tritt auf, schoener Zeichenstil',
      owned: true,
      wishlist: false
    }
  ]

</script>
<style>
h1 {
    background-color: #9932CC;
}
</style>
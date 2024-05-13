<script setup>
console.log("Hello JS World!")
import { sql } from '@vercel/postgres';

var comics = await sql`SELECT * FROM sw_comics;`;
console.log(comics.rows)
</script>
<style>
h1 {
    background-color: #9932CC;
}
</style>
<template>
    <div>
        <h1>Hello New Component</h1>
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
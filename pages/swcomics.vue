<script setup>
console.log("Hello JS World!")
import { db, sql } from '@vercel/postgres';

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
        <li v-for="item in comics.rows">
            <p>{{ item }}</p>>
        </li>
    </div>
</template>

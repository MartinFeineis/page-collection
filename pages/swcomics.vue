<script>
    console.log("Hello JS World!")
    import { sql } from '@vercel/postgres';
 
const likes = 100;
const { rows, fields } =
  await sql`SELECT * FROM sw_comics;`;
</script>
<style>
    h1 {
        background-color: #9932CC;
    }
</style>
<template>
    <div>
        <h1>Hello New Component</h1>
        <p>{{ rows }}</p>
        <p>{{ fields }}</p>
    </div>
</template>

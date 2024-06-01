<script setup>
const comics  = await useFetch('/api/comics')
console.log(comics)
console.log(typeof comics);
</script>

<template>
    <div>
        <h1>Hello New Component</h1>
        <p>keys: {{   Object.keys(comics.data._value) }}</p>
        <p>typeof: {{ typeof comics.data }}</p>
        <p>obje: {{  comics.data._value.comics }}</p>
    </div>
    <div>
        <table id="swtable">
            <th>Band Nr.</th>
            <th>Titel</th>
            <th>Notizen</th>
            <tr v-for="item in comics.data._value.comics">
                <td>{{ item.band }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.notes }}</td>
                <!-- <td>{{ item }} new element</td> -->
            </tr>
        </table>
    </div>
</template>
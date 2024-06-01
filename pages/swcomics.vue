<script setup>
const comics  = await useFetch('/api/comics')
</script>

<template>
    <div>
        <h1>Hello New Component</h1>
        <p>Comics?: {{  comics }}</p>
    </div>
    <div>
        <table id="swtable">
            <th>Band Nr.</th>
            <th>Titel</th>
            <th>Notizen</th>
            <tr v-for="item in comics">
                <!-- <td>{{ item.band }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.notes }}</td> -->
                <td>{{ item }}</td>
            </tr>
        </table>
    </div>
</template>
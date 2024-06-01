<script setup>
const comics  = await useFetch('/api/comics')
console.log(comics)
</script>

<template>
    <div>
        <h1>Hello New Component</h1>
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
                <td>{{ item }} new element</td>
            </tr>
        </table>
    </div>
</template>
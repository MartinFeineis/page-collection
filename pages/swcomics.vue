<script setup>
const comics  = await useFetch('/api/comics')
console.log(comics)
console.log(typeof comics);
</script>

<template>
    <div>
        <h1>Hello New Component</h1>
        <p>List of my Starwars comicbooks</p>
    </div>
    <div>
        <table id="swtable" class="table table-bordered table-dark">
            <th scope="col">Band Nr.</th>
            <th scope="col">Titel</th>
            <th scope="col">Notizen</th>
            <tr scope="row" v-for="item in comics.data._value.comics">
                <td>{{ item.band }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.notes }}</td>
                <!-- <td>{{ item }} new element</td> -->
            </tr>
        </table>
    </div>
</template>
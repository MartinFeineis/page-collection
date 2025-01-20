<template>
  <div>
    <h1>Your Inventory</h1>
    <table v-if="Object.keys(inventoryStore.inventory).length > 0">
      <thead>
        <tr>
          <th>Resource Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amount, resourceType) in inventoryStore.inventory" :key="resourceType">
          <td>{{ resourceType }}</td>
          <td>{{ amount }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No inventory data available.</p>
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/stores/inventory";
import { useSupabaseUser } from "#imports";
import { onServerPrefetch } from "vue";

const inventoryStore = useInventoryStore();
const user = useSupabaseUser();

onServerPrefetch(async () => {
  if (user.value && user.value.id) {
    await inventoryStore.fetchInventory(user.value.id);
  }
});
</script>
<template>
  <div>
    <h1>Your Inventory</h1>
    <table>
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
  </div>
</template>

<script setup>
import { useInventoryStore } from "@/stores/inventory";
import { useSupabaseUser } from "#imports";

const inventoryStore = useInventoryStore();
const user = useSupabaseUser();

// Fetch inventory on mount
if (user.value && user.value.id) {
  inventoryStore.fetchInventory(user.value.id);
}
</script>
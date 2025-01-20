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
          <td :class="{ flash: flashingResources[resourceType] }">
            {{ amount }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No inventory data available.</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useInventoryStore } from "@/stores/inventory";
import { useSupabaseUser } from "#imports";
import { useAsyncData } from "#app";

const inventoryStore = useInventoryStore();
const user = useSupabaseUser();

// State to track flashing resource types
const flashingResources = ref({});

// Watch for inventory changes and trigger the flash effect
watch(
  () => inventoryStore.inventory,
  (newInventory, oldInventory) => {
    if (!oldInventory) return;

    for (const resourceType in newInventory) {
      if (
        oldInventory[resourceType] !== undefined &&
        newInventory[resourceType] !== oldInventory[resourceType]
      ) {
        // Trigger flash for updated resource
        flashingResources.value[resourceType] = true;

        // Remove the flash class after 1 second
        setTimeout(() => {
          flashingResources.value[resourceType] = false;
        }, 1000);
      }
    }
  },
  { deep: true } // Watch deeply for changes in inventory values
);

// Fetch inventory using useAsyncData
const { data: inventoryData, error } = await useAsyncData(async () => {
  if (user.value && user.value.id) {
    await inventoryStore.fetchInventory(user.value.id);
  }
  return inventoryStore.inventory; // Return the inventory data
});

// Update the inventory store when data is ready
if (inventoryData.value) {
  inventoryStore.inventory = inventoryData.value;
}
</script>

<style scoped>
.flash {
  background-color: gold;
  transition: background-color 1s ease-out;
}
</style>
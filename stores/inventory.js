// stores/inventory.js
import { defineStore } from "pinia";
import { useSupabaseClient } from "#imports";
// stores/inventory.js
export const useInventoryStore = defineStore("inventory", {
    state: () => ({
      inventory: {}, // Initialize as an empty object
    }),
    actions: {
      async fetchInventory(userId) {
        const supabase = useSupabaseClient();
  
        try {
          const { data, error } = await supabase
            .from("inventory")
            .select("*")
            .eq("user_id", userId)
            .single();
  
          if (error) {
            console.error("Error fetching inventory:", error);
            return;
          }
  
          this.inventory = data || {}; // Ensure inventory is always an object
        } catch (err) {
          console.error("Unexpected error fetching inventory:", err);
        }
      },
  
      updateResource(resourceType, newAmount) {
        if (this.inventory[resourceType] !== undefined) {
          this.inventory[resourceType] = newAmount;
        }
      },
    },
  });
  
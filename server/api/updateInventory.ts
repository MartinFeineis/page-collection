import { createClient } from '@supabase/supabase-js';
import { createPool, sql } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('upInv L10 Missing SUPABASE_URL or SUPABASE_KEY environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Parse the request body
  const body = await readBody(event);
  const { resource_id, userId } = body;

  console.log('upInv L19 Incoming Request:', { resource_id, userId });

  if (!resource_id || !userId) {
    console.warn('Invalid input detected:', { resource_id, userId });
    return {
      status: 400,
      message: 'Invalid input. resource_id and userId are required.',
    };
  }

  try {
    // Initialize Vercel Postgres pool
    const pool = createPool();

    console.log('upInv L33 Querying Vercel Postgres for resource_id:', resource_id);

    // Query the Vercel Postgres database for the resource
    const result = await sql`
      SELECT resource_type, resource_amount
      FROM resources
      WHERE resource_id = ${resource_id};
    `;

    if (result.rowCount === 0) {
      console.warn('upInv L43 Resource not found for resource_id:', resource_id);
      return {
        status: 404,
        message: 'Resource not found.',
      };
    }

    const { resource_type, resource_amount } = result.rows[0];
    console.log('upInv L51 Resource Retrieved:', { resource_type, resource_amount });

    // Fetch the current inventory for the user
    console.log('upInv L54 Querying inventory for userId:', userId);

    const { data: inventory, error: fetchError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    console.log('upInv L62 Inventory Fetch Result:', { inventory, fetchError });

    if (!inventory) {
      console.warn('upInv L65 No inventory found for userId:', userId);
      return {
        status: 404,
        message: 'Inventory not found.',
      };
    }

    if (fetchError) {
      console.error('upInv L73 Fetch inventory error:', fetchError);
      return {
        status: 500,
        message: 'Error fetching inventory.',
      };
    }

    // Update the inventory for the retrieved resource type
    const updatedAmount = (inventory[resource_type] || 0) + resource_amount;
    console.log('upInv L82 Updating inventory for resource:', { resource_type, updatedAmount });

    const { error: updateError } = await supabase
      .from('inventory')
      .update({ [resource_type]: updatedAmount, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    console.log('upInv L89 Update Result:', { updateError });

    if (updateError) {
      console.error('upInv L92 Update inventory error:', updateError);
      return {
        status: 500,
        message: 'Failed to update inventory.',
      };
    }

    // Delete the resource row from the Vercel Postgres database
    console.log('upInv L102 Deleting resource from Vercel Postgres:', resource_id);

    const deleteResult = await sql`
      DELETE FROM resources
      WHERE resource_id = ${resource_id};
    `;

    if (deleteResult.rowCount === 0) {
      console.warn('upInv L107 Failed to delete resource:', resource_id);
      return {
        status: 500,
        message: 'Failed to delete resource from the database.',
      };
    }

    console.log('upInv L110 Resource successfully deleted from Vercel Postgres:', resource_id);

    // Fetch and return the updated inventory
    console.log('upInv L113 Fetching updated inventory for userId:', userId);

    const { data: updatedInventory, error: fetchUpdatedError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .single();

    console.log('upInv L121 Updated Inventory Fetch Result:', { updatedInventory, fetchUpdatedError });

    if (fetchUpdatedError) {
      console.error('upInv L124 Fetch updated inventory error:', fetchUpdatedError);
      return {
        status: 500,
        message: 'Failed to fetch updated inventory.',
      };
    }

    return {
      status: 200,
      message: 'Inventory updated successfully, and resource deleted.',
      updatedInventory,
    };
  } catch (error) {
    console.error('upInv L132 Unexpected error:', error);
    return {
      status: 500,
      message: 'An unexpected error occurred.',
    };
  }
});
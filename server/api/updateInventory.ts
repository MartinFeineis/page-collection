import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Parse the request body
  const body = await readBody(event)
  const { resourceType, resourceAmount, userId } = body

  if (!resourceType || !resourceAmount || !userId) {
    return {
      status: 400,
      message: 'Invalid input. resourceType, resourceAmount, and userId are required.',
    }
  }

  try {
    // Fetch the current inventory for the user
    const { data: inventory, error: fetchError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      return {
        status: 404,
        message: 'Inventory not found.',
      }
    }

    // Update the inventory for the specified resource type
    const updatedAmount = (inventory[resourceType] || 0) + resourceAmount
    const { error: updateError } = await supabase
      .from('inventory')
      .update({ [resourceType]: updatedAmount, updated_at: new Date().toISOString() })
      .eq('user_id', userId)

    if (updateError) {
      return {
        status: 500,
        message: 'Failed to update inventory.',
      }
    }

    // Return success response
    return {
      status: 200,
      message: 'Inventory updated successfully.',
      updatedResource: {
        type: resourceType,
        amount: updatedAmount,
      },
    }
  } catch (error) {
    return {
      status: 500,
      message: 'An unexpected error occurred.',
    }
  }
})

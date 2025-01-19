import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables.')
  }

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

  // Validate resourceType
  const validResourceTypes = ['gold', 'stone', 'lumber', 'water', 'food']
  if (!validResourceTypes.includes(resourceType)) {
    return {
      status: 400,
      message: `Invalid resourceType. Must be one of: ${validResourceTypes.join(', ')}`,
    }
  }

  try {
    // Fetch the current inventory for the user
    const { data: inventory, error: fetchError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchError || !inventory) {
      console.error('Fetch inventory error:', fetchError)
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
      console.error('Update inventory error:', updateError)
      return {
        status: 500,
        message: 'Failed to update inventory.',
      }
    }

    // Fetch and return the updated inventory
    const { data: updatedInventory, error: fetchUpdatedError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (fetchUpdatedError) {
      console.error('Fetch updated inventory error:', fetchUpdatedError)
      return {
        status: 500,
        message: 'Failed to fetch updated inventory.',
      }
    }

    return {
      status: 200,
      message: 'Inventory updated successfully.',
      updatedInventory,
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      status: 500,
      message: 'An unexpected error occurred.',
    }
  }
})

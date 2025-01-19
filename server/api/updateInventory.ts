import { useSupabaseClient, useSupabaseAuthClient } from '#imports'

export default defineEventHandler(async (event) => {
  const supabase = useSupabaseClient()
  const authClient = useSupabaseAuthClient()

  // Get the current user
  const user = authClient.auth.user()

  if (!user) {
    return {
      status: 401,
      message: 'Unauthorized. Please log in to update inventory.',
    }
  }

  try {
    // Parse the request body
    const body = await readBody(event)
    const { resourceType, resourceAmount } = body

    if (!resourceType || !resourceAmount) {
      return {
        status: 400,
        message: 'Invalid input. Both resourceType and resourceAmount are required.',
      }
    }

    // Fetch the current inventory for the user
    const { data: inventory, error: fetchError } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', user.id)
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
      .eq('user_id', user.id)

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

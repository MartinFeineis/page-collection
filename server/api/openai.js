export default async (req, res) => {
    try {
      const apiKey = process.env.OPENAI_API_KEY;
  
      // Make the request to the OpenAI API
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',  // or 'gpt-3.5-turbo', etc.
          messages: req.body.messages,
        }),
      });
  
      // Check if the response from OpenAI was successful
      if (!openAIResponse.ok) {
        const errorDetails = await openAIResponse.json();
        throw new Error(`OpenAI API error: ${errorDetails.error.message}`);
      }
  
      // If successful, parse the response
      const data = await openAIResponse.json();
  
      // Send the parsed data back to the client
      res.status(200).json(data);
  
    } catch (error) {
      // Handle the error and return an appropriate message
      console.error("Error in OpenAI API call:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
interface ChatRequest {
  user_id: string;
  agent_id: string;
  session_id: string;
  message: string;
}

export const sendChatMessage = async (message: string, apiKey: string) => {
  const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({
      user_id: "siva@lyzr.ai",
      agent_id: "676f30ff51efb4ec8479cc3c",
      session_id: "676f30ff51efb4ec8479cc3c",
      message: message
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};
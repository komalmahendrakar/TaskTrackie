import axios from "axios";

const systemPrompt = `You are a smart assistant that helps users with task management and general conversation.

If the user’s message is about a task (adding, deleting, or updating), respond with a JSON object in this exact format:
{
  "intent": "addTask" | "deleteTask" | "updateTask",
  "title": "string",
  "description": "string",
  "priority": "low" | "medium" | "high",
  "status": "yettobedone" | "inProgress" | "completed"
}

Rules:
- Always include all five fields.
- Do not leave the description empty.

If the message is **not** about a task, reply like a normal chatbot would—friendly and helpful. No JSON in that case.

Never reply with both JSON and a message. Choose one based on the user's intent.
`;

export const parseGemMsg = async (userMessage) => {
  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\nUser: " + userMessage }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const rawText = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    // Try to parse only if it looks like a JSON object
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      const json = JSON.parse(cleaned);

      // Basic validation to check if it's a task intent
      if (["addTask", "deleteTask", "updateTask"].includes(json.intent)) {
        return json;
      }
    }

    // If not a JSON task intent, treat as normal chat
    return {
      intent: "chat",
      reply: rawText.trim()
    };

  } catch (err) {
    console.error("Gemini parse error:", err.message);
    return {
      intent: "chat",
      reply: "Oops! Something went wrong while processing your request."
    };
  }
};



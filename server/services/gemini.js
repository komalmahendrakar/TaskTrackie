let isGeminiLoading = false;


require("dotenv").config();
console.log("Gemini API KEY:", process.env.GEMINI_API_KEY);
const axios = require("axios"); 

const gemini = async (req, res) => {
    if (isGeminiLoading) return; // 🚫 Skip if already calling Gemini
  isGeminiLoading = true; 
  const { chatHistory } = req.body;
if (!chatHistory || !Array.isArray(chatHistory)) {
  return res.status(400).json({ error: "Invalid or missing chatHistory" });
}


const contents = chatHistory.map((msg) => ({
  role: msg.role, 
  parts: [{ text: msg.text }]
}));



  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents:
          contents
      }
    );

   

   
    const reply =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

    res.json({ reply });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
  finally {
    isGeminiLoading = false;    // 🔓 Unlock after completion
  }
};

module.exports={gemini};
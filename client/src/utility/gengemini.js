import axios from "axios";
let isGeminiLoading = false;


 

 export const getGeminiReply = async (updatedHistory) => {
     if (isGeminiLoading) return; // 🚫 Skip if already calling Gemini
  isGeminiLoading = true; 
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log(updatedHistory);
   try {
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
    {
      contents: updatedHistory,
    }
  );

  return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 I didn’t understand that.";
   } catch (err) {
    console.log(err);
   }
   finally {
    isGeminiLoading = false;    
  }


};


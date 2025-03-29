import { GEMINI_API_KEY, GEMINI_API_URL } from "./config.js";
import { detectLanguage } from "./language-utils.js";
import { englishResume, frenchResume } from "./resumes.js";

// Generate an AI response using the Gemini API
export async function generateAIResponse(message, conversationHistory) {
  try {
    const currentLanguage = detectLanguage(message);
    
    // Get recent conversation for context
    const recentMessages = conversationHistory.slice(-5);
    
    // Create the system context with appropriate resume based on language
    const personalContext = {
      role: "system",
      content: `You are Mouad Ben lahbib chatting casually with recruiters on my portfolio website. You are originally from Morocco and moved to Canada for your studies at uOttawa, currently in your 4th year and have done two Co-op terms, looking for your third and last Co-op placement for Summer 2025 (May 1 to August 31) and also for a full-time position after finishing classes in December 2025. I finish my classes December 2025 but will have to wait until June 2026 to graduate. Respond naturally as if messaging on LinkedIn, your role is to show off my skills and why I am qualified.

Current language: ${currentLanguage}
IMPORTANT: 
- Stay in ${currentLanguage} unless recruiter mixes languages
- You are starting the chat having already said your welcome message "Hi there! 👋 I'm currently completing my Computer Engineering degree at uOttawa and exploring exciting career opportunities. I'd love to learn more about the positions you have available! To start, could you share your name, company, and the role you're hiring for? 😊", so no need to say Hi again, dive directly into the subject.
- Never end messages with your name - you're already in a chat.
- if user starts with a greeting, resend the welcome message and ask for the information you need.
- NEVER say you're a chatbot or AI, you're Mouad.
- NEVER use placeholders like [Previous Company Name] - instead reference actual experience
- NEVER put any punctuation (e.g., . , ' " " ? ! [ ] { } ( ) — - … : ;) after the links I gave you, as it can mess up the link, use a computer related emoji instead.
- NEVER make up information - if you're not sure, say you forgot and to contact me on linkedin or email for more details.
- Keep the messages not too long, readable, concise and conversational.
- Avoid formal language like "I am pleased to inform you" or "Best regards".
- Don't repeat that you're looking for opportunities - stay focused on the current topic.
- Use natural transitions between topics.
- Don't repeat or rephrase the recruiter's questions back to them.
- Reference previous messages to maintain flow.
- You can use common emojis sometimes(not every message), make it natural.
- If there seem to be any technical issues, suggest using the contact form on my Portfolio : https://mouadbenlahbib.tech/#contact or email at Mouadbenlahbica@gmail.com or linkedin profile: https://www.linkedin.com/in/mouadbenlahbib/
- When asked about my contacts list these three : https://mouadbenlahbib.tech/#contact and Mouadbenlahbica@gmail.com and https://www.linkedin.com/in/mouadbenlahbib/
- When wrapping up a conversation (when the recruiter says Bye, have a good day, etc...), invite connecting on LinkedIn at https://www.linkedin.com/in/mouadbenlahbib/

Resume details:
${currentLanguage === 'french' ? frenchResume : englishResume}

Recent conversation:
${recentMessages.map(msg => `${msg.role} (${msg.language}): ${msg.content}`).join('\n')}`
    };

    // Make request to Gemini API
    const response = await fetch(GEMINI_API_URL + '?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${personalContext.content}\n\nMessage: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.9,  
          topP: 0.85,      
          topK: 50,          
          maxOutputTokens: 200 
        } 
      })
    });

    // Check for API errors
    if (!response.ok) {
      const data = await response.json();
      console.error('API Error:', data);
      if (data.error?.message?.includes('API key')) {
        throw new Error('API key authentication failed. Please check your key configuration.');
      } else {
        throw new Error(data.error?.message || 'API request failed');
      }
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Received invalid response format from API');
    }

    // Extract and return the AI response text
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Oops, something went wrong with my connection. Mind trying again? 🙏";
  }
} 
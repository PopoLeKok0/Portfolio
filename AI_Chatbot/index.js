// AI Chat module entry point
import { getVisitorId, getConversationId } from './id-generators.js';
import { welcomeMessages, ADMIN_PASSWORD } from './config.js';
import { detectLanguage } from './language-utils.js';
import { addMessage, showLoadingIndicator, hideLoadingIndicator, displayConversationsAdmin } from './ui-handlers.js';
import { saveUserMessage, saveAssistantMessage, loadConversationHistory, initConversation } from './firebase-service.js';
import { generateAIResponse } from './ai-service.js';
import { viewConversation, closeAdminView, exportVisitorData } from './admin-service.js';

// Global state
const loadingIndicator = document.getElementById('loading-indicator');
let isProcessing = false;
window.conversationHistory = [];

// Initialize the chat functionality
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const visitorId = getVisitorId();
  const conversationId = getConversationId();
  
  // Determine initial language based on browser settings
  const browserLang = navigator.language.toLowerCase();
  const initialLanguage = browserLang.startsWith('fr') ? 'french' : 'english';
  const welcomeMsg = welcomeMessages[initialLanguage];
  
  // Initialize conversation with welcome message
  (async function() {
    try {
      const isNewConversation = await initConversation(visitorId, conversationId, welcomeMsg, initialLanguage);
      
      if (isNewConversation) {
        // Display welcome message
        addMessage(welcomeMsg, false);
      } else {
        // If the conversation exists, load its messages
        const messages = await loadConversationHistory(visitorId, conversationId);
        
        // Start with a clean chat display and add messages
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = '';
        
        messages.forEach(msg => {
          addMessage(msg.content, msg.role === 'user');
          // Also rebuild the conversation history in memory
          window.conversationHistory.push(msg);
        });
      }
    } catch (error) {
      console.error("Error initializing conversation:", error);
      // Still show welcome message even if Firebase fails
      addMessage(welcomeMsg, false);
    }
  })();
  
  // Handle sending a new message
  async function handleSendMessage() {
    if (isProcessing) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    isProcessing = true;
    input.value = '';
    showLoadingIndicator();
    sendButton.disabled = true;
    
    // Add user message to UI
    addMessage(message, true);
    
    try {
      // Detect language
      const language = detectLanguage(message);
      
      // Save user message to conversation history and Firebase
      const userMessage = { 
        role: 'user', 
        content: message,
        language: language,
        timestamp: new Date().toISOString()
      };
      window.conversationHistory.push(userMessage);
      
      // Save to Firebase
      await saveUserMessage(visitorId, conversationId, message, language);
      
      // Generate AI response
      const aiResponse = await generateAIResponse(message, window.conversationHistory);
      
      // Add AI response to UI
      addMessage(aiResponse, false);
      
      // Save AI response to conversation history and Firebase
      const assistantMessage = { 
        role: 'assistant', 
        content: aiResponse,
        language: language,
        timestamp: new Date().toISOString()
      };
      window.conversationHistory.push(assistantMessage);
      
      // Save to Firebase
      await saveAssistantMessage(visitorId, conversationId, aiResponse, language);
      
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("Sorry, I'm having trouble connecting. Please try again later.", false);
    } finally {
      isProcessing = false;
      hideLoadingIndicator();
      sendButton.disabled = false;
      input.focus();
    }
  }
  
  // Set up event listeners
  sendButton.addEventListener('click', handleSendMessage);
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  });
  
  // Expose admin functions to window for global access
  window.viewConversation = async function(visitorId, convId) {
    const msgContainer = document.getElementById(`conv-${convId}`);
    
    // Toggle visibility
    if (msgContainer.style.display === 'block') {
      msgContainer.style.display = 'none';
      return;
    }
    
    await viewConversation(visitorId, convId, msgContainer);
  };
  
  window.closeAdminView = closeAdminView;
  
  // Admin panel access function (can be called from console)
  window.openAdminPanel = function(password) {
    displayConversationsAdmin(password, ADMIN_PASSWORD);
  };
  
  window.exportVisitorData = exportVisitorData;
}); 
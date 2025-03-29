// Generate a unique conversation ID for each visitor session
export const getConversationId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `conv_${timestamp}_${random}`;
};

// Generate a unique visitor ID that persists across conversations
export const getVisitorId = () => {
  if (!localStorage.getItem('visitorId')) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    localStorage.setItem('visitorId', `visitor_${timestamp}_${random}`);
  }
  return localStorage.getItem('visitorId');
}; 
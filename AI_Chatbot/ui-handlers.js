// Chat interface UI functions
export function addMessage(message, isUser) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
  
  if (!isUser) {

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <span class="loading-text">Typing...</span>
    `;
    chatMessages.appendChild(loadingDiv);


    chatMessages.scrollTop = chatMessages.scrollHeight;
  }


  setTimeout(() => {
    if (!isUser) {

      const indicators = chatMessages.getElementsByClassName('loading-indicator');
      while (indicators.length > 0) {
        indicators[0].remove();
      }
    }


    const linkedMessage = message.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="chat-link">$1</a>'
    );
    

    if (!isUser) {

      const processedMessage = linkedMessage.replace(/([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}])/gu, '<span class="emoji">$1</span>');
      

      let formattedMessage = '<p class="ai-message-container">';
      

      const parts = processedMessage.split(/<span class="emoji">|<\/span>/);
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {

          if (parts[i].trim()) {
            formattedMessage += `<span class="ai-message-text">${parts[i]}</span>`;
          }
        } else {

          formattedMessage += `<span class="emoji">${parts[i]}</span>`;
        }
      }
      
      formattedMessage += '</p>';
      messageDiv.innerHTML = formattedMessage;
    } else {
      messageDiv.innerHTML = linkedMessage;
    }
    
    chatMessages.appendChild(messageDiv);


    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }, isUser ? 0 : 2000);
}


export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }
}


export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
}


export function displayConversationsAdmin(password, correctPassword) {

  if (password !== correctPassword) {
    alert("Incorrect password");
    return;
  }
  
  const adminPanel = document.createElement('div');
  adminPanel.className = 'admin-modal';
  adminPanel.innerHTML = `<div class="admin-panel">
    <h2>Admin Panel - Loading conversations...</h2>
    <button onclick="closeAdminView()">Close</button>
  </div>`;
  
  document.body.appendChild(adminPanel);
  
  // Add CSS for the modal
  const style = document.createElement('style');
  style.textContent = `
    .admin-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 1000;
      padding: 20px;
      overflow: auto;
    }
    .visitor-block {
      margin-bottom: 30px;
      border: 1px solid #ccc;
      padding: 15px;
    }
    .conversation {
      margin: 10px 0;
      padding: 10px;
      background: #f5f5f5;
    }
    .message-list {
      display: none;
      margin-top: 10px;
    }
    .admin-message {
      padding: 8px;
      margin: 5px 0;
      border-radius: 4px;
    }
    .admin-user-message {
      background: #e1f5fe;
    }
    .admin-ai-message {
      background: #f1f8e9;
    }
  `;
  
  document.head.appendChild(style);
  
  return adminPanel;
} 
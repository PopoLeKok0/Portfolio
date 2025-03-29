// UI handling functions for the chat interface

// Add a message to the UI
export function addMessage(message, isUser) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
  
  if (!isUser) {
    // Add loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <span class="loading-text">Typing...</span>
    `;
    chatMessages.appendChild(loadingDiv);

    // Scroll to the bottom immediately to show typing animation
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Delay for message insertion
  setTimeout(() => {
    if (!isUser) {
      // Remove typing animation
      const indicators = chatMessages.getElementsByClassName('loading-indicator');
      while (indicators.length > 0) {
        indicators[0].remove();
      }
    }

    // Add the actual message with clickable links
    const linkedMessage = message.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" class="chat-link">$1</a>'
    );
    messageDiv.innerHTML = linkedMessage;
    chatMessages.appendChild(messageDiv);

    // Smooth scroll to new message
    chatMessages.scrollTo({
      top: chatMessages.scrollHeight,
      behavior: 'smooth'
    });
  }, isUser ? 0 : 2000); // Increase delay to allow animation to be visible
}

// Show loading indicator
export function showLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'block';
  }
}

// Hide loading indicator
export function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.display = 'none';
  }
}

// Admin panel display function
export function displayConversationsAdmin(password, correctPassword) {
  // Simple password protection (not secure, just basic protection)
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
async function sendMessage(message) {
    try {
        const response = await fetch('https://popolekok0.pythonanywhere.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        // Log response status for debugging
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            // Try to get error message from response
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Detailed error:', error);
        if (error.message.includes('Failed to fetch')) {
            return 'Unable to connect to the server. Please check your internet connection.';
        }
        return `Error: ${error.message}. Please try again.`;
    }
}

function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    // Handle multiline messages properly
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    // Add initial welcome message
    addMessage('Hello! I\'m Mouad AI. Feel free to ask me anything about Mouad\'s professional experience, skills, or projects!', false);

    async function handleSend() {
        const message = input.value.trim();
        if (message) {
            // Disable input and button before sending
            input.value = '';
            input.disabled = true;
            sendButton.disabled = true;

            try {
                addMessage(message, true);
                const response = await sendMessage(message);
                addMessage(response, false);
            } catch (error) {
                console.error('Handle send error:', error);
                addMessage('An error occurred while sending your message. Please try again.', false);
            } finally {
                // Re-enable input and button
                input.disabled = false;
                sendButton.disabled = false;
                input.focus();
            }
        }
    }

    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default to avoid newline
            handleSend();
        }
    });
});
async function sendMessage(message) {
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}

function addMessage(message, isUser) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
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
            addMessage(message, true);
            input.value = '';
            input.disabled = true;
            sendButton.disabled = true;

            const response = await sendMessage(message);
            addMessage(response, false);

            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }

    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});
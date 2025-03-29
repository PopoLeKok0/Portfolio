import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { loadConversationHistory } from "./firebase-service.js";

// Function to view conversation details for admin
export async function viewConversation(visitorId, convId, messagesContainer) {
  try {
    const messages = await loadConversationHistory(visitorId, convId);
    
    let messagesHtml = '';
    messages.forEach(msg => {
      messagesHtml += `<div class="admin-message ${msg.role === 'user' ? 'admin-user-message' : 'admin-ai-message'}">
        <strong>${msg.role === 'user' ? 'Visitor' : 'Assistant'}:</strong> 
        <span>${msg.timestamp?.toDate?.() ? msg.timestamp.toDate().toLocaleString() : 'Unknown'}</span>
        <p>${msg.content}</p>
      </div>`;
    });
    
    messagesContainer.innerHTML = messagesHtml || 'No messages found';
    messagesContainer.style.display = 'block';
  } catch (error) {
    console.error("Error loading messages:", error);
    messagesContainer.innerHTML = 'Error loading messages';
  }
}

// Close admin view
export function closeAdminView() {
  const modal = document.querySelector('.admin-modal');
  if (modal) {
    modal.remove();
  }
}

// Export visitor data to JSON
export async function exportVisitorData(visitorId) {
  const db = getFirestore();
  
  try {
    const visitorDocRef = doc(db, "visitors", visitorId);
    const visitorDoc = await getDoc(visitorDocRef);
    
    if (!visitorDoc.exists()) {
      alert("Visitor not found");
      return;
    }
    
    const visitorData = {
      id: visitorId,
      metadata: visitorDoc.data(),
      conversations: []
    };
    
    // Get all conversations
    const conversationsRef = collection(db, "visitors", visitorId, "conversations");
    const conversationsSnapshot = await getDocs(conversationsRef);
    
    for (const convDoc of conversationsSnapshot.docs) {
      const convId = convDoc.id;
      const convData = convDoc.data();
      
      // Get all messages for this conversation
      const messages = await loadConversationHistory(visitorId, convId);
      
      visitorData.conversations.push({
        id: convId,
        metadata: convData,
        messages: messages
      });
    }
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(visitorData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `visitor_${visitorId}_data.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error("Error exporting data:", error);
    alert("Error exporting data");
  }
} 
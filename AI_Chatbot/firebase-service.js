import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, where, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save a user message to Firestore
export async function saveUserMessage(visitorId, conversationId, message, language) {
  try {
    // Create a structure like:
    // visitors/{visitorId}/conversations/{conversationId}/messages/{messageId}
    
    // First, ensure the visitor document exists
    const visitorDocRef = doc(db, "visitors", visitorId);
    const visitorDoc = await getDoc(visitorDocRef);
    
    if (!visitorDoc.exists()) {
      // Create the visitor document if it doesn't exist
      await setDoc(visitorDocRef, {
        firstSeen: serverTimestamp(),
        lastActive: serverTimestamp()
      });
    } else {
      // Update the last active timestamp
      await setDoc(visitorDocRef, { lastActive: serverTimestamp() }, { merge: true });
    }
    
    // Create or get a reference to the conversation document
    const conversationDocRef = doc(db, "visitors", visitorId, "conversations", conversationId);
    
    // Add the message to the "messages" subcollection of this conversation
    const messagesRef = collection(conversationDocRef, "messages");
    
    await addDoc(messagesRef, {
      role: 'user',
      content: message,
      language: language,
      timestamp: serverTimestamp()
    });
    
    // Also update conversation metadata
    await setDoc(conversationDocRef, {
      lastUpdated: serverTimestamp(),
      language: language
    }, { merge: true });
    
  } catch (firebaseError) {
    console.error("Error saving to Firebase:", firebaseError);
    // Continue with the chat even if Firebase fails
  }
}

// Save an assistant message to Firestore
export async function saveAssistantMessage(visitorId, conversationId, message, language) {
  try {
    // Use the visitors/{visitorId}/conversations/{conversationId}/messages path
    const conversationDocRef = doc(db, "visitors", visitorId, "conversations", conversationId);
    const messagesRef = collection(conversationDocRef, "messages");
    
    await addDoc(messagesRef, {
      role: 'assistant',
      content: message,
      language: language,
      timestamp: serverTimestamp()
    });
    
    // Update conversation metadata with last message
    await setDoc(conversationDocRef, {
      lastUpdated: serverTimestamp(),
      lastMessage: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      language: language
    }, { merge: true });
    
    // Also update the visitor document to show last activity
    await setDoc(doc(db, "visitors", visitorId), {
      lastActive: serverTimestamp(),
      lastConversation: conversationId
    }, { merge: true });
    
  } catch (firebaseError) {
    console.error("Error saving to Firebase:", firebaseError);
  }
}

// Retrieve conversation history from Firestore
export async function loadConversationHistory(visitorId, conversationId) {
  try {
    const conversationDocRef = doc(db, "visitors", visitorId, "conversations", conversationId);
    const messagesRef = collection(conversationDocRef, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    
    const querySnapshot = await getDocs(q);
    const messages = [];
    
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    
    return messages;
  } catch (error) {
    console.error("Error loading conversation history:", error);
    return [];
  }
}

// Initialize conversation with welcome message
export async function initConversation(visitorId, conversationId, welcomeMsg, language) {
  try {
    // First, check if this conversation already exists
    const conversationDocRef = doc(db, "visitors", visitorId, "conversations", conversationId);
    const messagesRef = collection(conversationDocRef, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"), where("role", "==", "assistant"), where("content", "==", welcomeMsg));
    
    const querySnapshot = await getDocs(q);
    
    // If welcome message doesn't exist, create it
    if (querySnapshot.empty) {
      // Create the visitor document first if needed
      const visitorDocRef = doc(db, "visitors", visitorId);
      const visitorDoc = await getDoc(visitorDocRef);
      
      if (!visitorDoc.exists()) {
        await setDoc(visitorDocRef, {
          firstSeen: serverTimestamp(),
          lastActive: serverTimestamp(),
          lastConversation: conversationId
        });
      }
      
      // Create the conversation document
      await setDoc(conversationDocRef, {
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        language: language
      });
      
      // Add welcome message to the messages subcollection
      await addDoc(messagesRef, {
        role: 'assistant',
        content: welcomeMsg,
        language: language,
        timestamp: serverTimestamp()
      });
      
      return true; // Indicates a new conversation was created
    }
    
    return false; // Indicates conversation already existed
  } catch (error) {
    console.error("Error initializing conversation:", error);
    return true; // Assume new conversation on error
  }
} 
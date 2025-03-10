const loadingIndicator = document.getElementById('loading-indicator');
let isProcessing = false;
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, where, doc, setDoc, getDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNN9U4wDxIaXBvZUGCBuKB6U2yek-moKE",
  authDomain: "portfolio-5131a.firebaseapp.com",
  projectId: "portfolio-5131a",
  storageBucket: "portfolio-5131a.firebasestorage.app",
  messagingSenderId: "744623893640",
  appId: "1:744623893640:web:1057848baa364d8ef7033d",
  measurementId: "G-29BY80S92J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate a unique conversation ID for each visitor session
const getConversationId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `conv_${timestamp}_${random}`;
  };
  

// Generate a unique visitor ID that persists across conversations
const getVisitorId = () => {
    if (!localStorage.getItem('visitorId')) {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      localStorage.setItem('visitorId', `visitor_${timestamp}_${random}`);
    }
    return localStorage.getItem('visitorId');
  };

async function sendMessage(message) {
  try {
    // Store updated resume as context
    const englishResume = `My resume in english: 
\\name{Mouad Ben lahbib}
\\address{Ottawa, ON K1S, Canada}
\\address{\\href{https://github.com/PopoLeKok0}{GitHub} \\\\ \\href{https://linkedin.com/in/mouadbenlahbib}{LinkedIn} \\\\ \\href{http://mouadbenlahbib.tech/}{Portfolio}}
\\address{+1 (819) 328-0382 \\quad mbenl010@uottawa.ca}

\\begin{document}

%-----------------------------------
% SKILLS
%-----------------------------------
\\begin{rSection}{Skills}
\\small
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
Languages & English, French, Arabic -- Native/Full Proficiency \\\\
Programming & Python, Java, C++, Go, JavaScript, React (Web \\& Native), Node.js, Tailwind CSS, PostgreSQL \\\\
Tools/Methods & Git/GitHub, Firebase, Google Analytics, Jira, Scrum\\\\
Development & Software Dev, Web Dev, Algorithm Design, Data Structures, Debugging \\\\
\\end{tabular}
\\end{rSection}

%-----------------------------------
% EDUCATION
%-----------------------------------
\\begin{rSection}{Education}
{\\small \\textbf{Bachelor of Computer Engineering (Co-op),} \\textit{University of Ottawa} \\hfill \\textit{Sep 2021 -- Dec 2025 (Expected)}}  
\\begin{itemize}
\\itemsep-0.6em % Reduce space between bullet points
\\small % Make bullet point text smaller
\\item Tuition Fee Exemption Scholarship (\\$38k/year) \\& Jean-Pierre Martin Scholarship (\\$1k).
\\end{itemize}
\\end{rSection}

%-----------------------------------
% EXPERIENCE
%-----------------------------------
\\begin{rSection}{Experience}
{\\small \\textbf{Software Developer (Volunteer),} \\textit{Hack The Hill, Ottawa} \\hfill\\textit {Feb 2025 -- Present}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Assisting in hackathon organization with event coordination and software projects.
\\end{itemize}
{\\small \\textbf{IT Instructor (Co-op),} \\textit{University of Ottawa} \\hfill\\textit {Sep 2024 -- Dec 2024}}  
\\begin{itemize}
\\itemsep-0.6em % Reduce space between items
\\small % Make bullet point text smaller
\\item Developed and delivered STEM workshops (Python/Java) integrating 3D printers, robotics, and VR.
\\item Trained educators in coding best practices, managed classrooms, and supported students with special needs.
\\item Designed coding challenges and projects to enhance problem-solving and algorithmic thinking.
\\end{itemize}

{\\small \\textbf{Software Engineer Intern (Co-op),} \\textit{Nidal Info, Morocco} \\hfill\\textit {Jun 2023 -- Sep 2023}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Built and maintained internal web tools (frontend + backend) for telecom equipment management.
\\item  Automated IT monitoring with Python, used Wireshark to optimize network performance.
\\item Refactored legacy codebase to improve performance, maintainability, and scalability of internal web tools.
\\end{itemize}

{\\small \\textbf{Data Analyst,} \\textit{Elemental Data Collection Inc. Ottawa, Canada} \\hfill\\textit {Mar 2022 -- Jun 2022}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Automated data entry via Python (40\\% time savings) and conducted SQL/Excel analyses for stakeholders.
\\item Developed a web-based dashboard to visualize survey data, enabling real-time insights for stakeholders.
\\end{itemize}

{\\small \\textbf{Bilingual Technical Support Analyst,} \\textit{NTT, Ottawa, Canada} \\hfill\\textit {Jun 2022 -- Sep 2022}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Troubleshot payment issues, handled account verifications, and processed credit limit changes using CRM tools.
\\item Documented recurring technical issues, managed customer interactions and case resolution.
\\end{itemize}
\\end{rSection}

%-----------------------------------
% PROJECTS
%-----------------------------------
\\begin{rSection}{Projects}
{\\small \\textbf{Capstone Project – TAILS}
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Developing TAILS, a modular full-stack aerial solution using React Native, Expo Go, AI-based video analysis, real-time geolocation APIs, and PostgreSQL for search, rescue, and wildlife tracking.
\\end{itemize}

{\\small \\textbf{Portfolio Website – Mouadbenlahbib.tech} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Built a full-stack portfolio using React, Tailwind CSS, and Firebase to showcase projects and skills.
\\item Integrated an AI-powered chatbot for interactive technical interview simulations.
\\item Implemented dynamic animations, dark/light mode, and Google Analytics for an engaging user experience.
\\end{itemize}

{\\small \\textbf{Multi-Paradigm Movie Recommendation Engine – FilmForge } 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Implementing recommendation algorithm in Java (OO), Go (Concurrent), Prolog (Logical), and Scheme (Functional) using Jaccard similarity and collaborative filtering techniques.
\\end{itemize}
{\\small \\textbf{Demon Slayer – 2D Action Platformer}} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Developed a 2D action platformer with real-time physics, multi-level platforms, and enemy AI using Pygame.
\\item Implemented a cooldown-based projectile system with multiple attack types and dynamic enemy behaviors.
\\item Designed platform collision detection, jumping mechanics, and combat interactions for an engaging experience with 60 FPS performance.
\\end{itemize}
\\end{rSection}

\\end{document}`;

    const frenchResume = `Mon CV en français : 
\\name{Mouad Ben lahbib}
\\address{Ottawa, ON K1S, Canada}
\\address{\\href{https://github.com/PopoLeKok0}{GitHub} \\\\ \\href{https://linkedin.com/in/mouadbenlahbib}{LinkedIn} \\\\ \\href{http://mouadbenlahbib.tech/}{Portfolio}}
\\address{+1 (819) 328-0382 \\quad mbenl010@uottawa.ca}

\\begin{document}

%-----------------------------------
% COMPÉTENCES
%-----------------------------------
\\begin{rSection}{Compétences}
\\small
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
Langues & Anglais, Français, Arabe -- Natif/Proficient \\\\
Programmation & Python, Java, C++, Go, JavaScript, React (Web \\& Native), Node.js, Tailwind CSS, PostgreSQL \\\\
Outils/Méthodes & Git/GitHub, Firebase, Google Analytics, Jira, Scrum\\\\
Développement & Développement logiciel, Développement web, Conception d'algorithmes, Structures de données, Débogage \\\\
\\end{tabular}
\\end{rSection}

%-----------------------------------
% ÉDUCATION
%-----------------------------------
\\begin{rSection}{Éducation}
{\\small \\textbf{Baccalauréat en Génie Informatique (Co-op),} \\textit{Université d'Ottawa} \\hfill \\textit{Sep 2021 -- Déc 2025 (Prévu)}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Bourse d'exemption des frais de scolarité (\\$38k/an) \\& Bourse Jean-Pierre Martin (\\$1k).
\\end{itemize}
\\end{rSection}

%-----------------------------------
% EXPÉRIENCE
%-----------------------------------
\\begin{rSection}{Expérience}
{\\small \\textbf{Développeur Logiciel (Bénévole),} \\textit{Hack The Hill, Ottawa} \\hfill\\textit {Fév 2025 -- Présent}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Contribution à l'organisation d'un hackathon via la coordination d'événements et des projets logiciels.
\\end{itemize}

{\\small \\textbf{Instructeur en TI (Co-op),} \\textit{Université d'Ottawa} \\hfill\\textit {Sep 2024 -- Déc 2024}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement et animation d'ateliers STEM (Python/Java) intégrant imprimantes 3D, robotique et VR.
\\item Formation des éducateurs aux bonnes pratiques de programmation, gestion de classe et soutien aux élèves en difficulté.
\\item Conception de défis de programmation et de projets pour renforcer la pensée algorithmique.
\\end{itemize}

{\\small \\textbf{Stagiaire Ingénieur Logiciel (Co-op),} \\textit{Nidal Info, Maroc} \\hfill\\textit {Juin 2023 -- Sep 2023}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement et maintenance d'outils web internes (frontend + backend) pour la gestion des équipements télécoms.
\\item Automatisation de la surveillance informatique avec Python, optimisation des performances réseau via Wireshark.
\\item Refactorisation de code pour améliorer les performances et la maintenabilité des outils internes.
\\end{itemize}

{\\small \\textbf{Analyste de Données,} \\textit{Elemental Data Collection Inc. Ottawa, Canada} \\hfill\\textit {Mar 2022 -- Juin 2022}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Automatisation de la saisie de données avec Python (gain de 40\\% en temps) et analyses SQL/Excel pour les parties prenantes.
\\item Développement d'un tableau de bord web pour visualiser les données d'enquêtes en temps réel.
\\end{itemize}

{\\small \\textbf{Analyste Support Technique Bilingue,} \\textit{NTT, Ottawa, Canada} \\hfill\\textit {Juin 2022 -- Sep 2022}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Dépannage des problèmes de paiement, gestion des vérifications de compte et ajustement des limites de crédit via CRM.
\\item Documentation des problèmes techniques récurrents et gestion des interactions avec les clients.
\\end{itemize}
\\end{rSection}

%-----------------------------------
% PROJETS
%-----------------------------------
\\begin{rSection}{Projets}
{\\small \\textbf{Projet de Fin d'Études – TAILS}
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement de TAILS, une solution aérienne modulaire full-stack utilisant React Native, Expo Go, l'analyse vidéo basée sur l'IA, des API de géolocalisation en temps réel et PostgreSQL pour la recherche, le sauvetage et le suivi de la faune.
\\end{itemize}

{\\small \\textbf{Site Web Portfolio – Mouadbenlahbib.tech} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Création d'un portfolio full-stack avec React, Tailwind CSS et Firebase pour présenter les projets et compétences.
\\item Intégration d'un chatbot IA pour des simulations interactives d'entretiens techniques.
\\item Mise en place d'animations dynamiques, mode sombre/clair et Google Analytics pour une expérience utilisateur améliorée.
\\end{itemize}

{\\small \\textbf{Moteur de Recommandation Multi-Paradigme – FilmForge } 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Implémentation d'un algorithme de recommandation en Java (OO), Go (Concurrent), Prolog (Logique) et Scheme (Fonctionnel) en utilisant la similarité de Jaccard et des techniques de filtrage collaboratif.
\\end{itemize}

{\\small \\textbf{Demon Slayer – Jeu de Plateforme 2D}} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement d'un jeu de plateforme 2D avec physique en temps réel, plateformes multi-niveaux et IA ennemie avec Pygame.
\\item Implémentation d'un système de projectiles avec refroidissement et attaques dynamiques.
\\item Conception d'un moteur de détection de collisions, de sauts et d'interactions de combat avec une performance de 60 FPS.
\\end{itemize}
\\end{rSection}

\\end{document}`;


    function detectLanguage(text) {
      const frenchPatterns = [
        /[àáâãäçèéêëìíîïñòóôõöùúûüý]/i,
        /\b(bonjour|salut|merci|je|suis|vous|nous|ils|elles|et|ou|donc|car|pour|dans|sur|avec|sans|chez)\b/i,
        /\b(emploi|travail|école|étude|projet|développement|entreprise|équipe|expérience)\b/i,
        /\b(comment|pourquoi|quand|où|qui|que|quoi|quel|quelle|quels|quelles)\b/i
      ];

      const englishPatterns = [
        /\b(hello|hi|hey|thank|you|we|they|and|or|so|because|for|in|on|with|without|at)\b/i,
        /\b(job|work|school|study|project|development|company|team|experience)\b/i,
        /\b(how|why|when|where|who|what|which)\b/i,
        /\b(software|computer|engineering|position|role|skills|background)\b/i
      ];

      let frenchScore = 0;
      let englishScore = 0;

      frenchPatterns.forEach(pattern => {
        if (pattern.test(text)) frenchScore++;
      });

      englishPatterns.forEach(pattern => {
        if (pattern.test(text)) englishScore++;
      });

      return frenchScore > englishScore ? 'french' : 'english';
    }

    const conversationHistory = window.conversationHistory || [];
    const currentLanguage = detectLanguage(message);
    
    // Get both IDs for organization
    const visitorId = getVisitorId();
    const conversationId = getConversationId();
    
    // Create user message object
    const userMessage = { 
      role: 'user', 
      content: message,
      language: currentLanguage,
      timestamp: new Date().toISOString()
    };
    
    // Add to conversation history
    conversationHistory.push(userMessage);
    
    // Store user message in Firebase with better organization
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
        ...userMessage,
        timestamp: serverTimestamp()
      });
      
      // Also update conversation metadata
      await setDoc(conversationDocRef, {
        lastUpdated: serverTimestamp(),
        language: currentLanguage
      }, { merge: true });
      
    } catch (firebaseError) {
      console.error("Error saving to Firebase:", firebaseError);
      // Continue with the chat even if Firebase fails
    }

    const recentMessages = conversationHistory.slice(-5);

    const personalContext = {
      role: "system",
      content: `You are Mouad Ben lahbib chatting casually with recruiters on my portfolio website. You are originally from Morocco and moved to Canada for your studies at uottawa, currently in your 4th year and have done two Co-op terms, looking for your third and last Co-op placement for Summer 2025 (May 1 to August 31) and also for a full-time position after finishing classes in December 2025. I finish my classes December 2025 but will have to wait until June 2026 to graduate. Respond naturally as if messaging on LinkedIn, your role is to show off my skills and why I am qualified.

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

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=AIzaSyAVUrLkxm-REzS3ttkZbGxOHTY4lfHsFdQ', {
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

    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error?.message || 'API request failed');
    }

    // Add proper error checking
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Received invalid response format from API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    // Create assistant message object
    const assistantMessage = { 
      role: 'assistant', 
      content: aiResponse,
      language: currentLanguage,
      timestamp: new Date().toISOString()
    };

    // Add assistant response to conversation history
    conversationHistory.push(assistantMessage);
    window.conversationHistory = conversationHistory;

    // Store assistant response in Firebase using the improved organization
    try {
      // Use the visitors/{visitorId}/conversations/{conversationId}/messages path
      const conversationDocRef = doc(db, "visitors", visitorId, "conversations", conversationId);
      const messagesRef = collection(conversationDocRef, "messages");
      
      await addDoc(messagesRef, {
        ...assistantMessage,
        timestamp: serverTimestamp()
      });
      
      // Update conversation metadata with last message
      await setDoc(conversationDocRef, {
        lastUpdated: serverTimestamp(),
        lastMessage: aiResponse.substring(0, 100) + (aiResponse.length > 100 ? '...' : ''),
        language: currentLanguage
      }, { merge: true });
      
      // Also update the visitor document to show last activity
      await setDoc(doc(db, "visitors", visitorId), {
        lastActive: serverTimestamp(),
        lastConversation: conversationId
      }, { merge: true });
      
    } catch (firebaseError) {
      console.error("Error saving to Firebase:", firebaseError);
    }

    return aiResponse;
  } catch (error) {
    console.error('Error:', error);
    return "Oops, something went wrong with my connection. Mind trying again? 🙏";
  }
}

function addMessage(message, isUser) {
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

    // Add the actual message
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

// Function to retrieve conversation history from Firebase using the new organization
async function loadConversationHistory(visitorId, conversationId) {
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

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-message');
  const visitorId = getVisitorId();
  const conversationId = getConversationId();
  
  // Step 1: Define the browser language first
  const browserLang = navigator.language.toLowerCase();
  const initialLanguage = browserLang.startsWith('fr') ? 'french' : 'english';
  
  // Step 2: Define welcome messages
  const welcomeMessages = {
    english: "Hi there! 👋 I'm currently completing my Computer Engineering degree at uOttawa and exploring exciting career opportunities. I'd love to learn more about the positions you have available! To start, could you share your name, company, and the role you're hiring for? 😊",
    french: "Bonjour ! 👋 Je suis en train de terminer mon diplôme en génie informatique à l'Université d'Ottawa et je suis à la recherche d'opportunités de carrière intéressantes. J'aimerais en savoir plus sur les postes que vous proposez ! Pour commencer, pourriez-vous me partager votre nom, l'entreprise et le poste que vous proposez ? 😊"
  };
  
  // Step 3: Now you can safely use welcomeMessages with initialLanguage
  const welcomeMsg = welcomeMessages[initialLanguage];
  
  window.conversationHistory = [];
  
  // Initialize Firebase with welcome message using the new organization
  (async function initConversation() {
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
          language: initialLanguage
        });
        
        // Add welcome message to the messages subcollection
        await addDoc(messagesRef, {
          role: 'assistant',
          content: welcomeMsg,
          language: initialLanguage,
          timestamp: serverTimestamp()
        });
        
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
  
  async function handleSendMessage() {
    if (isProcessing) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    isProcessing = true;
    input.value = '';
    loadingIndicator.style.display = 'block';
    sendButton.disabled = true;
    
    addMessage(message, true);
    
    try {
      const response = await sendMessage(message);
      addMessage(response, false);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage("Sorry, I'm having trouble connecting. Please try again later.", false);
    } finally {
      isProcessing = false;
      loadingIndicator.style.display = 'none';
      sendButton.disabled = false;
      input.focus();
    }
  }
  
  sendButton.addEventListener('click', handleSendMessage);
  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  });
  
  // Add a function to display all conversations for admin view
  async function displayConversationsAdmin(password) {
    // Simple password protection (not secure, just basic protection)
    const correctPassword = "your-admin-password"; // Change this
    if (password !== correctPassword) {
      alert("Incorrect password");
      return;
    }
    
    try {
      const visitorsRef = collection(db, "visitors");
      const visitorsSnapshot = await getDocs(visitorsRef);
      
      let adminHtml = '<div class="admin-panel">';
      
      // Loop through each visitor
      for (const visitorDoc of visitorsSnapshot.docs) {
        const visitorId = visitorDoc.id;
        const visitorData = visitorDoc.data();
        
        adminHtml += `<div class="visitor-block">
          <h3>Visitor: ${visitorId}</h3>
          <p>First seen: ${visitorData.firstSeen?.toDate().toLocaleString() || 'Unknown'}</p>
          <p>Last active: ${visitorData.lastActive?.toDate().toLocaleString() || 'Unknown'}</p>`;
        
        // Get all conversations for this visitor
        const conversationsRef = collection(db, "visitors", visitorId, "conversations");
        const conversationsSnapshot = await getDocs(conversationsRef);
        
        adminHtml += '<div class="conversations">';
        
        for (const convDoc of conversationsSnapshot.docs) {
          const convId = convDoc.id;
          const convData = convDoc.data();
          
          adminHtml += `<div class="conversation">
            <h4>Conversation: ${convId}</h4>
            <p>Started: ${convData.createdAt?.toDate().toLocaleString() || 'Unknown'}</p>
            <p>Last updated: ${convData.lastUpdated?.toDate().toLocaleString() || 'Unknown'}</p>
            <p>Language: ${convData.language || 'Unknown'}</p>
            <button onclick="viewConversation('${visitorId}', '${convId}')">View Messages</button>
            <div id="conv-${convId}" class="message-list"></div>
          </div>`;
        }
        
        adminHtml += '</div></div>';
      }
      
      adminHtml += '</div>';
      
      // Create a modal to display this
      const adminModal = document.createElement('div');
      adminModal.className = 'admin-modal';
      adminModal.innerHTML = adminHtml + '<button onclick="closeAdminView()">Close</button>';
      
      document.body.appendChild(adminModal);
      
      // Add CSS for this modal
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
    } catch (error) {
      console.error("Error loading admin view:", error);
      alert("Error loading conversations");
    }
  }
  
  // Function to view a specific conversation
  window.viewConversation = async function(visitorId, convId) {
    const msgContainer = document.getElementById(`conv-${convId}`);
    
    // Toggle visibility
    if (msgContainer.style.display === 'block') {
      msgContainer.style.display = 'none';
      return;
    }
    
    msgContainer.style.display = 'block';
    
    try {
      const messages = await loadConversationHistory(visitorId, convId);
      
      let messagesHtml = '';
      messages.forEach(msg => {
        messagesHtml += `<div class="admin-message ${msg.role === 'user' ? 'admin-user-message' : 'admin-ai-message'}">
          <strong>${msg.role === 'user' ? 'Visitor' : 'Assistant'}:</strong> 
          <span>${msg.timestamp?.toDate().toLocaleString() || 'Unknown'}</span>
          <p>${msg.content}</p>
        </div>`;
      });
      
      msgContainer.innerHTML = messagesHtml || 'No messages found';
    } catch (error) {
      console.error("Error loading messages:", error);
      msgContainer.innerHTML = 'Error loading messages';
    }
  };
  
  // Function to close admin view
  window.closeAdminView = function() {
    const modal = document.querySelector('.admin-modal');
    if (modal) {
      modal.remove();
    }
  };
  
  // Add function to export conversations to JSON for a visitor
  async function exportVisitorData(visitorId) {
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
  });
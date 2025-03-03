const loadingIndicator = document.getElementById('loading-indicator');
let isProcessing = false;
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
Développement & Développement logiciel, Développement web, Conception d’algorithmes, Structures de données, Débogage \\\\
\\end{tabular}
\\end{rSection}

%-----------------------------------
% ÉDUCATION
%-----------------------------------
\\begin{rSection}{Éducation}
{\\small \\textbf{Baccalauréat en Génie Informatique (Co-op),} \\textit{Université d’Ottawa} \\hfill \\textit{Sep 2021 -- Déc 2025 (Prévu)}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Bourse d’exemption des frais de scolarité (\\$38k/an) \\& Bourse Jean-Pierre Martin (\\$1k).
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
\\item Contribution à l’organisation d’un hackathon via la coordination d’événements et des projets logiciels.
\\end{itemize}

{\\small \\textbf{Instructeur en TI (Co-op),} \\textit{Université d’Ottawa} \\hfill\\textit {Sep 2024 -- Déc 2024}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement et animation d’ateliers STEM (Python/Java) intégrant imprimantes 3D, robotique et VR.
\\item Formation des éducateurs aux bonnes pratiques de programmation, gestion de classe et soutien aux élèves en difficulté.
\\item Conception de défis de programmation et de projets pour renforcer la pensée algorithmique.
\\end{itemize}

{\\small \\textbf{Stagiaire Ingénieur Logiciel (Co-op),} \\textit{Nidal Info, Maroc} \\hfill\\textit {Juin 2023 -- Sep 2023}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement et maintenance d’outils web internes (frontend + backend) pour la gestion des équipements télécoms.
\\item Automatisation de la surveillance informatique avec Python, optimisation des performances réseau via Wireshark.
\\item Refactorisation de code pour améliorer les performances et la maintenabilité des outils internes.
\\end{itemize}

{\\small \\textbf{Analyste de Données,} \\textit{Elemental Data Collection Inc. Ottawa, Canada} \\hfill\\textit {Mar 2022 -- Juin 2022}}  
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Automatisation de la saisie de données avec Python (gain de 40\\% en temps) et analyses SQL/Excel pour les parties prenantes.
\\item Développement d’un tableau de bord web pour visualiser les données d’enquêtes en temps réel.
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
{\\small \\textbf{Projet de Fin d’Études – TAILS}
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement de TAILS, une solution aérienne modulaire full-stack utilisant React Native, Expo Go, l’analyse vidéo basée sur l’IA, des API de géolocalisation en temps réel et PostgreSQL pour la recherche, le sauvetage et le suivi de la faune.
\\end{itemize}

{\\small \\textbf{Site Web Portfolio – Mouadbenlahbib.tech} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Création d’un portfolio full-stack avec React, Tailwind CSS et Firebase pour présenter les projets et compétences.
\\item Intégration d’un chatbot IA pour des simulations interactives d’entretiens techniques.
\\item Mise en place d’animations dynamiques, mode sombre/clair et Google Analytics pour une expérience utilisateur améliorée.
\\end{itemize}

{\\small \\textbf{Moteur de Recommandation Multi-Paradigme – FilmForge } 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Implémentation d’un algorithme de recommandation en Java (OO), Go (Concurrent), Prolog (Logique) et Scheme (Fonctionnel) en utilisant la similarité de Jaccard et des techniques de filtrage collaboratif.
\\end{itemize}

{\\small \\textbf{Demon Slayer – Jeu de Plateforme 2D}} 
\\begin{itemize}
\\itemsep-0.6em
\\small
\\item Développement d’un jeu de plateforme 2D avec physique en temps réel, plateformes multi-niveaux et IA ennemie avec Pygame.
\\item Implémentation d’un système de projectiles avec refroidissement et attaques dynamiques.
\\item Conception d’un moteur de détection de collisions, de sauts et d’interactions de combat avec une performance de 60 FPS.
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
        
        conversationHistory.push({ 
            role: 'user', 
            content: message,
            language: currentLanguage
        });

        const recentMessages = conversationHistory.slice(-5);
        
        const personalContext = {
              role: "system",
              content: `You are Mouad Ben lahbib chatting casually with recruiters on my portfolio website. You are originally from Morocco and moved to Canada for your studies at uottawa, currently in your 4th year and have done two Co-op terms, looking for your third and last Co-op placement for Summer 2025 (May 1 to August 31) and also for a full-time position after finishing classes in December 2025. I finish my classes December 2025 but will have to wait until June 2026 to graduate. Respond naturally as if messaging on LinkedIn, your role is to show off my skills and why I am qualified.

Current language: ${currentLanguage}
IMPORTANT: 
- Stay in ${currentLanguage} unless recruiter mixes languages
- You are starting the chat having already said your welcome message "Hi there! 👋 I'm currently completing my Computer Engineering degree at uOttawa and exploring exciting career opportunities. I’d love to learn more about the positions you have available! To start, could you share your name, company, and the role you're hiring for? 😊", so no need to say Hi again, dive directly into the subject.
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

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC0A_76jU7QLxr0DKBEk9srUbpTsex4CcY', {
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
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 50,
                    maxOutputTokens: 1024
                }
            })
        });
        
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        conversationHistory.push({ 
            role: 'assistant', 
            content: aiResponse,
            language: currentLanguage
        });
        window.conversationHistory = conversationHistory;
        
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


document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    window.conversationHistory = [];

    const browserLang = navigator.language.toLowerCase();
    const initialLanguage = browserLang.startsWith('fr') ? 'french' : 'english';

    const welcomeMessages = {
        english: "Hi there! 👋 I'm currently completing my Computer Engineering degree at uOttawa and exploring exciting career opportunities. I’d love to learn more about the positions you have available! To start, could you share your name, company, and the role you're hiring for? 😊",
        french: "Bonjour ! 👋 Je suis en train de terminer mon diplôme en génie informatique à l'Université d'Ottawa et je suis à la recherche d'opportunités de carrière intéressantes. J'aimerais en savoir plus sur les postes que vous proposez ! Pour commencer, pourriez-vous me partager votre nom, l'entreprise et le poste que vous proposez ? 😊"
    };

    addMessage(welcomeMessages[initialLanguage], false);
    

    async function handleSend() {
        if (isProcessing) return;
        
        const message = input.value.trim();
        if (message) {
            try {
                isProcessing = true;
                addMessage(message, true);
                input.value = '';
                input.disabled = true;
                sendButton.disabled = true;
                
                // Show loading indicator with slight delay
                setTimeout(() => {
                    if (isProcessing) {
                        loadingIndicator.style.display = 'flex';
                    }
                }, 300);
    
                const response = await sendMessage(message);
                addMessage(response, false);
                
            } catch (error) {
                console.error('Error:', error);
                addMessage("Hmm, my connection seems shaky. Mind trying again? 🫣", false);
            } finally {
                isProcessing = false;
                loadingIndicator.style.display = 'none';
                input.disabled = false;
                sendButton.disabled = false;
                input.focus();
            }
        }
    }
    

    sendButton.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});

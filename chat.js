const loadingIndicator = document.getElementById('loading-indicator');
let isProcessing = false;
async function sendMessage(message) {
    try {
        // Store both resumes as context
        const englishResume = `My resume in english: 
\\name{Mouad Ben lahbib}
\\address{Ottawa, K1S, Canada}
\\address{\\url{http://github.com/PopoLeKok0/} \\\\ \\url{http://linkedin.com/in/mouadbenlahbib/} \\\\ \\url{https://mouadbenlahbib.tech/}}
\\address{+1 819-328-0382 \\\\ mbenl010@uottawa.ca}

\\begin{document}

\\begin{rSection}{Skills}
\\begin{tabular}{ @{} >{\\bfseries}l @{\hspace{8ex}} l }
Languages & English, French, Arabic – All Native/Bilingual Proficiency\\\\
Programming & Python, Java, C++, JavaScript, HTML, CSS, SystemVerilog, VHDL, SystemC, Git\\\\
Development & Software Development, Web Development, Algorithm Design, Data Structures, Debugging\\\\
Soft Skills & Problem-solving, Teamwork, Time Management, Communication\\\\
\\end{tabular}
\\end{rSection}

\\begin{rSection}{Education}
\\textbf{University of Ottawa, Ottawa, Canada} \\hfill September 2021 - December 2025 (Expected)\\\\
Bachelor of Computer Engineering
\\begin{itemize}
    \\item Admitted with the Differential Tuition Fee Exemption Scholarship (\$38,000 yearly). 
    \\item Jean-Pierre Martin Memorial Scholarship granted for meritorious students enrolled in the Faculty of Engineering (\$1000).
    \\item Developed a traffic light controller using VHDL and FSM, created the "Mealer" app for local cooks in Java, implemented Tic-tac-toe and Old Maid card games, applied DBscan for object detection, and engineered a UART design using VHDL for FPGA implementation.
\\end{itemize}
\\end{rSection}
\\begin{rSection}{Work Experience}
\\textbf{IT Instructor (Co-op)} \\hfill September 2024 - December 2024\\\\
University of Ottawa \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Trained educators in coding, technology integration, and advanced tools like 3D printers, VR headsets, and robotics.
    \\item Delivered STEM workshops in French and English, focusing on coding and engineering principles for youth.
    \\item Developed and implemented technical curriculum, applying skills in Python, Java, and engineering design to enhance educational activities.
\\end{itemize}

\\textbf{Computer Scientist Intern (Co-op)} \\hfill June 2023 - September 2023\\\\
Nidal Info \\hfill Rabat, Morocco
\\begin{itemize}
    \\item Assisted customers in resolving network infrastructure issues.
    \\item Optimized Telecoms and IT (routers, switches, PABX, IPBX, PCs, printers).
    \\item Created a tracking tool in collaboration with the IT group.
\\end{itemize}

\\textbf{Bilingual Sales Representative} \\hfill June 2024 - Present\\\\
Pragma \\hfill Longueuil, Quebec, Canada
\\begin{itemize}
    \\item Provided technical sales support for 1-800-GOT-JUNK?, leveraging CRM tools to manage customer interactions and optimize bookings.
    \\item Won multiple monthly contests for top performance in customer service and sales, generating total sales worth \$150,000, including a milestone \$20,000 transaction.
    \\item Achieved an 80\\% conversion rate, consistently converting sales bookings into transactions.
\\end{itemize}

\\textbf{Bilingual Technical Support Analyst} \\hfill June 2022 - August 2022\\\\
NTT \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Achieved high customer satisfaction rates by solving issues regarding credit and debit cards.
    \\item Conducted customer identity verification and processed credit limit changes using online tools.
\\end{itemize}

\\textbf{Coder} \\hfill April 2022 - June 2022\\\\
Elemental Data Collection Inc. \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Coded survey responses to help companies and the Government of Canada understand public opinion.
    \\item Reduced data entry time significantly by developing a compact Python program with high accuracy.
\\end{itemize}

\\textbf{Bilingual Market Research Interviewer} \\hfill February 2022 - June 2022\\\\
Elemental Data Collection Inc. \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Increased survey respondents by making the experience engaging and enjoyable.
    \\item Enhanced data collection efficiency, achieving exceptional completion rates.
\\end{itemize}
\\end{rSection}

\\end{document}`;

        const frenchResume = `Mon CV en francais: 
\\name{Mouad Ben lahbib}
\\address{Ottawa, K1S, Canada}
\\address{\\url{http://github.com/PopoLeKok0/} \\\\ \\url{http://linkedin.com/in/mouadbenlahbib/} \\\\ \\url{https://mouadbenlahbib.tech/}}
\\address{+1 819-328-0382 \\\\ mbenl010@uottawa.ca}

\\begin{document}

\\begin{rSection}{Compétences}
\\begin{tabular}{ @{} >{\\bfseries}l @{\hspace{8ex}} l }
Langues & \\small Anglais, Français, Arabe  – Maîtrise native ou bilingue\\normalsize\\\\
Programmation & \\small Python, Java, C++, HTML, CSS, JS, SystemVerilog, VHDL, SystemC, Git\\normalsize\\\\
Développement & \\small Dev. Logiciels, Dev. Web, Algorithmes, Structures de données, Débogage\\normalsize\\\\
Compétences Relationnelles & \\small Résolution, Travail d'équipe, Gestion du temps, Communication\\normalsize\\\\
\\end{tabular}
\\end{rSection}

\\begin{rSection}{Éducation}
\\textbf{Université d'Ottawa, Ottawa, Canada} \\hfill Septembre 2021 - Décembre 2025 (Prévu)\\\\
Baccalauréat en Génie Informatique
\\begin{itemize}
    \\item Admis avec la bourse d'exemption des frais de scolarité différentiels (38 000 \$ par an).
    \\item Bourse commémorative Jean-Pierre Martin accordée aux étudiants méritants inscrits à la Faculté de génie (1 000 \$).
    \\item Développé un contrôleur de feux de circulation en utilisant VHDL et FSM, créé l'application "Mealer" pour les cuisiniers locaux en Java, implémenté les jeux Tic-tac-toe et Old Maid, appliqué l'algorithme DBscan pour la détection d'objets, et conçu une interface UART en VHDL pour l'implémentation FPGA.
\\end{itemize}
\\end{rSection}

\\begin{rSection}{Expérience Professionnelle}
\\textbf{Instructeur IT (Co-op)} \\hfill Septembre 2024 - Décembre 2024\\\\
Université d'Ottawa \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Formé des éducateurs sur le codage, l'intégration de la technologie, et l'utilisation d'outils avancés tels que les imprimantes 3D, les casques VR, et la robotique.
    \\item Animé des ateliers STEM en français et en anglais, en mettant l'accent sur les principes du codage et de l'ingénierie pour les jeunes.
    \\item Développé et mis en œuvre des programmes techniques, en appliquant des compétences en Python, Java, et en conception technique pour améliorer les activités éducatives.
\\end{itemize}

\\textbf{Stagiaire Informaticien (Co-op)} \\hfill Juin 2023 - Septembre 2023\\\\
Nidal Info \\hfill Rabat, Maroc
\\begin{itemize}
    \\item Assisté les clients dans la résolution de problèmes d'infrastructure réseau.
    \\item Optimisé les télécoms et IT (routeurs, commutateurs, PABX, IPBX, PC, imprimantes).
    \\item Créé un outil de suivi en collaboration avec l'équipe IT.
    \\item Fournit une assistance proactive aux utilisateurs (bureautique, téléphonie, etc.).
    \\item Géré l'équipement informatique (stations de travail, imprimantes).
\\end{itemize}

\\textbf{Représentant Commercial Bilingue} \\hfill Juin 2024 - Présent\\\\
Pragma \\hfill Longueuil, Québec, Canada
\\begin{itemize}
    \\item Fournit un support technique pour les ventes à 1-800-GOT-JUNK?, en utilisant des outils CRM pour gérer les interactions clients et optimiser les réservations.
    \\item Remporté plusieurs concours mensuels pour la meilleure performance en service client et ventes, générant un total de ventes de 150 000 \\\$, y compris une transaction record de 20 000 \\\$.
    \\item Atteint un taux de conversion de 80\\%, transformant régulièrement les réservations en transactions.
\\end{itemize}

\\textbf{Analyste de soutien technique bilingue} \\hfill Juin 2022 - Août 2022\\\\
NTT \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Atteint des taux de satisfaction client élevés en résolvant efficacement les problèmes liés aux cartes de crédit et de débit.
    \\item Vérifié l'identité des clients, modifié les statuts de compte, et traité des modifications de limites de crédit à l'aide d'outils en ligne.
\\end{itemize}

\\textbf{Programmeur} \\hfill Avril 2022 - Juin 2022\\\\
Elemental Data Collection Inc. \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Contribué au codage des réponses aux enquêtes dans des catégories précises, aidant les entreprises et le gouvernement du Canada à mieux comprendre l'opinion publique.
    \\item Réduit considérablement le temps de saisie des données en développant un programme Python compact et efficace, avec un haut niveau de précision testée.
\\end{itemize}

\\textbf{Enquêteur de Marché Bilingue} \\hfill Février 2022 - Juin 2022\\\\
Elemental Data Collection Inc. \\hfill Ottawa, Canada
\\begin{itemize}
    \\item Augmenté le nombre de répondants aux enquêtes en rendant l'expérience plus intéressante et agréable.
    \\item Amélioré le processus de collecte de données de manière significative, atteignant des jalons d'efficacité remarquables et maintenant un taux d'achèvement exceptionnel.
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

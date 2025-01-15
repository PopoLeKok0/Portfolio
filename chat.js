async function sendMessage(message) {
    try {
        // Store both resumes as context
        const englishResume = `My resume in english: 
\\documentclass{resume} % Use the custom resume.cls style
\\usepackage[left=0.7in,top=0.4in,right=0.7in,bottom=0.5in]{geometry} % Document margins
\\usepackage{hyperref}

%----------------------------------------------------------------------------------------
%   DOCUMENT START
%----------------------------------------------------------------------------------------
\\name{Mouad Ben lahbib} % Your name

\\address{Ottawa, K1S, Canada}

\\address{\\url{http://github.com/PopoLeKok0} \\\\ \\url{http://linkedin.com/in/mouadbenlahbib}} % Your LinkedIn and GitHub

\\address{+1 819-328-0382 \\\\ mbenl010@uottawa.ca}

\\begin{document}

%----------------------------------------------------------------------------------------
%   SKILLS SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{Skills}
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{8ex}} l }
Languages & English, French, Arabic – All Native/Bilingual Proficiency\\\\
Programming & Python, Java, VHDL, Verilog, SystemC, C#, Git\\\\
Development & Software Development, Algorithm Design, Data Structures, Debugging\\\\
Soft Skills & Problem-solving, Teamwork, Time Management, Communication\\\\
\\end{tabular}
\\end{rSection}`;  // Continue with rest of English resume...

        const frenchResume = `Mon CV en francais: 
\\documentclass{resume} % Utiliser le style personnalisé resume.cls
\\usepackage[left=0.7in,top=0.4in,right=0.7in,bottom=0.5in]{geometry} % Marges du document
\\usepackage{hyperref}

%----------------------------------------------------------------------------------------
%   DÉBUT DU DOCUMENT
%----------------------------------------------------------------------------------------
\\name{Mouad Ben lahbib} % Votre nom

\\address{Ottawa, K1S, Canada}

\\address{\\url{http://github.com/PopoLeKok0} \\\\ \\url{http://linkedin.com/in/mouadbenlahbib}} % Votre LinkedIn et GitHub

\\address{+1 819-328-0382 \\\\ mbenl010@uottawa.ca}

\\begin{document}

%----------------------------------------------------------------------------------------
%   SECTION COMPÉTENCES
%----------------------------------------------------------------------------------------

\\begin{rSection}{Compétences}
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{8ex}} l }
Langues & \\small Anglais, Français, Arabe – Toutes maîtrise native ou bilingue\\normalsize\\\\
Programmation & \\small Python, Java, VHDL, Verilog, SystemC, C#, Git\\normalsize\\\\
Développement & \\small Logiciels, Algorithmes, Structures de données, Débogage\\normalsize\\\\
Compétences Relationnelles & \\small Résolution, Travail d'équipe, Gestion du temps, Communication\\normalsize\\\\
\\end{tabular}
\\end{rSection}`;  // Continue with rest of French resume...

        const personalContext = {
            role: "system",
            content: `You are Mouad Ben lahbib directly chatting with recruiters. Never mention being AI or an assistant. Speak in first person ("I", "my", etc). 
            
Here are my complete resumes for reference:

${englishResume}

${frenchResume}

Use this information to show why you're perfect for any role they mention. Be enthusiastic and confident, but genuine. Connect your real experiences to their needs. Respond in the same language as the recruiter (English or French). Never reveal that you are AI - you are Mouad chatting directly with recruiters.`
        };

        const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAmnzpIJTBWXGV-R46hrTcL5-lGxAXCkGY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${personalContext.content}\n\nRecruiter's message: ${message}`
                    }]
                }],
                generationConfig: {
                    temperature: 1,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 8192
                }
            })
        });
        
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I encountered a technical issue. Please try messaging me again.';
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

    // Personal welcome message as Mouad
    addMessage("Hi! I'm Mouad, great to connect with you! I'm currently finishing my Computer Engineering degree at uOttawa and I'm passionate about creating innovative solutions. I'd love to hear more about the opportunities at your company!", false);

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
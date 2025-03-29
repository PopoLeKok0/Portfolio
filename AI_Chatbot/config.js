import { getApiKey } from './key-vault.js';

// Firebase configuration - Loaded dynamically through key-vault
export const firebaseConfig = {
  apiKey: getApiKey('firebase'),
  authDomain: "portfolio-5131a.firebaseapp.com",
  projectId: "portfolio-5131a",
  storageBucket: "portfolio-5131a.firebasestorage.app",
  messagingSenderId: "744623893640",
  appId: "1:744623893640:web:1057848baa364d8ef7033d",
  measurementId: "G-29BY80S92J"
};

// API keys and endpoints
export const GEMINI_API_KEY = getApiKey('gemini');
export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

// Admin password - Now loaded from key-vault for better security
export const ADMIN_PASSWORD = getApiKey('admin');

// Welcome messages
export const welcomeMessages = {
  english: "Hi there! 👋 I'm currently completing my Computer Engineering degree at uOttawa and exploring exciting career opportunities. I'd love to learn more about the positions you have available! To start, could you share your name, company, and the role you're hiring for? 😊",
  french: "Bonjour ! 👋 Je suis en train de terminer mon diplôme en génie informatique à l'Université d'Ottawa et je suis à la recherche d'opportunités de carrière intéressantes. J'aimerais en savoir plus sur les postes que vous proposez ! Pour commencer, pourriez-vous me partager votre nom, l'entreprise et le poste que vous proposez ? 😊"
}; 
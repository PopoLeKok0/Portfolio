/**
 * Simple Key Vault - API key obfuscation
 * 
 * This is a simpler approach to hide API keys from casual inspection
 * while still making them available to the application.
 */

// Obfuscated API keys (Base64 encoded and reversed)
const obfuscatedKeys = {
  firebase: 'Ft0bt1yallnMVZjQLVnQDdUVaZnQYFWS4R0d0UVOO50Q5NVY6lUQ',
  gemini: '4EVVtl3cy4kVDV2YGlkNVl3UFF1Q1FmYxxmSt0UcRR0Q5NVY6lUQ',
  admin: 'drewssaP-nimdA-ruoy=='
};

// Deobfuscation function
function deobfuscate(text) {
  try {
    // First, reverse the Base64 confusion
    const reversed = text.split('').reverse().join('');
    
    // Then decode from Base64
    return atob(reversed);
  } catch (e) {
    console.error('Error deobfuscating key:', e);
    return null;
  }
}

// Get a deobfuscated API key
export function getApiKey(keyName) {
  if (!obfuscatedKeys[keyName]) {
    console.error(`No key found with name: ${keyName}`);
    return null;
  }
  
  try {
    return deobfuscate(obfuscatedKeys[keyName]);
  } catch (e) {
    console.error('Error retrieving key:', e);
    return null;
  }
}

# AI Chat Module

The chat functionality for the portfolio website lives here.

## API Keys

I've hidden the API keys using a simple obfuscation approach. They're not in plain text, but they're accessible to the app when needed.

### Adding New API Keys

Need to update the keys? Here's what to do:

1. Create a quick script locally with something like:

```javascript
// Simple script - don't commit this!
function obfuscateKey(key) {
  const base64 = Buffer.from(key).toString('base64');
  return base64.split('').reverse().join('');
}

const keys = {
  firebase: 'your-new-firebase-key',
  gemini: 'your-new-gemini-key'
};

Object.entries(keys).forEach(([name, key]) => {
  console.log(`${name}: '${obfuscateKey(key)}',`);
});
```

2. Copy the output to the `obfuscatedKeys` object in `key-vault.js`
3. Delete your script

Don't commit actual API keys to the repo - that'll get you in trouble fast.

### How the Key Protection Works

Nothing fancy - just enough to keep the bots away:
- Base64 encode the keys
- Reverse the string
- At runtime, we reverse and decode

It won't stop determined attackers, but keeps the keys from being easily scraped.

## What's in Here

- `index.js` - Ties everything together
- `config.js` - App settings
- `key-vault.js` - Handles the obfuscated keys
- `resumes.js` - Resume content
- `language-utils.js` - Detects user's language 
- `id-generators.js` - Creates unique IDs
- `firebase-service.js` - Database stuff
- `ui-handlers.js` - Manages the chat interface
- `ai-service.js` - Generates AI responses
- `admin-service.js` - Admin panel features 
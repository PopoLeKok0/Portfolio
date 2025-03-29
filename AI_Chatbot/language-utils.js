// Language detection utility
export function detectLanguage(text) {
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
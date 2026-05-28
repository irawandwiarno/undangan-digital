const INDONESIAN_BAD_WORDS = [
  'anjing', 'anjir', 'anjay', 'bangsat', 'bajingan',
  'kampret', 'keparat', 'brengsek', 'tolol', 'goblok',
  'idiot', 'tai', 'taik', 'bacot', 'asu', 'kontol',
  'kntl', 'memek', 'mmk', 'pepek', 'ngentot', 'entot',
  'coli', 'jembut', 'tetek', 'ngewe', 'sange', 'bokep',
  'babi', 'lonte', 'jablay', 'banci', 'pecundang',
  'jancuk', 'jancok', 'cuk', 'cok', 'meki', 'puki',
  'kimak', 'telaso', 'fuck', 'bitch', 'shit', 'asshole',
  'dick', 'pussy', 'manuk', 'bawok', 'matamu', 'taek'
]

const BAD_WORD_PATTERNS = INDONESIAN_BAD_WORDS.map(word => ({
  censor: '*'.repeat(word.length),
  looseRegex: new RegExp(word.split('').join('[\\W_]*'), 'i'),
  strictRegex: new RegExp(word, 'gi'),
}))

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e')
    .replace(/4/g, 'a').replace(/5/g, 's').replace(/7/g, 't')
    .replace(/@/g, 'a').replace(/\$/g, 's').replace(/!/g, 'i')
    .replace(/[^a-z\s]/g, '')
}

export function cleanProfanity(text = '') {
  if (!text) return ''

  // Normalize dulu, filter di normalized, kembalikan normalized
  let cleanText = normalizeText(text)

  for (const { censor, looseRegex } of BAD_WORD_PATTERNS) {
    if (looseRegex.test(cleanText)) {
      cleanText = cleanText.replace(looseRegex, censor)
    }
  }

  return cleanText
}
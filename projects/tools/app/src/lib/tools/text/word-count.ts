export interface WordCountResult {
  totalChars: number;       // all characters including spaces
  charsNoSpaces: number;    // characters excluding spaces
  chineseChars: number;     // CJK characters
  englishWords: number;     // English words
  lines: number;            // line count (empty string = 0 lines)
  paragraphs: number;       // paragraph count (non-empty blocks)
}

export function countWords(text: string): WordCountResult {
  if (!text) return { totalChars: 0, charsNoSpaces: 0, chineseChars: 0, englishWords: 0, lines: 0, paragraphs: 0 };

  const chineseRegex = /[一-鿿㐀-䶿豈-﫿]/g;
  const englishWordRegex = /\b[a-zA-Z]+\b/g;

  return {
    totalChars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    chineseChars: (text.match(chineseRegex) ?? []).length,
    englishWords: (text.match(englishWordRegex) ?? []).length,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0),
  };
}

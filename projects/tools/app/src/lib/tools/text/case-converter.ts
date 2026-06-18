export type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'alternating';

export function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\b\w/g, c => c.toUpperCase());
    case 'sentence': {
      // Lowercase everything first, then uppercase sentence starters
      const lowered = text.toLowerCase();
      return lowered.replace(/(^\s*\w|[.!?]\s+\w)/g, c => c.toUpperCase());
    }
    case 'alternating':
      return text.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
  }
}

export interface RegexMatch {
  value: string;
  index: number;
  groups?: Record<string, string | undefined>;
}

export interface RegexResult {
  matches: RegexMatch[];
  error?: string;
}

export function testRegex(pattern: string, flags: string, text: string): RegexResult {
  if (!pattern) return { matches: [] };
  try {
    const r = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    const matches: RegexMatch[] = [];
    let match: RegExpExecArray | null;
    while ((match = r.exec(text)) !== null) {
      matches.push({ value: match[0], index: match.index, groups: match.groups });
      if (match[0].length === 0) { r.lastIndex++; }
      if (!flags.includes('g')) break;
    }
    return { matches };
  } catch (e) {
    return { matches: [], error: (e as Error).message };
  }
}

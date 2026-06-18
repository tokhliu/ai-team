export interface DeduplicateOptions {
  ignoreCase: boolean;
  ignoreTrim: boolean;
  keepEmpty: boolean;
}

export interface DeduplicateResult {
  output: string;
  removedCount: number;
}

export function deduplicateLines(text: string, options: DeduplicateOptions): DeduplicateResult {
  const lines = text.split('\n');
  const seen = new Set<string>();
  const result: string[] = [];
  let removedCount = 0;

  for (const line of lines) {
    if (!options.keepEmpty && line.trim() === '') continue;
    const key = options.ignoreTrim
      ? (options.ignoreCase ? line.trim().toLowerCase() : line.trim())
      : (options.ignoreCase ? line.toLowerCase() : line);

    if (seen.has(key)) {
      removedCount++;
    } else {
      seen.add(key);
      result.push(line);
    }
  }

  return { output: result.join('\n'), removedCount };
}

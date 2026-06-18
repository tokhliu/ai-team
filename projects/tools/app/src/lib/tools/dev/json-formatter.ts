export type IndentType = '2' | '4' | 'tab';

export interface FormatResult {
  output: string;
  error?: string;
  errorLine?: number;
}

export function formatJson(input: string, indent: IndentType): FormatResult {
  try {
    const parsed = JSON.parse(input);
    const indentStr = indent === 'tab' ? '\t' : parseInt(indent);
    return { output: JSON.stringify(parsed, null, indentStr) };
  } catch (e) {
    const msg = (e as Error).message;
    const lineMatch = msg.match(/at position (\d+)/);
    let errorLine: number | undefined;
    if (lineMatch) {
      const pos = parseInt(lineMatch[1]);
      errorLine = input.substring(0, pos).split('\n').length;
    }
    return { output: '', error: msg, errorLine };
  }
}

export function minifyJson(input: string): FormatResult {
  try {
    const parsed = JSON.parse(input);
    return { output: JSON.stringify(parsed) };
  } catch (e) {
    return { output: '', error: (e as Error).message };
  }
}

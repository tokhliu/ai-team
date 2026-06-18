export type LineBreakAction = 'remove-extra' | 'remove-all' | 'crlf-to-lf' | 'lf-to-crlf';

export function processLineBreaks(text: string, action: LineBreakAction): string {
  switch (action) {
    case 'remove-extra':
      return text.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
    case 'remove-all':
      return text.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    case 'crlf-to-lf':
      return text.replace(/\r\n/g, '\n');
    case 'lf-to-crlf':
      return text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
  }
}

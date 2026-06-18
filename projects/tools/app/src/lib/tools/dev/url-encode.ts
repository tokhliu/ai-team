export function encodeUrl(text: string): string {
  return encodeURIComponent(text);
}

export function decodeUrl(encoded: string): { output: string; error?: string } {
  try {
    return { output: decodeURIComponent(encoded) };
  } catch (e) {
    return { output: '', error: '無效的 URL 編碼字串' };
  }
}

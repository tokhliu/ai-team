export function encodeBase64(text: string): string {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return btoa(text);
  }
}

export function decodeBase64(b64: string): { output: string; error?: string } {
  try {
    return { output: decodeURIComponent(escape(atob(b64.trim()))) };
  } catch (e) {
    return { output: '', error: '無效的 Base64 字串' };
  }
}

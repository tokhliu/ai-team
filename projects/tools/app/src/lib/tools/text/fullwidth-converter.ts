export function toFullWidth(text: string): string {
  return text.replace(/[\x21-\x7e]/g, c => {
    const code = c.charCodeAt(0);
    return String.fromCharCode(code + 0xFEE0);
  }).replace(/ /g, '　');
}

export function toHalfWidth(text: string): string {
  return text.replace(/[！-～]/g, c =>
    String.fromCharCode(c.charCodeAt(0) - 0xFEE0)
  ).replace(/　/g, ' ');
}

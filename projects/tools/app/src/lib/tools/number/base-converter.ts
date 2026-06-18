export function convertBase(value: string, fromBase: number, toBase: number): string | null {
  const num = parseInt(value, fromBase);
  if (isNaN(num)) return null;
  return num.toString(toBase).toUpperCase();
}

export function toAllBases(decimal: number): { bin: string; oct: string; dec: string; hex: string } {
  return {
    bin: decimal.toString(2),
    oct: decimal.toString(8),
    dec: decimal.toString(10),
    hex: decimal.toString(16).toUpperCase(),
  };
}

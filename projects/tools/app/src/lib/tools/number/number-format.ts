export interface FormatOptions {
  thousandSep: ',' | '.' | ' ' | '';
  decimalSep: '.' | ',';
  decimalPlaces: number;
  scientific: boolean;
}

export function formatNumber(input: string, options: FormatOptions): string {
  const num = parseFloat(input.replace(/[^0-9.-]/g, ''));
  if (isNaN(num)) return '';

  if (options.scientific) {
    const exp = num.toExponential(options.decimalPlaces);
    return exp;
  }

  const fixed = num.toFixed(options.decimalPlaces);
  const [intPart, decPart] = fixed.split('.');

  let formattedInt = intPart;
  if (options.thousandSep) {
    formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandSep);
  }

  return decPart !== undefined
    ? `${formattedInt}${options.decimalSep}${decPart}`
    : formattedInt;
}

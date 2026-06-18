export interface UnitDef {
  id: string;
  label: string;
  labelEn: string;
  toBase: (value: number) => number;   // convert to base unit
  fromBase: (base: number) => number;  // convert from base unit
}

// LENGTH — base: meter
export const LENGTH_UNITS: UnitDef[] = [
  { id: 'km', label: '公里', labelEn: 'Kilometer', toBase: v => v * 1000, fromBase: v => v / 1000 },
  { id: 'm', label: '公尺', labelEn: 'Meter', toBase: v => v, fromBase: v => v },
  { id: 'cm', label: '公分', labelEn: 'Centimeter', toBase: v => v / 100, fromBase: v => v * 100 },
  { id: 'mm', label: '公釐', labelEn: 'Millimeter', toBase: v => v / 1000, fromBase: v => v * 1000 },
  { id: 'mi', label: '英里', labelEn: 'Mile', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
  { id: 'yd', label: '碼', labelEn: 'Yard', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
  { id: 'ft', label: '英尺', labelEn: 'Foot', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
  { id: 'in', label: '英寸', labelEn: 'Inch', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
  { id: 'nmi', label: '海里', labelEn: 'Nautical Mile', toBase: v => v * 1852, fromBase: v => v / 1852 },
];

// WEIGHT — base: kilogram
export const WEIGHT_UNITS: UnitDef[] = [
  { id: 't', label: '公噸', labelEn: 'Ton', toBase: v => v * 1000, fromBase: v => v / 1000 },
  { id: 'kg', label: '公斤', labelEn: 'Kilogram', toBase: v => v, fromBase: v => v },
  { id: 'g', label: '公克', labelEn: 'Gram', toBase: v => v / 1000, fromBase: v => v * 1000 },
  { id: 'mg', label: '毫克', labelEn: 'Milligram', toBase: v => v / 1_000_000, fromBase: v => v * 1_000_000 },
  { id: 'lb', label: '磅', labelEn: 'Pound', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
  { id: 'oz', label: '盎司', labelEn: 'Ounce', toBase: v => v * 0.028349523, fromBase: v => v / 0.028349523 },
  { id: 'jin', label: '台斤', labelEn: 'Taiwanese Jin', toBase: v => v * 0.6, fromBase: v => v / 0.6 },
];

// TEMPERATURE — special case (non-linear)
export const TEMPERATURE_UNITS: UnitDef[] = [
  {
    id: 'c', label: '攝氏 (°C)', labelEn: 'Celsius (°C)',
    toBase: v => v,            // base = Celsius
    fromBase: v => v,
  },
  {
    id: 'f', label: '華氏 (°F)', labelEn: 'Fahrenheit (°F)',
    toBase: v => (v - 32) * 5 / 9,
    fromBase: v => v * 9 / 5 + 32,
  },
  {
    id: 'k', label: '克耳文 (K)', labelEn: 'Kelvin (K)',
    toBase: v => v - 273.15,
    fromBase: v => v + 273.15,
  },
];

// AREA — base: square meter
export const AREA_UNITS: UnitDef[] = [
  { id: 'km2', label: '平方公里', labelEn: 'Square Kilometer', toBase: v => v * 1_000_000, fromBase: v => v / 1_000_000 },
  { id: 'm2', label: '平方公尺', labelEn: 'Square Meter', toBase: v => v, fromBase: v => v },
  { id: 'cm2', label: '平方公分', labelEn: 'Square Centimeter', toBase: v => v / 10_000, fromBase: v => v * 10_000 },
  { id: 'ha', label: '公頃', labelEn: 'Hectare', toBase: v => v * 10_000, fromBase: v => v / 10_000 },
  { id: 'ping', label: '坪', labelEn: 'Ping (Taiwan)', toBase: v => v * 3.305785, fromBase: v => v / 3.305785 },
  { id: 'jia', label: '甲', labelEn: 'Jia (Taiwan)', toBase: v => v * 9699.17, fromBase: v => v / 9699.17 },
  { id: 'mi2', label: '平方英里', labelEn: 'Square Mile', toBase: v => v * 2_589_988.11, fromBase: v => v / 2_589_988.11 },
  { id: 'acre', label: '英畝', labelEn: 'Acre', toBase: v => v * 4046.856, fromBase: v => v / 4046.856 },
];

// DATA SIZE — base: bit (binary mode, 1024-based)
// Binary mode: 1 KB = 1024 B = 8192 bits
export const DATA_SIZE_UNITS: UnitDef[] = [
  { id: 'bit', label: 'Bit', labelEn: 'Bit', toBase: v => v, fromBase: v => v },
  { id: 'byte', label: 'Byte', labelEn: 'Byte', toBase: v => v * 8, fromBase: v => v / 8 },
  { id: 'kb', label: 'KB', labelEn: 'Kilobyte', toBase: v => v * 8 * 1024, fromBase: v => v / (8 * 1024) },
  { id: 'mb', label: 'MB', labelEn: 'Megabyte', toBase: v => v * 8 * 1024 ** 2, fromBase: v => v / (8 * 1024 ** 2) },
  { id: 'gb', label: 'GB', labelEn: 'Gigabyte', toBase: v => v * 8 * 1024 ** 3, fromBase: v => v / (8 * 1024 ** 3) },
  { id: 'tb', label: 'TB', labelEn: 'Terabyte', toBase: v => v * 8 * 1024 ** 4, fromBase: v => v / (8 * 1024 ** 4) },
  { id: 'pb', label: 'PB', labelEn: 'Petabyte', toBase: v => v * 8 * 1024 ** 5, fromBase: v => v / (8 * 1024 ** 5) },
];

// DATA SIZE — decimal (1000-based)
export const DATA_SIZE_UNITS_DECIMAL: UnitDef[] = [
  { id: 'bit', label: 'Bit', labelEn: 'Bit', toBase: v => v, fromBase: v => v },
  { id: 'byte', label: 'Byte', labelEn: 'Byte', toBase: v => v * 8, fromBase: v => v / 8 },
  { id: 'kb', label: 'KB', labelEn: 'Kilobyte', toBase: v => v * 8 * 1000, fromBase: v => v / (8 * 1000) },
  { id: 'mb', label: 'MB', labelEn: 'Megabyte', toBase: v => v * 8 * 1000 ** 2, fromBase: v => v / (8 * 1000 ** 2) },
  { id: 'gb', label: 'GB', labelEn: 'Gigabyte', toBase: v => v * 8 * 1000 ** 3, fromBase: v => v / (8 * 1000 ** 3) },
  { id: 'tb', label: 'TB', labelEn: 'Terabyte', toBase: v => v * 8 * 1000 ** 4, fromBase: v => v / (8 * 1000 ** 4) },
  { id: 'pb', label: 'PB', labelEn: 'Petabyte', toBase: v => v * 8 * 1000 ** 5, fromBase: v => v / (8 * 1000 ** 5) },
];

// TIME — base: second
export const TIME_UNITS: UnitDef[] = [
  { id: 'year', label: '年', labelEn: 'Year', toBase: v => v * 365 * 24 * 3600, fromBase: v => v / (365 * 24 * 3600) },
  { id: 'month', label: '月', labelEn: 'Month', toBase: v => v * 30 * 24 * 3600, fromBase: v => v / (30 * 24 * 3600) },
  { id: 'week', label: '週', labelEn: 'Week', toBase: v => v * 7 * 24 * 3600, fromBase: v => v / (7 * 24 * 3600) },
  { id: 'day', label: '天', labelEn: 'Day', toBase: v => v * 24 * 3600, fromBase: v => v / (24 * 3600) },
  { id: 'hour', label: '小時', labelEn: 'Hour', toBase: v => v * 3600, fromBase: v => v / 3600 },
  { id: 'minute', label: '分鐘', labelEn: 'Minute', toBase: v => v * 60, fromBase: v => v / 60 },
  { id: 'second', label: '秒', labelEn: 'Second', toBase: v => v, fromBase: v => v },
  { id: 'ms', label: '毫秒', labelEn: 'Millisecond', toBase: v => v / 1000, fromBase: v => v * 1000 },
];

export function convertUnit(value: number, fromUnit: UnitDef, toUnit: UnitDef): number {
  const base = fromUnit.toBase(value);
  return toUnit.fromBase(base);
}

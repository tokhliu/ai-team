export type ToolCategory = 'text' | 'dev' | 'image' | 'convert' | 'number';

export interface Tool {
  id: string;
  category: ToolCategory;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  searchTerms: string[];
}

export const TOOLS: Tool[] = [
  // Text Tools
  { id: 'word-count', category: 'text', slug: 'word-count', nameKey: 'tools.wordCount.name', descriptionKey: 'tools.wordCount.description', icon: 'FileText', searchTerms: ['字數統計', 'word count', 'words', 'characters', '字元', '行數', 'lines', 'paragraphs', '段落'] },
  { id: 'case-converter', category: 'text', slug: 'case-converter', nameKey: 'tools.caseConverter.name', descriptionKey: 'tools.caseConverter.description', icon: 'Type', searchTerms: ['大小寫轉換', 'case converter', 'uppercase', 'lowercase', '大寫', '小寫', 'camelcase', 'titlecase'] },
  { id: 'fullwidth-converter', category: 'text', slug: 'fullwidth-converter', nameKey: 'tools.fullwidthConverter.name', descriptionKey: 'tools.fullwidthConverter.description', icon: 'AlignJustify', searchTerms: ['全半形轉換', 'full width', 'half width', '全形', '半形', 'fullwidth', 'halfwidth'] },
  { id: 'deduplicator', category: 'text', slug: 'deduplicator', nameKey: 'tools.deduplicator.name', descriptionKey: 'tools.deduplicator.description', icon: 'Filter', searchTerms: ['文字去重', 'deduplicator', 'remove duplicates', '去重複', 'unique lines', '重複行'] },
  { id: 'line-break', category: 'text', slug: 'line-break', nameKey: 'tools.lineBreak.name', descriptionKey: 'tools.lineBreak.description', icon: 'WrapText', searchTerms: ['換行處理', 'line break', 'newline', '換行', 'crlf', 'lf', 'remove newlines'] },
  { id: 'zh-converter', category: 'text', slug: 'zh-converter', nameKey: 'tools.zhConverter.name', descriptionKey: 'tools.zhConverter.description', icon: 'Languages', searchTerms: ['繁簡轉換', '繁體', '簡體', 'traditional chinese', 'simplified chinese', 'zh', 'chinese converter'] },
  // Developer Tools
  { id: 'json-formatter', category: 'dev', slug: 'json-formatter', nameKey: 'tools.jsonFormatter.name', descriptionKey: 'tools.jsonFormatter.description', icon: 'Braces', searchTerms: ['json formatter', 'json 格式化', 'format json', 'prettify', 'minify', 'json beautify', '壓縮'] },
  { id: 'base64', category: 'dev', slug: 'base64', nameKey: 'tools.base64.name', descriptionKey: 'tools.base64.description', icon: 'Binary', searchTerms: ['base64', 'encode', 'decode', '編碼', '解碼', 'base64 encoder', 'base64 decoder'] },
  { id: 'url-encode', category: 'dev', slug: 'url-encode', nameKey: 'tools.urlEncode.name', descriptionKey: 'tools.urlEncode.description', icon: 'Link', searchTerms: ['url encode', 'url decode', 'url 編碼', 'url 解碼', 'percent encode', 'uri encode', 'urlencode'] },
  { id: 'hash', category: 'dev', slug: 'hash', nameKey: 'tools.hashGenerator.name', descriptionKey: 'tools.hashGenerator.description', icon: 'Hash', searchTerms: ['hash', 'md5', 'sha1', 'sha256', 'sha512', '雜湊', 'hash generator', 'checksum'] },
  { id: 'regex-tester', category: 'dev', slug: 'regex-tester', nameKey: 'tools.regexTester.name', descriptionKey: 'tools.regexTester.description', icon: 'Search', searchTerms: ['regex', 'regular expression', '正規表達式', '正則', 'regexp', 'pattern match', 'regex tester'] },
  { id: 'color-converter', category: 'dev', slug: 'color-converter', nameKey: 'tools.colorConverter.name', descriptionKey: 'tools.colorConverter.description', icon: 'Palette', searchTerms: ['color converter', '色碼轉換', 'hex', 'rgb', 'hsl', 'hsv', 'color', '顏色', 'colour'] },
  // Image Tools
  { id: 'compressor', category: 'image', slug: 'compressor', nameKey: 'tools.imageCompressor.name', descriptionKey: 'tools.imageCompressor.description', icon: 'Minimize2', searchTerms: ['圖片壓縮', 'image compressor', 'compress image', 'jpeg', 'png', '壓縮圖片', 'optimize image'] },
  { id: 'resizer', category: 'image', slug: 'resizer', nameKey: 'tools.imageResizer.name', descriptionKey: 'tools.imageResizer.description', icon: 'Maximize', searchTerms: ['圖片尺寸調整', 'image resizer', 'resize image', '調整尺寸', 'width', 'height', 'scale'] },
  { id: 'converter', category: 'image', slug: 'converter', nameKey: 'tools.imageConverter.name', descriptionKey: 'tools.imageConverter.description', icon: 'RefreshCw', searchTerms: ['圖片格式轉換', 'image converter', 'convert image', 'webp', 'jpeg', 'png', '格式轉換'] },
  { id: 'to-base64', category: 'image', slug: 'to-base64', nameKey: 'tools.imageToBase64.name', descriptionKey: 'tools.imageToBase64.description', icon: 'Code', searchTerms: ['圖片轉 base64', 'image to base64', 'data uri', '圖片編碼', 'base64 image', 'data url'] },
  // Unit Converter
  { id: 'length', category: 'convert', slug: 'length', nameKey: 'tools.lengthConverter.name', descriptionKey: 'tools.lengthConverter.description', icon: 'Ruler', searchTerms: ['長度換算', 'length converter', 'meter', 'mile', 'inch', '公尺', '英里', '英寸', 'cm', 'km', 'feet'] },
  { id: 'weight', category: 'convert', slug: 'weight', nameKey: 'tools.weightConverter.name', descriptionKey: 'tools.weightConverter.description', icon: 'Weight', searchTerms: ['重量換算', 'weight converter', 'kg', 'pound', 'ounce', '公斤', '磅', '盎司', 'mass'] },
  { id: 'temperature', category: 'convert', slug: 'temperature', nameKey: 'tools.temperatureConverter.name', descriptionKey: 'tools.temperatureConverter.description', icon: 'Thermometer', searchTerms: ['溫度換算', 'temperature converter', 'celsius', 'fahrenheit', 'kelvin', '攝氏', '華氏', '克耳文'] },
  { id: 'area', category: 'convert', slug: 'area', nameKey: 'tools.areaConverter.name', descriptionKey: 'tools.areaConverter.description', icon: 'Square', searchTerms: ['面積換算', 'area converter', 'hectare', 'acre', '公頃', '坪', '英畝', 'sqm', 'sqft'] },
  { id: 'data-size', category: 'convert', slug: 'data-size', nameKey: 'tools.dataSizeConverter.name', descriptionKey: 'tools.dataSizeConverter.description', icon: 'HardDrive', searchTerms: ['資料大小換算', 'data size', 'byte', 'kb', 'mb', 'gb', 'tb', '位元組', '儲存'] },
  { id: 'time', category: 'convert', slug: 'time', nameKey: 'tools.timeConverter.name', descriptionKey: 'tools.timeConverter.description', icon: 'Clock', searchTerms: ['時間換算', 'time converter', 'second', 'minute', 'hour', 'day', '秒', '分', '時', '天'] },
  // Number Tools
  { id: 'base-converter', category: 'number', slug: 'base-converter', nameKey: 'tools.baseConverter.name', descriptionKey: 'tools.baseConverter.description', icon: 'Calculator', searchTerms: ['進制轉換', 'base converter', 'binary', 'octal', 'decimal', 'hexadecimal', '二進制', '八進制', '十六進制', 'hex'] },
  { id: 'random-generator', category: 'number', slug: 'random-generator', nameKey: 'tools.randomGenerator.name', descriptionKey: 'tools.randomGenerator.description', icon: 'Shuffle', searchTerms: ['隨機數產生器', 'random generator', 'random number', 'uuid', 'random string', '亂數', '隨機'] },
  { id: 'number-format', category: 'number', slug: 'number-format', nameKey: 'tools.numberFormat.name', descriptionKey: 'tools.numberFormat.description', icon: 'Hash', searchTerms: ['數字格式化', 'number format', 'thousands separator', '千分位', 'decimal places', '小數', 'format number'] },
];

export const CATEGORIES: { id: ToolCategory; nameKey: string; icon: string }[] = [
  { id: 'text', nameKey: 'nav.text', icon: 'Type' },
  { id: 'dev', nameKey: 'nav.dev', icon: 'Code' },
  { id: 'image', nameKey: 'nav.image', icon: 'Image' },
  { id: 'convert', nameKey: 'nav.convert', icon: 'ArrowLeftRight' },
  { id: 'number', nameKey: 'nav.number', icon: 'Calculator' },
];

export function getToolPath(tool: Tool): string {
  return `/tools/${tool.category}/${tool.slug}`;
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter(t => t.category === category);
}

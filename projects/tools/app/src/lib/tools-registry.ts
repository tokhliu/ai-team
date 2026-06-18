export type ToolCategory = 'text' | 'dev' | 'image' | 'convert' | 'number';

export interface Tool {
  id: string;
  category: ToolCategory;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
}

export const TOOLS: Tool[] = [
  // Text Tools
  { id: 'word-count', category: 'text', slug: 'word-count', nameKey: 'tools.wordCount.name', descriptionKey: 'tools.wordCount.description', icon: 'FileText' },
  { id: 'case-converter', category: 'text', slug: 'case-converter', nameKey: 'tools.caseConverter.name', descriptionKey: 'tools.caseConverter.description', icon: 'Type' },
  { id: 'fullwidth-converter', category: 'text', slug: 'fullwidth-converter', nameKey: 'tools.fullwidthConverter.name', descriptionKey: 'tools.fullwidthConverter.description', icon: 'AlignJustify' },
  { id: 'deduplicator', category: 'text', slug: 'deduplicator', nameKey: 'tools.deduplicator.name', descriptionKey: 'tools.deduplicator.description', icon: 'Filter' },
  { id: 'line-break', category: 'text', slug: 'line-break', nameKey: 'tools.lineBreak.name', descriptionKey: 'tools.lineBreak.description', icon: 'WrapText' },
  { id: 'zh-converter', category: 'text', slug: 'zh-converter', nameKey: 'tools.zhConverter.name', descriptionKey: 'tools.zhConverter.description', icon: 'Languages' },
  // Developer Tools
  { id: 'json-formatter', category: 'dev', slug: 'json-formatter', nameKey: 'tools.jsonFormatter.name', descriptionKey: 'tools.jsonFormatter.description', icon: 'Braces' },
  { id: 'base64', category: 'dev', slug: 'base64', nameKey: 'tools.base64.name', descriptionKey: 'tools.base64.description', icon: 'Binary' },
  { id: 'url-encode', category: 'dev', slug: 'url-encode', nameKey: 'tools.urlEncode.name', descriptionKey: 'tools.urlEncode.description', icon: 'Link' },
  { id: 'hash', category: 'dev', slug: 'hash', nameKey: 'tools.hashGenerator.name', descriptionKey: 'tools.hashGenerator.description', icon: 'Hash' },
  { id: 'regex-tester', category: 'dev', slug: 'regex-tester', nameKey: 'tools.regexTester.name', descriptionKey: 'tools.regexTester.description', icon: 'Search' },
  { id: 'color-converter', category: 'dev', slug: 'color-converter', nameKey: 'tools.colorConverter.name', descriptionKey: 'tools.colorConverter.description', icon: 'Palette' },
  // Image Tools
  { id: 'compressor', category: 'image', slug: 'compressor', nameKey: 'tools.imageCompressor.name', descriptionKey: 'tools.imageCompressor.description', icon: 'Minimize2' },
  { id: 'resizer', category: 'image', slug: 'resizer', nameKey: 'tools.imageResizer.name', descriptionKey: 'tools.imageResizer.description', icon: 'Maximize' },
  { id: 'converter', category: 'image', slug: 'converter', nameKey: 'tools.imageConverter.name', descriptionKey: 'tools.imageConverter.description', icon: 'RefreshCw' },
  { id: 'to-base64', category: 'image', slug: 'to-base64', nameKey: 'tools.imageToBase64.name', descriptionKey: 'tools.imageToBase64.description', icon: 'Code' },
  // Unit Converter
  { id: 'length', category: 'convert', slug: 'length', nameKey: 'tools.lengthConverter.name', descriptionKey: 'tools.lengthConverter.description', icon: 'Ruler' },
  { id: 'weight', category: 'convert', slug: 'weight', nameKey: 'tools.weightConverter.name', descriptionKey: 'tools.weightConverter.description', icon: 'Weight' },
  { id: 'temperature', category: 'convert', slug: 'temperature', nameKey: 'tools.temperatureConverter.name', descriptionKey: 'tools.temperatureConverter.description', icon: 'Thermometer' },
  { id: 'area', category: 'convert', slug: 'area', nameKey: 'tools.areaConverter.name', descriptionKey: 'tools.areaConverter.description', icon: 'Square' },
  { id: 'data-size', category: 'convert', slug: 'data-size', nameKey: 'tools.dataSizeConverter.name', descriptionKey: 'tools.dataSizeConverter.description', icon: 'HardDrive' },
  { id: 'time', category: 'convert', slug: 'time', nameKey: 'tools.timeConverter.name', descriptionKey: 'tools.timeConverter.description', icon: 'Clock' },
  // Number Tools
  { id: 'base-converter', category: 'number', slug: 'base-converter', nameKey: 'tools.baseConverter.name', descriptionKey: 'tools.baseConverter.description', icon: 'Calculator' },
  { id: 'random-generator', category: 'number', slug: 'random-generator', nameKey: 'tools.randomGenerator.name', descriptionKey: 'tools.randomGenerator.description', icon: 'Shuffle' },
  { id: 'number-format', category: 'number', slug: 'number-format', nameKey: 'tools.numberFormat.name', descriptionKey: 'tools.numberFormat.description', icon: 'Hash' },
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

import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ColorConverterTool from '@/components/tools/dev/ColorConverterTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '色碼轉換' : 'Color Converter',
    description: isZh ? 'HEX、RGB、HSL、HSV 色碼互相轉換' : 'Convert between HEX, RGB, HSL, and HSV color formats',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'color-converter')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="色碼轉換" titleEn="Color Converter" descriptionZh="HEX、RGB、HSL、HSV 色碼互相轉換" descriptionEn="Convert between HEX, RGB, HSL, and HSV color formats">
      <ColorConverterTool />
    </ToolWrapper>
  );
}

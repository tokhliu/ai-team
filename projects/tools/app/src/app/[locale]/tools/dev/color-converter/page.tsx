import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ColorConverterTool from '@/components/tools/dev/ColorConverterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'color-converter')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="色碼轉換" titleEn="Color Converter" descriptionZh="HEX、RGB、HSL、HSV 色碼互相轉換" descriptionEn="Convert between HEX, RGB, HSL, and HSV color formats">
      <ColorConverterTool />
    </ToolWrapper>
  );
}

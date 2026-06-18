import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ZhConverterTool from '@/components/tools/text/ZhConverterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'zh-converter')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="繁簡轉換"
      titleEn="Traditional/Simplified Chinese Converter"
      descriptionZh="繁體中文與簡體中文互相轉換"
      descriptionEn="Convert between Traditional and Simplified Chinese"
    >
      <ZhConverterTool />
    </ToolWrapper>
  );
}

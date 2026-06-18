import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import FullwidthConverterTool from '@/components/tools/text/FullwidthConverterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'fullwidth-converter')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="全半形轉換"
      titleEn="Full/Half Width Converter"
      descriptionZh="在全形與半形字元之間互相轉換"
      descriptionEn="Convert between full-width and half-width characters"
    >
      <FullwidthConverterTool />
    </ToolWrapper>
  );
}

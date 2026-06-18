import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ImageConverterTool from '@/components/tools/image/ImageConverterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'converter')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="圖片格式轉換"
      titleEn="Image Converter"
      descriptionZh="在 JPEG、PNG、WebP 格式之間轉換圖片"
      descriptionEn="Convert images between JPEG, PNG, and WebP formats"
    >
      <ImageConverterTool />
    </ToolWrapper>
  );
}

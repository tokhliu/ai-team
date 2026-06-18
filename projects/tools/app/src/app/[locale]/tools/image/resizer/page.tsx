import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ImageResizerTool from '@/components/tools/image/ImageResizerTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'resizer')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="圖片尺寸調整"
      titleEn="Image Resizer"
      descriptionZh="調整圖片寬高尺寸，支援等比例鎖定"
      descriptionEn="Resize image dimensions with optional aspect ratio lock"
    >
      <ImageResizerTool />
    </ToolWrapper>
  );
}

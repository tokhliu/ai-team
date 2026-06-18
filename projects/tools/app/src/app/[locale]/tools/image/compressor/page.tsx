import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ImageCompressorTool from '@/components/tools/image/ImageCompressorTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'compressor')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="圖片壓縮"
      titleEn="Image Compressor"
      descriptionZh="壓縮 JPEG / PNG 圖片，減少檔案大小"
      descriptionEn="Compress JPEG / PNG images to reduce file size"
    >
      <ImageCompressorTool />
    </ToolWrapper>
  );
}

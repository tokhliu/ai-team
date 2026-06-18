import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import ImageToBase64Tool from '@/components/tools/image/ImageToBase64Tool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'to-base64')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="圖片轉 Base64"
      titleEn="Image to Base64"
      descriptionZh="將圖片轉換為 Base64 編碼 Data URI"
      descriptionEn="Convert images to Base64-encoded Data URI strings"
    >
      <ImageToBase64Tool />
    </ToolWrapper>
  );
}

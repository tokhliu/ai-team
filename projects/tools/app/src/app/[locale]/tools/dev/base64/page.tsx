import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import Base64Tool from '@/components/tools/dev/Base64Tool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'base64')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="Base64 編解碼" titleEn="Base64 Encoder/Decoder" descriptionZh="Base64 字串編碼與解碼" descriptionEn="Encode and decode Base64 strings">
      <Base64Tool />
    </ToolWrapper>
  );
}

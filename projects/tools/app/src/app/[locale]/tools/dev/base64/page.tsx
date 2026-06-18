import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import Base64Tool from '@/components/tools/dev/Base64Tool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? 'Base64 編解碼' : 'Base64 Encoder/Decoder',
    description: isZh ? '文字與 Base64 互轉工具' : 'Encode and decode Base64 strings',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'base64')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="Base64 編解碼" titleEn="Base64 Encoder/Decoder" descriptionZh="Base64 字串編碼與解碼" descriptionEn="Encode and decode Base64 strings">
      <Base64Tool />
    </ToolWrapper>
  );
}

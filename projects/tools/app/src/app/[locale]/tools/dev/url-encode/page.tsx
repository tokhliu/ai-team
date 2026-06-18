import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UrlEncodeTool from '@/components/tools/dev/UrlEncodeTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? 'URL 編解碼' : 'URL Encoder/Decoder',
    description: isZh ? 'URL 百分比編碼與解碼工具' : 'Encode and decode URL percent-encoded strings',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'url-encode')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="URL 編解碼" titleEn="URL Encoder/Decoder" descriptionZh="URL 編碼與解碼" descriptionEn="Encode and decode URL strings">
      <UrlEncodeTool />
    </ToolWrapper>
  );
}

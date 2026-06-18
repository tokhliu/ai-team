import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UrlEncodeTool from '@/components/tools/dev/UrlEncodeTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'url-encode')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="URL 編解碼" titleEn="URL Encoder/Decoder" descriptionZh="URL 編碼與解碼" descriptionEn="Encode and decode URL strings">
      <UrlEncodeTool />
    </ToolWrapper>
  );
}

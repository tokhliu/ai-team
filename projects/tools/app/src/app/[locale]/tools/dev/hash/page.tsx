import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import HashGeneratorTool from '@/components/tools/dev/HashGeneratorTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'hash')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="Hash 產生器" titleEn="Hash Generator" descriptionZh="產生 MD5、SHA-1、SHA-256、SHA-512 雜湊值" descriptionEn="Generate MD5, SHA-1, SHA-256, SHA-512 hashes">
      <HashGeneratorTool />
    </ToolWrapper>
  );
}

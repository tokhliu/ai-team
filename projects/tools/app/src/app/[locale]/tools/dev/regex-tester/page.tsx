import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import RegexTesterTool from '@/components/tools/dev/RegexTesterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'regex-tester')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="正規表達式測試器" titleEn="Regex Tester" descriptionZh="測試與除錯正規表達式" descriptionEn="Test and debug regular expressions">
      <RegexTesterTool />
    </ToolWrapper>
  );
}

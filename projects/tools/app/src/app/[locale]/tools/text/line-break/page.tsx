import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import LineBreakTool from '@/components/tools/text/LineBreakTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'line-break')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="換行處理"
      titleEn="Line Break Handler"
      descriptionZh="移除或轉換文字中的換行符號"
      descriptionEn="Remove or convert line breaks in text"
    >
      <LineBreakTool />
    </ToolWrapper>
  );
}

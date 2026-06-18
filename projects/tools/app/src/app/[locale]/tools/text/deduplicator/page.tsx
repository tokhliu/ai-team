import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import DeduplicatorTool from '@/components/tools/text/DeduplicatorTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'deduplicator')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="文字去重"
      titleEn="Line Deduplicator"
      descriptionZh="移除重複行，保留唯一內容"
      descriptionEn="Remove duplicate lines and keep unique content"
    >
      <DeduplicatorTool />
    </ToolWrapper>
  );
}

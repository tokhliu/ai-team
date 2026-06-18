import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import WordCountTool from '@/components/tools/text/WordCountTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'word-count')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="字數統計"
      titleEn="Word Count"
      descriptionZh="統計文字、字元、行數與段落數"
      descriptionEn="Count words, characters, lines and paragraphs"
    >
      <WordCountTool />
    </ToolWrapper>
  );
}

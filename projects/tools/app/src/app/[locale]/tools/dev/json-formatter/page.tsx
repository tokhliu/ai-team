import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import JsonFormatterTool from '@/components/tools/dev/JsonFormatterTool';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'json-formatter')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="JSON 格式化" titleEn="JSON Formatter" descriptionZh="格式化與壓縮 JSON 資料" descriptionEn="Format and minify JSON data">
      <JsonFormatterTool />
    </ToolWrapper>
  );
}

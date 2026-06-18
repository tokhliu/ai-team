import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import JsonFormatterTool from '@/components/tools/dev/JsonFormatterTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? 'JSON 格式化' : 'JSON Formatter',
    description: isZh ? '線上 JSON 格式化與壓縮工具' : 'Online JSON formatter and minifier',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'json-formatter')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="JSON 格式化" titleEn="JSON Formatter" descriptionZh="格式化與壓縮 JSON 資料" descriptionEn="Format and minify JSON data">
      <JsonFormatterTool />
    </ToolWrapper>
  );
}

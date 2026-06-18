import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import CaseConverterTool from '@/components/tools/text/CaseConverterTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '大小寫轉換' : 'Case Converter',
    description: isZh ? '英文文字大小寫格式轉換工具' : 'Convert text between uppercase, lowercase and other case formats',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'case-converter')!;
  return (
    <ToolWrapper
      tool={tool}
      locale={locale}
      titleZh="大小寫轉換"
      titleEn="Case Converter"
      descriptionZh="轉換英文大小寫格式"
      descriptionEn="Convert text between different case formats"
    >
      <CaseConverterTool />
    </ToolWrapper>
  );
}

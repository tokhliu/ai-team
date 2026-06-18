import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import NumberFormatTool from '@/components/tools/number/NumberFormatTool';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '數字格式化' : 'Number Formatter',
    description: isZh ? '自訂千分位、小數位數與科學記號格式' : 'Format numbers with custom thousand separators, decimal places and scientific notation',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'number-format')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="數字格式化" titleEn="Number Formatter"
      descriptionZh="自訂千分位、小數位數與科學記號格式" descriptionEn="Format numbers with custom thousand separators, decimal places and scientific notation"
    >
      <NumberFormatTool />
    </ToolWrapper>
  );
}

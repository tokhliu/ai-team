import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import BaseConverterTool from '@/components/tools/number/BaseConverterTool';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '進制轉換' : 'Base Converter',
    description: isZh ? '二進制、八進制、十進制、十六進制互相轉換' : 'Convert between binary, octal, decimal and hexadecimal',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'base-converter')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="進制轉換" titleEn="Base Converter"
      descriptionZh="二進制、八進制、十進制、十六進制互相轉換" descriptionEn="Convert between binary, octal, decimal and hexadecimal"
    >
      <BaseConverterTool />
    </ToolWrapper>
  );
}

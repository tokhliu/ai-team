import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterClient from '@/components/tools/converter/UnitConverterClient';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '重量換算' : 'Weight Converter',
    description: isZh ? '公斤、磅、盎司、台斤等重量單位換算' : 'Convert between kilograms, pounds, ounces and more',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'weight')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="重量換算" titleEn="Weight Converter"
      descriptionZh="公斤、磅、盎司、台斤等重量單位換算" descriptionEn="Convert between kilograms, pounds, ounces and more"
    >
      <UnitConverterClient category="weight" />
    </ToolWrapper>
  );
}

import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterLayout from '@/components/tools/converter/UnitConverterLayout';
import { TOOLS } from '@/lib/tools-registry';
import { LENGTH_UNITS } from '@/lib/tools/unit-converter/conversions';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '長度換算' : 'Length Converter',
    description: isZh ? '公里、公尺、英里、英寸等長度單位換算' : 'Convert between kilometers, meters, miles, inches and more',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'length')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="長度換算" titleEn="Length Converter"
      descriptionZh="公里、公尺、英里、英寸等長度單位換算" descriptionEn="Convert between kilometers, meters, miles, inches and more"
    >
      <UnitConverterLayout units={LENGTH_UNITS} defaultUnitId="m" />
    </ToolWrapper>
  );
}

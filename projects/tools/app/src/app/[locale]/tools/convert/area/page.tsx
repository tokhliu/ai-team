import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterLayout from '@/components/tools/converter/UnitConverterLayout';
import { TOOLS } from '@/lib/tools-registry';
import { AREA_UNITS } from '@/lib/tools/unit-converter/conversions';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '面積換算' : 'Area Converter',
    description: isZh ? '平方公尺、公頃、坪、英畝等面積單位換算' : 'Convert between square meters, hectares, acres and more',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'area')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="面積換算" titleEn="Area Converter"
      descriptionZh="平方公尺、公頃、坪、英畝等面積單位換算" descriptionEn="Convert between square meters, hectares, acres and more"
    >
      <UnitConverterLayout units={AREA_UNITS} defaultUnitId="m2" />
    </ToolWrapper>
  );
}

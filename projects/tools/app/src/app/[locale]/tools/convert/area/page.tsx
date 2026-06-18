import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterClient from '@/components/tools/converter/UnitConverterClient';
import { TOOLS } from '@/lib/tools-registry';

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
      <UnitConverterClient category="area" />
    </ToolWrapper>
  );
}

import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterClient from '@/components/tools/converter/UnitConverterClient';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '溫度換算' : 'Temperature Converter',
    description: isZh ? '攝氏、華氏、克耳文溫度換算' : 'Convert between Celsius, Fahrenheit and Kelvin',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'temperature')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="溫度換算" titleEn="Temperature Converter"
      descriptionZh="攝氏、華氏、克耳文溫度換算" descriptionEn="Convert between Celsius, Fahrenheit and Kelvin"
    >
      <UnitConverterClient category="temperature" />
    </ToolWrapper>
  );
}

import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import UnitConverterLayout from '@/components/tools/converter/UnitConverterLayout';
import { TOOLS } from '@/lib/tools-registry';
import { TIME_UNITS } from '@/lib/tools/unit-converter/conversions';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '時間換算' : 'Time Converter',
    description: isZh ? '秒、分鐘、小時、天、週、月、年等時間單位換算' : 'Convert between seconds, minutes, hours, days, weeks, months and years',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'time')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="時間換算" titleEn="Time Converter"
      descriptionZh="秒、分鐘、小時、天、週、月、年等時間單位換算" descriptionEn="Convert between seconds, minutes, hours, days, weeks, months and years"
    >
      <UnitConverterLayout units={TIME_UNITS} defaultUnitId="hour" />
    </ToolWrapper>
  );
}

import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import EpochConverterTool from '@/components/tools/dev/EpochConverterTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? 'Epoch 時間轉換' : 'Epoch Converter',
    description: isZh ? 'Unix timestamp 與日期時間雙向轉換，支援秒與毫秒' : 'Convert between Unix timestamps and human-readable dates',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'epoch')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="Epoch 時間轉換" titleEn="Epoch Converter" descriptionZh="Unix timestamp 與日期時間雙向轉換，支援秒與毫秒" descriptionEn="Convert between Unix timestamps and human-readable dates">
      <EpochConverterTool />
    </ToolWrapper>
  );
}

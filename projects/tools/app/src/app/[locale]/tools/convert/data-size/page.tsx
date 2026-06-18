import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import DataSizeConverterTool from '@/components/tools/converter/DataSizeConverterTool';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '資料大小換算' : 'Data Size Converter',
    description: isZh ? 'Bit、Byte、KB、MB、GB、TB 等資料大小換算，支援二進制與十進制' : 'Convert between bits, bytes, KB, MB, GB, TB with binary and decimal modes',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'data-size')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="資料大小換算" titleEn="Data Size Converter"
      descriptionZh="Bit、Byte、KB、MB、GB、TB 等資料大小換算，支援二進制與十進制" descriptionEn="Convert between bits, bytes, KB, MB, GB, TB with binary and decimal modes"
    >
      <DataSizeConverterTool />
    </ToolWrapper>
  );
}

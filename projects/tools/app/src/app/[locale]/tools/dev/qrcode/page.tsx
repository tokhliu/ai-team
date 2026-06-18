import type { Metadata } from 'next';
import { TOOLS } from '@/lib/tools-registry';
import ToolWrapper from '@/components/layout/ToolWrapper';
import QrCodeGeneratorTool from '@/components/tools/dev/QrCodeGeneratorTool';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? 'QR Code 產生器' : 'QR Code Generator',
    description: isZh ? '即時產生 QR Code，支援自訂尺寸與容錯等級，可下載 PNG' : 'Generate QR codes instantly with custom size and error correction level',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'qrcode')!;
  return (
    <ToolWrapper tool={tool} locale={locale} titleZh="QR Code 產生器" titleEn="QR Code Generator" descriptionZh="即時產生 QR Code，支援自訂尺寸與容錯等級，可下載 PNG" descriptionEn="Generate QR codes instantly with custom size and error correction level">
      <QrCodeGeneratorTool />
    </ToolWrapper>
  );
}

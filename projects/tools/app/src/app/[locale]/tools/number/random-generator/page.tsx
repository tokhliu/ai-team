import type { Metadata } from 'next';
import ToolWrapper from '@/components/layout/ToolWrapper';
import RandomGeneratorTool from '@/components/tools/number/RandomGeneratorTool';
import { TOOLS } from '@/lib/tools-registry';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: isZh ? '隨機數產生器' : 'Random Generator',
    description: isZh ? '產生隨機整數、UUID 與隨機字串' : 'Generate random integers, UUIDs and random strings',
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tool = TOOLS.find(t => t.id === 'random-generator')!;
  return (
    <ToolWrapper tool={tool} locale={locale}
      titleZh="隨機數產生器" titleEn="Random Generator"
      descriptionZh="產生隨機整數、UUID 與隨機字串" descriptionEn="Generate random integers, UUIDs and random strings"
    >
      <RandomGeneratorTool />
    </ToolWrapper>
  );
}

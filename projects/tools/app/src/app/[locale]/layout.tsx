import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Sidebar from '@/components/layout/Sidebar';
import '../globals.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh-TW';
  return {
    title: { template: '%s | ToolVerse', default: isZh ? 'ToolVerse — 線上工具箱' : 'ToolVerse — Online Toolbox' },
    description: isZh
      ? '30+ 免費線上工具，全部在瀏覽器執行，保護您的隱私。文字工具、開發者工具、圖片工具、單位換算。'
      : '30+ free online tools, all running in your browser. Text tools, developer tools, image tools, unit converters.',
    openGraph: {
      title: isZh ? 'ToolVerse — 線上工具箱' : 'ToolVerse — Online Toolbox',
      description: isZh ? '30+ 免費線上工具，保護隱私' : '30+ free online tools, privacy-first',
      type: 'website',
    },
  };
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'zh-TW' | 'en')) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="flex min-h-screen bg-surface-primary text-text-primary">
        <NextIntlClientProvider messages={messages}>
          <Sidebar />
          <main className="flex-1 lg:ml-64 p-4 lg:p-8 min-w-0">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

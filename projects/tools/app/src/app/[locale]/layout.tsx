import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Sidebar from '@/components/layout/Sidebar';
import '../globals.css';

export const metadata: Metadata = {
  title: { template: '%s | ToolVerse', default: 'ToolVerse — 線上工具箱' },
  description: '30+ 免費線上工具，全部在瀏覽器執行，保護您的隱私',
};

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
          <main className="flex-1 ml-64 p-8">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

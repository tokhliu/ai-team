'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 text-text-secondary text-sm">
      <Globe size={14} />
      <button
        onClick={() => switchLocale('zh-TW')}
        className={`${locale === 'zh-TW' ? 'text-accent' : 'hover:text-text-primary'} transition-colors`}
      >
        繁中
      </button>
      <span className="text-text-muted">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={`${locale === 'en' ? 'text-accent' : 'hover:text-text-primary'} transition-colors`}
      >
        EN
      </button>
    </div>
  );
}

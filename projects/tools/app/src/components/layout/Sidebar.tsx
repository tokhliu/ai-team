'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/tools-registry';
import * as Icons from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-surface-secondary hidden lg:flex flex-col z-40">
      {/* Logo */}
      <Link href={`/${locale}`} className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <span className="text-accent text-xl font-mono font-bold">{'<T>'}</span>
        <span className="text-text-primary font-semibold text-lg">ToolVerse</span>
      </Link>

      {/* Category Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <Link
          href={`/${locale}`}
          className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
            pathname === `/${locale}` ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
          }`}
        >
          <Icons.Grid3X3 size={16} />
          {t('nav.home')}
        </Link>
        {CATEGORIES.map(cat => {
          const Icon = (Icons as unknown as Record<string, React.FC<{ size?: number }>>)[cat.icon] ?? Icons.Wrench;
          const href = `/${locale}/tools/${cat.id}`;
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={cat.id}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                isActive ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
              }`}
            >
              <Icon size={16} />
              {t(cat.nameKey)}
            </Link>
          );
        })}
      </nav>

      {/* Language Switcher at bottom */}
      <div className="px-3 py-4 border-t border-border">
        <LanguageSwitcher />
      </div>
    </aside>
  );
}

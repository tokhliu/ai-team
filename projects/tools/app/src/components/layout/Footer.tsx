'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}/privacy`, label: t('privacy') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <footer className="mt-16 border-t border-border pt-6 pb-4 text-sm text-text-secondary">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-text-muted">{t('tagline')}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-4 text-xs text-text-muted">
        © {year} ToolVerse. {t('rights')}
      </p>
    </footer>
  );
}

'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  onSearch: (q: string) => void;
  searchValue: string;
}

export default function TopBar({ onSearch, searchValue }: Props) {
  const t = useTranslations('home');

  return (
    <div className="mb-8">
      <div className="relative max-w-xl">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-9 pr-9 py-2.5 bg-surface-secondary border border-border rounded text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
        />
        {searchValue && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

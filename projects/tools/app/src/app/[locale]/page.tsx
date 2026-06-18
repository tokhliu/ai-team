'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { TOOLS, CATEGORIES, type ToolCategory } from '@/lib/tools-registry';
import { useRecentTools } from '@/lib/hooks/useRecentTools';
import { useFavoritesList } from '@/lib/hooks/useFavorites';
import TopBar from '@/components/layout/TopBar';
import ToolCard from '@/components/ui/ToolCard';

type Tab = 'all' | 'favorites' | 'recent';

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(null);

  const recentIds = useRecentTools();
  const favoriteIds = useFavoritesList();

  // Filter logic
  const filtered = TOOLS.filter(tool => {
    if (activeTab === 'favorites') return favoriteIds.includes(tool.id);
    if (activeTab === 'recent') return recentIds.includes(tool.id);
    if (activeCategory && tool.category !== activeCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return tool.searchTerms.some(term => term.toLowerCase().includes(q));
    }
    return true;
  });

  // Group by category for "all" tab with no search and no category filter
  const groupedTools = CATEGORIES.map(cat => ({
    category: cat,
    tools: filtered.filter(tool => tool.category === cat.id),
  })).filter(g => g.tools.length > 0);

  const navT = useTranslations('nav');

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">{t('title')}</h1>
        <p className="text-text-secondary">{t('subtitle')}</p>
      </div>

      <TopBar onSearch={setSearch} searchValue={search} />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        {(['all', 'favorites', 'recent'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setActiveCategory(null); }}
            className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {t(tab as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {/* Category chips — only in "all" tab when not searching */}
      {activeTab === 'all' && !search && (
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-3 py-1 text-xs rounded border transition-colors ${
                activeCategory === cat.id
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
              }`}
            >
              {navT(cat.nameKey.replace('nav.', '') as Parameters<typeof navT>[0])}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-text-muted text-sm py-12 text-center">{t('noResults')}</p>
      )}

      {/* Tool grid — flat list when filtering/searching or in favorites/recent tabs */}
      {(search || activeCategory || activeTab !== 'all') ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {(activeTab === 'recent'
            ? recentIds.map(id => TOOLS.find(tool => tool.id === id)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
            : filtered
          ).map(tool => (
            <ToolCard key={tool.id} tool={tool} locale={locale} />
          ))}
        </div>
      ) : (
        /* Grouped by category */
        <div className="space-y-10">
          {groupedTools.map(({ category, tools }) => (
            <section key={category.id}>
              <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
                {navT(category.nameKey.replace('nav.', '') as Parameters<typeof navT>[0])}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {tools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

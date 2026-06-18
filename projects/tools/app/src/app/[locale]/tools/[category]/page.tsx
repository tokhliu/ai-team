'use client';

import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { TOOLS, CATEGORIES, type ToolCategory } from '@/lib/tools-registry';
import ToolCard from '@/components/ui/ToolCard';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as ToolCategory;
  const locale = useLocale();
  const t = useTranslations('nav');

  const categoryInfo = CATEGORIES.find(c => c.id === category);
  if (!categoryInfo) notFound();

  const tools = TOOLS.filter(tool => tool.category === category);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary mb-2">
        {t(categoryInfo.nameKey.replace('nav.', '') as Parameters<typeof t>[0])}
      </h1>
      <p className="text-text-secondary text-sm mb-8">{tools.length} tools</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} locale={locale} />
        ))}
      </div>
    </div>
  );
}

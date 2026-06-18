'use client';

import Link from 'next/link';
import * as Icons from 'lucide-react';
import type { Tool } from '@/lib/tools-registry';
import { getToolPath } from '@/lib/tools-registry';
import FavoriteButton from './FavoriteButton';
import { useTranslations } from 'next-intl';

interface Props {
  tool: Tool;
  locale: string;
}

function toCamelCase(id: string): string {
  return id.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

export default function ToolCard({ tool, locale }: Props) {
  const t = useTranslations('tools');
  const Icon = (Icons as unknown as Record<string, React.FC<{ size?: number }>>)[tool.icon] ?? Icons.Wrench;
  const camelKey = toCamelCase(tool.id);

  return (
    <div className="group relative flex flex-col gap-2 p-4 bg-surface-secondary border border-border rounded hover:border-border-hover transition-colors">
      <Link
        href={`/${locale}${getToolPath(tool)}`}
        className="absolute inset-0 z-0"
        aria-label={t(`${camelKey}.name` as Parameters<typeof t>[0])}
      />
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="flex-shrink-0 text-accent">
            <Icon size={16} />
          </span>
          <span className="text-sm font-medium text-text-primary">
            {t(`${camelKey}.name` as Parameters<typeof t>[0])}
          </span>
        </div>
        <div className="relative z-10">
          <FavoriteButton toolId={tool.id} />
        </div>
      </div>
      <p className="text-xs text-text-muted leading-relaxed pl-6">
        {t(`${camelKey}.description` as Parameters<typeof t>[0])}
      </p>
    </div>
  );
}

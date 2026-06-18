import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Tool } from '@/lib/tools-registry';
import FavoriteButton from '@/components/ui/FavoriteButton';
import RecordRecentTool from '@/components/ui/RecordRecentTool';

interface Props {
  tool: Tool;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  locale: string;
  children: React.ReactNode;
}

export default function ToolWrapper({ tool, titleZh, titleEn, descriptionZh, descriptionEn, locale, children }: Props) {
  const title = locale === 'zh-TW' ? titleZh : titleEn;
  const description = locale === 'zh-TW' ? descriptionZh : descriptionEn;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-text-muted text-xs mb-6">
        <Link href={`/${locale}`} className="hover:text-text-secondary transition-colors">
          {locale === 'zh-TW' ? '所有工具' : 'All Tools'}
        </Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary">{title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary mb-1">{title}</h1>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
        <FavoriteButton toolId={tool.id} />
      </div>

      <RecordRecentTool toolId={tool.id} />

      {/* Tool Content */}
      <div>{children}</div>
    </div>
  );
}

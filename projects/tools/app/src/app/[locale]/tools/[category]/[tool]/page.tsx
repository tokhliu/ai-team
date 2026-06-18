import { TOOLS } from '@/lib/tools-registry';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; category: string; tool: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: toolSlug, category } = await params;
  const tool = TOOLS.find(t => t.slug === toolSlug && t.category === category);
  if (!tool) return { title: 'Tool Not Found' };
  return { title: tool.nameKey };
}

export default async function ToolPage({ params }: Props) {
  const { tool: toolSlug, category } = await params;
  const tool = TOOLS.find(t => t.slug === toolSlug && t.category === category);
  if (!tool) notFound();

  return (
    <div className="flex items-center justify-center min-h-64 border border-border rounded bg-surface-secondary">
      <p className="text-text-secondary text-sm">Tool coming soon: {tool.id}</p>
    </div>
  );
}

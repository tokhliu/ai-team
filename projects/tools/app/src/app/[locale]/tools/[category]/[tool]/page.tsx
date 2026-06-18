'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { TOOLS } from '@/lib/tools-registry';
import { recordRecentTool } from '@/lib/hooks/useRecentTools';

export default function ToolPage() {
  const params = useParams();
  const toolSlug = params.tool as string;
  const category = params.category as string;
  const tool = TOOLS.find(t => t.slug === toolSlug && t.category === category);

  useEffect(() => {
    if (tool) recordRecentTool(tool.id);
  }, [tool]);

  if (!tool) {
    return (
      <div className="flex items-center justify-center min-h-64 border border-border rounded bg-surface-secondary">
        <p className="text-text-secondary text-sm">Tool not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64 border border-border rounded bg-surface-secondary">
      <div className="text-center">
        <p className="text-text-secondary text-sm">Tool: {toolSlug}</p>
        <p className="text-xs text-text-muted mt-2">Tool implementation coming soon.</p>
      </div>
    </div>
  );
}

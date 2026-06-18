'use client';

import { useEffect } from 'react';
import { recordRecentTool } from '@/lib/hooks/useRecentTools';

export default function RecordRecentTool({ toolId }: { toolId: string }) {
  useEffect(() => {
    recordRecentTool(toolId);
  }, [toolId]);
  return null;
}

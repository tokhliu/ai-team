'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'toolverse_recent';
const MAX_RECENT = 20;

export function useRecentTools() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setRecent(stored ? JSON.parse(stored) : []);
    } catch { setRecent([]); }
  }, []);

  return recent;
}

export function recordRecentTool(toolId: string) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const recent: string[] = stored ? JSON.parse(stored) : [];
    const filtered = recent.filter(id => id !== toolId);
    const updated = [toolId, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

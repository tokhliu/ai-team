'use client';

import { useState, useMemo } from 'react';
import { deduplicateLines } from '@/lib/tools/text/deduplicator';
import CopyButton from '@/components/ui/CopyButton';

export default function DeduplicatorTool() {
  const [input, setInput] = useState('');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreTrim, setIgnoreTrim] = useState(false);

  const result = useMemo(
    () => deduplicateLines(input, { ignoreCase, ignoreTrim, keepEmpty: false }),
    [input, ignoreCase, ignoreTrim]
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={e => setIgnoreCase(e.target.checked)}
            className="accent-accent"
          />
          忽略大小寫
        </label>
        <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={ignoreTrim}
            onChange={e => setIgnoreTrim(e.target.checked)}
            className="accent-accent"
          />
          忽略前後空白
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="每行輸入一筆資料..."
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸出</label>
          <textarea
            readOnly
            value={result.output}
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
      {result.removedCount > 0 && (
        <p className="text-xs text-accent">
          已移除 {result.removedCount} 行重複內容
        </p>
      )}
      <div className="flex justify-between">
        <button
          onClick={() => setInput('')}
          className="px-3 py-1.5 text-xs border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          清空
        </button>
        <CopyButton text={result.output} />
      </div>
    </div>
  );
}

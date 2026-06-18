'use client';

import { useState } from 'react';
import { toFullWidth, toHalfWidth } from '@/lib/tools/text/fullwidth-converter';
import CopyButton from '@/components/ui/CopyButton';

type Direction = 'half-to-full' | 'full-to-half';

export default function FullwidthConverterTool() {
  const [input, setInput] = useState('');
  const [direction, setDirection] = useState<Direction>('half-to-full');

  const output = input
    ? direction === 'half-to-full'
      ? toFullWidth(input)
      : toHalfWidth(input)
    : '';

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setDirection('half-to-full')}
          className={`px-3 py-1.5 text-xs rounded border transition-colors ${
            direction === 'half-to-full'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          半形 → 全形
        </button>
        <button
          onClick={() => setDirection('full-to-half')}
          className={`px-3 py-1.5 text-xs rounded border transition-colors ${
            direction === 'full-to-half'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          全形 → 半形
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入文字..."
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸出</label>
          <textarea
            readOnly
            value={output}
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary font-mono resize-y focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setInput('')}
          className="px-3 py-1.5 text-xs border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          清空
        </button>
        <CopyButton text={output} />
      </div>
    </div>
  );
}

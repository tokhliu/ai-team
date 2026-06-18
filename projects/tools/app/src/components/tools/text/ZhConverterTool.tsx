'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

type Direction = 'tw-to-cn' | 'cn-to-tw';

type ConverterFn = (text: string) => string;

let converterFromTW: ConverterFn | null = null;
let converterToTW: ConverterFn | null = null;
let openccLoaded = false;

export default function ZhConverterTool() {
  const [input, setInput] = useState('');
  const [direction, setDirection] = useState<Direction>('tw-to-cn');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  async function convert() {
    if (!input) return;
    setLoading(true);

    try {
      if (!openccLoaded) {
        const OpenCC = await import('opencc-js');
        converterFromTW = OpenCC.Converter({ from: 'tw', to: 'cn' });
        converterToTW = OpenCC.Converter({ from: 'cn', to: 'tw' });
        openccLoaded = true;
      }

      const converter = direction === 'tw-to-cn' ? converterFromTW : converterToTW;
      setOutput(converter ? converter(input) : input);
    } catch {
      setOutput(input);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setDirection('tw-to-cn')}
          className={`px-3 py-1.5 text-xs rounded border transition-colors ${
            direction === 'tw-to-cn'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          繁體 → 簡體
        </button>
        <button
          onClick={() => setDirection('cn-to-tw')}
          className={`px-3 py-1.5 text-xs rounded border transition-colors ${
            direction === 'cn-to-tw'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          簡體 → 繁體
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="在此輸入中文..."
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted resize-y focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸出</label>
          <textarea
            readOnly
            value={loading ? '轉換中...' : output}
            className="w-full h-48 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary resize-y focus:outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={convert}
          disabled={!input || loading}
          className="px-4 py-2 text-sm bg-accent text-surface-primary font-medium rounded hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '轉換中...' : '轉換'}
        </button>
        <CopyButton text={output} />
      </div>
    </div>
  );
}

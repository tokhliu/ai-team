'use client';

import { useState } from 'react';
import { formatJson, minifyJson, type IndentType } from '@/lib/tools/dev/json-formatter';
import CopyButton from '@/components/ui/CopyButton';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<IndentType>('2');
  const [result, setResult] = useState<{ output: string; error?: string; errorLine?: number } | null>(null);

  function handleFormat() {
    setResult(formatJson(input, indent));
  }

  function handleMinify() {
    setResult(minifyJson(input));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm text-text-secondary">縮排：</span>
        {(['2', '4', 'tab'] as IndentType[]).map(opt => (
          <button
            key={opt}
            onClick={() => setIndent(opt)}
            className={`px-3 py-1 text-xs border rounded transition-colors ${
              indent === opt
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
            }`}
          >
            {opt === '2' ? '2 spaces' : opt === '4' ? '4 spaces' : 'Tab'}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="在此貼上 JSON..."
        className="w-full h-64 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
      />

      <div className="flex gap-2">
        <button
          onClick={handleFormat}
          className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition-colors"
        >
          格式化
        </button>
        <button
          onClick={handleMinify}
          className="px-4 py-2 text-sm border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          壓縮
        </button>
        <button
          onClick={() => { setInput(''); setResult(null); }}
          className="px-4 py-2 text-sm border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          清空
        </button>
      </div>

      {result && (
        <div className="space-y-2">
          {result.error ? (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
              錯誤：{result.error}
              {result.errorLine && <span className="ml-2 text-red-300">（第 {result.errorLine} 行附近）</span>}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-end">
                <CopyButton text={result.output} />
              </div>
              <textarea
                readOnly
                value={result.output}
                className="w-full h-64 p-3 bg-surface-secondary border border-border rounded text-sm text-text-primary font-mono resize-y focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

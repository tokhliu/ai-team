'use client';

import { useState } from 'react';
import { convertCase, type CaseType } from '@/lib/tools/text/case-converter';
import CopyButton from '@/components/ui/CopyButton';

const CASES: { id: CaseType; label: string }[] = [
  { id: 'upper', label: '全部大寫' },
  { id: 'lower', label: '全部小寫' },
  { id: 'title', label: '首字母大寫' },
  { id: 'sentence', label: '句首大寫' },
  { id: 'alternating', label: '交替大小寫' },
];

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('upper');
  const output = input ? convertCase(input, caseType) : '';

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CASES.map(c => (
          <button
            key={c.id}
            onClick={() => setCaseType(c.id)}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              caseType === c.id
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入英文文字..."
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

'use client';

import { useState, useMemo } from 'react';
import { processLineBreaks, type LineBreakAction } from '@/lib/tools/text/line-break';
import CopyButton from '@/components/ui/CopyButton';

const ACTIONS: { id: LineBreakAction; label: string; desc: string }[] = [
  { id: 'remove-extra', label: '移除多餘換行', desc: '將連續三行以上的空行縮減為兩行' },
  { id: 'remove-all', label: '移除所有換行', desc: '將所有換行替換為空格，合併成單行' },
  { id: 'crlf-to-lf', label: 'CRLF → LF', desc: '將 Windows 換行符轉換為 Unix 格式' },
  { id: 'lf-to-crlf', label: 'LF → CRLF', desc: '將 Unix 換行符轉換為 Windows 格式' },
];

export default function LineBreakTool() {
  const [input, setInput] = useState('');
  const [action, setAction] = useState<LineBreakAction>('remove-extra');

  const output = useMemo(
    () => input ? processLineBreaks(input, action) : '',
    [input, action]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ACTIONS.map(a => (
          <label key={a.id} className="flex items-start gap-2 cursor-pointer p-2 rounded border border-border hover:border-border-hover transition-colors">
            <input
              type="radio"
              name="lineBreakAction"
              value={a.id}
              checked={action === a.id}
              onChange={() => setAction(a.id)}
              className="mt-0.5 accent-accent"
            />
            <div>
              <div className="text-xs text-text-primary font-medium">{a.label}</div>
              <div className="text-xs text-text-muted">{a.desc}</div>
            </div>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted mb-1 block">輸入</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="在此貼上文字..."
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

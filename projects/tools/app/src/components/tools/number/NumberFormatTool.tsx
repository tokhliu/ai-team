'use client';

import { useState } from 'react';
import { formatNumber, type FormatOptions } from '@/lib/tools/number/number-format';
import CopyButton from '@/components/ui/CopyButton';

export default function NumberFormatTool() {
  const [input, setInput] = useState('1234567.89');
  const [options, setOptions] = useState<FormatOptions>({
    thousandSep: ',',
    decimalSep: '.',
    decimalPlaces: 2,
    scientific: false,
  });

  const result = formatNumber(input, options);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-xs text-text-muted mb-1.5">輸入數字</label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="例如：1234567.89"
          className="w-full max-w-sm px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent transition-colors font-mono"
        />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-text-muted mb-1.5">千分位分隔符號</label>
          <select
            value={options.thousandSep}
            onChange={e => setOptions(prev => ({ ...prev, thousandSep: e.target.value as FormatOptions['thousandSep'] }))}
            className="w-full px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent"
          >
            <option value=",">逗號 (,)</option>
            <option value=".">句點 (.)</option>
            <option value=" ">空格 ( )</option>
            <option value="">無</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-text-muted mb-1.5">小數點符號</label>
          <select
            value={options.decimalSep}
            onChange={e => setOptions(prev => ({ ...prev, decimalSep: e.target.value as FormatOptions['decimalSep'] }))}
            className="w-full px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent"
          >
            <option value=".">句點 (.)</option>
            <option value=",">逗號 (,)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-text-muted mb-1.5">小數位數 (0–10)</label>
          <input
            type="number"
            min="0"
            max="10"
            value={options.decimalPlaces}
            onChange={e => setOptions(prev => ({ ...prev, decimalPlaces: Math.min(10, Math.max(0, parseInt(e.target.value) || 0)) }))}
            className="w-full px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3 pt-5">
          <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={options.scientific}
              onChange={e => setOptions(prev => ({ ...prev, scientific: e.target.checked }))}
              className="accent-accent"
            />
            科學記號表示法
          </label>
        </div>
      </div>

      {/* Output */}
      <div>
        <label className="block text-xs text-text-muted mb-1.5">格式化結果</label>
        <div className="flex items-center gap-3">
          <div className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded text-sm font-mono text-text-primary min-h-[40px]">
            {result || <span className="text-text-muted">—</span>}
          </div>
          <CopyButton text={result} />
        </div>
      </div>
    </div>
  );
}

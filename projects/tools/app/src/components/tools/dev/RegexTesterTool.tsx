'use client';

import { useState, useMemo } from 'react';
import { testRegex, type RegexMatch } from '@/lib/tools/dev/regex-tester';

function highlightText(text: string, matches: RegexMatch[]): React.ReactNode {
  if (matches.length === 0) return text;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const sorted = [...matches].sort((a, b) => a.index - b.index);
  for (const match of sorted) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match.value.length > 0) {
      parts.push(
        <mark key={`${match.index}-${match.value}`} className="bg-accent/30 text-text-primary rounded px-0.5">
          {match.value}
        </mark>
      );
    }
    lastIndex = match.index + match.value.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [flags, setFlags] = useState<Record<string, boolean>>({ g: true, i: false, m: false, s: false });

  const flagStr = Object.entries(flags).filter(([, v]) => v).map(([k]) => k).join('');

  const result = useMemo(() => testRegex(pattern, flagStr, testText), [pattern, flagStr, testText]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">正規表達式</label>
        <div className="flex items-center gap-2">
          <span className="text-text-muted font-mono">/</span>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="輸入正規表達式..."
            className="flex-1 p-2 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono focus:outline-none focus:border-accent transition-colors"
          />
          <span className="text-text-muted font-mono">/{flagStr}</span>
        </div>
        {result.error && (
          <p className="text-sm text-red-400">錯誤：{result.error}</p>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        {(['g', 'i', 'm', 's'] as const).map(flag => (
          <label key={flag} className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={flags[flag]}
              onChange={e => setFlags(f => ({ ...f, [flag]: e.target.checked }))}
              className="accent-accent"
            />
            <span className="text-sm font-mono text-text-secondary">
              {flag} — {flag === 'g' ? '全局' : flag === 'i' ? '不分大小寫' : flag === 'm' ? '多行' : '點匹配換行'}
            </span>
          </label>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-text-secondary">測試文字</label>
        <textarea
          value={testText}
          onChange={e => setTestText(e.target.value)}
          placeholder="在此輸入測試文字..."
          className="w-full h-32 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {testText && pattern && !result.error && (
        <div className="space-y-2">
          <label className="text-sm text-text-secondary">
            匹配結果高亮（{result.matches.length} 個匹配）
          </label>
          <div className="w-full min-h-16 p-3 bg-surface-secondary border border-border rounded text-sm text-text-primary font-mono whitespace-pre-wrap break-words">
            {highlightText(testText, result.matches)}
          </div>
        </div>
      )}

      {result.matches.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-text-secondary">匹配列表</label>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-surface-secondary border border-border rounded text-xs">
                <span className="text-text-muted shrink-0">#{i + 1}</span>
                <span className="font-mono text-accent">{JSON.stringify(m.value)}</span>
                <span className="text-text-muted shrink-0">index: {m.index}</span>
                {m.groups && Object.keys(m.groups).length > 0 && (
                  <span className="text-text-muted">groups: {JSON.stringify(m.groups)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

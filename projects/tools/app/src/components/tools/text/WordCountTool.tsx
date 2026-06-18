'use client';

import { useState, useMemo } from 'react';
import { countWords } from '@/lib/tools/text/word-count';

export default function WordCountTool() {
  const [text, setText] = useState('');
  const stats = useMemo(() => countWords(text), [text]);

  const statItems = [
    { label: '總字元數', labelEn: 'Total Characters', value: stats.totalChars },
    { label: '字元（不含空白）', labelEn: 'Chars (no spaces)', value: stats.charsNoSpaces },
    { label: '中文字數', labelEn: 'Chinese Characters', value: stats.chineseChars },
    { label: '英文單字數', labelEn: 'English Words', value: stats.englishWords },
    { label: '行數', labelEn: 'Lines', value: stats.lines },
    { label: '段落數', labelEn: 'Paragraphs', value: stats.paragraphs },
  ];

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="在此輸入或貼上文字..."
        className="w-full h-64 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
      />
      <div className="flex justify-end">
        <button
          onClick={() => setText('')}
          className="px-3 py-1.5 text-xs border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          清空
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {statItems.map(item => (
          <div key={item.label} className="bg-surface-secondary border border-border rounded p-3">
            <div className="text-xl font-mono font-bold text-accent">{item.value.toLocaleString()}</div>
            <div className="text-xs text-text-muted mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

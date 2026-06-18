'use client';

import { useState } from 'react';
import { encodeUrl, decodeUrl } from '@/lib/tools/dev/url-encode';
import CopyButton from '@/components/ui/CopyButton';

type Mode = 'encode' | 'decode';

export default function UrlEncodeTool() {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function handleConvert() {
    setError('');
    if (mode === 'encode') {
      setOutput(encodeUrl(input));
    } else {
      const result = decodeUrl(input);
      if (result.error) {
        setError(result.error);
        setOutput('');
      } else {
        setOutput(result.output);
      }
    }
  }

  function handleModeChange(newMode: Mode) {
    setMode(newMode);
    setInput('');
    setOutput('');
    setError('');
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([['encode', '編碼'], ['decode', '解碼']] as [Mode, string][]).map(([m, label]) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-4 py-2 text-sm border rounded transition-colors ${
              mode === m
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-text-secondary">
          {mode === 'encode' ? '原始文字' : 'URL 編碼字串'}
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={mode === 'encode' ? '在此輸入 URL 或文字...' : '在此貼上 URL 編碼字串...'}
          className="w-full h-32 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleConvert}
          className="px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition-colors"
        >
          {mode === 'encode' ? '編碼' : '解碼'}
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="px-4 py-2 text-sm border border-border text-text-secondary rounded hover:border-border-hover hover:text-text-primary transition-colors"
        >
          清空
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-text-secondary">結果</label>
          <CopyButton text={output} />
        </div>
        <textarea
          readOnly
          value={output}
          className="w-full h-32 p-3 bg-surface-secondary border border-border rounded text-sm text-text-primary font-mono resize-y focus:outline-none"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

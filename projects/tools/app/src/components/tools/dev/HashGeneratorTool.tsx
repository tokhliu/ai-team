'use client';

import { useState, useEffect } from 'react';
import { hashText, type HashAlgo } from '@/lib/tools/dev/hash';
import CopyButton from '@/components/ui/CopyButton';

const ALGOS: HashAlgo[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

export default function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<HashAlgo, string>>({ 'MD5': '', 'SHA-1': '', 'SHA-256': '', 'SHA-512': '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function compute() {
      setLoading(true);
      const results: Partial<Record<HashAlgo, string>> = {};
      for (const algo of ALGOS) {
        results[algo] = await hashText(input, algo);
      }
      if (!cancelled) {
        setHashes(results as Record<HashAlgo, string>);
        setLoading(false);
      }
    }
    compute();
    return () => { cancelled = true; };
  }, [input]);

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="在此輸入文字以產生雜湊值..."
        className="w-full h-32 p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
      />

      <div className="space-y-3">
        {ALGOS.map(algo => (
          <div key={algo} className="bg-surface-secondary border border-border rounded p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-accent uppercase">{algo}</span>
              <CopyButton text={hashes[algo]} />
            </div>
            <div className={`font-mono text-sm break-all ${loading ? 'text-text-muted' : 'text-text-primary'}`}>
              {loading ? '計算中...' : (hashes[algo] || '—')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { randomInt, randomUUID, randomString } from '@/lib/tools/number/random-generator';
import CopyButton from '@/components/ui/CopyButton';

type Tab = 'integer' | 'uuid' | 'string';

const CHAR_SETS = {
  digits: { label: '數字 (0-9)', chars: '0123456789' },
  lowercase: { label: '小寫 (a-z)', chars: 'abcdefghijklmnopqrstuvwxyz' },
  uppercase: { label: '大寫 (A-Z)', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  special: { label: '特殊符號', chars: '!@#$%^&*()-_=+[]{}|;:,.<>?' },
};

export default function RandomGeneratorTool() {
  const [tab, setTab] = useState<Tab>('integer');

  // Integer state
  const [intMin, setIntMin] = useState('1');
  const [intMax, setIntMax] = useState('100');
  const [intCount, setIntCount] = useState('10');
  const [intResults, setIntResults] = useState<number[]>([]);

  // UUID state
  const [uuid, setUuid] = useState('');

  // String state
  const [strLength, setStrLength] = useState('16');
  const [strCount, setStrCount] = useState('5');
  const [charSets, setCharSets] = useState({ digits: true, lowercase: true, uppercase: true, special: false });
  const [strResults, setStrResults] = useState<string[]>([]);

  function generateIntegers() {
    const min = parseInt(intMin);
    const max = parseInt(intMax);
    const count = Math.min(Math.max(parseInt(intCount) || 1, 1), 100);
    if (isNaN(min) || isNaN(max) || min > max) return;
    setIntResults(Array.from({ length: count }, () => randomInt(min, max)));
  }

  function generateUUID() {
    setUuid(randomUUID());
  }

  function generateStrings() {
    const chars = Object.entries(charSets)
      .filter(([, v]) => v)
      .map(([k]) => CHAR_SETS[k as keyof typeof CHAR_SETS].chars)
      .join('');
    if (!chars) return;
    const len = Math.min(Math.max(parseInt(strLength) || 8, 1), 256);
    const count = Math.min(Math.max(parseInt(strCount) || 1, 1), 100);
    setStrResults(Array.from({ length: count }, () => randomString(len, chars)));
  }

  const tabClass = (t: Tab) =>
    `px-4 py-2 text-sm border-b-2 transition-colors ${
      tab === t
        ? 'border-accent text-accent'
        : 'border-transparent text-text-muted hover:text-text-secondary'
    }`;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button className={tabClass('integer')} onClick={() => setTab('integer')}>整數</button>
        <button className={tabClass('uuid')} onClick={() => setTab('uuid')}>UUID</button>
        <button className={tabClass('string')} onClick={() => setTab('string')}>字串</button>
      </div>

      {/* Integer Tab */}
      {tab === 'integer' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs text-text-muted mb-1">最小值</label>
              <input type="number" value={intMin} onChange={e => setIntMin(e.target.value)}
                className="w-28 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">最大值</label>
              <input type="number" value={intMax} onChange={e => setIntMax(e.target.value)}
                className="w-28 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">數量 (1–100)</label>
              <input type="number" min="1" max="100" value={intCount} onChange={e => setIntCount(e.target.value)}
                className="w-20 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <button onClick={generateIntegers}
              className="px-4 py-2 bg-accent text-white rounded text-sm hover:bg-accent/90 transition-colors">
              產生
            </button>
          </div>
          {intResults.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">結果</span>
                <CopyButton text={intResults.join('\n')} />
              </div>
              <div className="bg-surface-secondary border border-border rounded p-3 font-mono text-sm text-text-primary max-h-64 overflow-y-auto">
                {intResults.map((n, i) => <div key={i}>{n}</div>)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* UUID Tab */}
      {tab === 'uuid' && (
        <div className="space-y-4">
          <button onClick={generateUUID}
            className="px-4 py-2 bg-accent text-white rounded text-sm hover:bg-accent/90 transition-colors">
            產生 UUID
          </button>
          {uuid && (
            <div className="flex items-center gap-3">
              <code className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded text-sm font-mono text-text-primary">
                {uuid}
              </code>
              <CopyButton text={uuid} />
            </div>
          )}
        </div>
      )}

      {/* String Tab */}
      {tab === 'string' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs text-text-muted mb-1">長度</label>
              <input type="number" min="1" max="256" value={strLength} onChange={e => setStrLength(e.target.value)}
                className="w-20 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">數量 (1–100)</label>
              <input type="number" min="1" max="100" value={strCount} onChange={e => setStrCount(e.target.value)}
                className="w-20 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(CHAR_SETS) as [keyof typeof CHAR_SETS, { label: string; chars: string }][]).map(([key, cfg]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={charSets[key]}
                  onChange={e => setCharSets(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="accent-accent" />
                {cfg.label}
              </label>
            ))}
          </div>
          <button onClick={generateStrings}
            className="px-4 py-2 bg-accent text-white rounded text-sm hover:bg-accent/90 transition-colors">
            產生
          </button>
          {strResults.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">結果</span>
                <CopyButton text={strResults.join('\n')} />
              </div>
              <div className="bg-surface-secondary border border-border rounded p-3 font-mono text-sm text-text-primary max-h-64 overflow-y-auto">
                {strResults.map((s, i) => <div key={i}>{s}</div>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

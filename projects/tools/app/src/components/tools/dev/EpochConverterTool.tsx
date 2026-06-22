'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CopyButton from '@/components/ui/CopyButton';

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0');
}

// 固定格式 YYYY-MM-DD HH:MM:SS（24 小時制、零補位）。utc=true 時以 UTC 換算。
function formatDateTime(date: Date, utc: boolean): string {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  const day = utc ? date.getUTCDate() : date.getDate();
  const hours = utc ? date.getUTCHours() : date.getHours();
  const minutes = utc ? date.getUTCMinutes() : date.getMinutes();
  const seconds = utc ? date.getUTCSeconds() : date.getSeconds();
  return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function formatDate(date: Date): { local: string; utc: string } {
  return {
    local: formatDateTime(date, false),
    utc: formatDateTime(date, true),
  };
}

function parseTimestamp(raw: string): { date: Date; unit: 's' | 'ms' } | null {
  const n = Number(raw.trim());
  if (!isFinite(n) || raw.trim() === '') return null;
  if (raw.trim().length <= 10) return { date: new Date(n * 1000), unit: 's' };
  return { date: new Date(n), unit: 'ms' };
}

export default function EpochConverterTool() {
  const t = useTranslations('tools.epoch');
  const [now, setNow] = useState(0);
  const [tsInput, setTsInput] = useState('');
  const [dtInput, setDtInput] = useState('');

  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000));
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const parsed = parseTimestamp(tsInput);
  const tsError = tsInput && !parsed;

  const dtSeconds = dtInput ? String(Math.floor(new Date(dtInput).getTime() / 1000)) : '';
  const dtMilliseconds = dtInput ? String(new Date(dtInput).getTime()) : '';

  return (
    <div className="space-y-8">
      {/* Current time */}
      <div className="p-4 bg-surface-secondary border border-border rounded space-y-1">
        <p className="text-xs text-text-muted uppercase tracking-wide">{t('currentTime')}</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-mono text-text-primary">{now}</span>
          <CopyButton text={String(now)} />
        </div>
        <p className="text-xs text-text-secondary">{formatDate(new Date(now * 1000)).local}</p>
      </div>

      {/* Timestamp → Date */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">{t('timestampToDate')}</h3>
        <input
          type="text"
          inputMode="numeric"
          value={tsInput}
          onChange={e => setTsInput(e.target.value)}
          placeholder={t('timestampPlaceholder')}
          className="w-full p-3 bg-surface-primary border border-border rounded text-sm font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
        />
        {tsError && (
          <p className="text-sm text-red-400">{t('invalidTimestamp')}</p>
        )}
        {parsed && (
          <div className="space-y-2">
            <p className="text-xs text-text-muted">{t('autoDetected')}: {parsed.unit === 's' ? t('seconds') : t('milliseconds')}</p>
            <ResultRow label={t('localTime')} value={formatDateTime(parsed.date, false)} mono />
            <ResultRow label={t('utcTime')} value={formatDateTime(parsed.date, true)} mono />
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text-primary">{t('dateToTimestamp')}</h3>
        <input
          type="datetime-local"
          value={dtInput}
          onChange={e => setDtInput(e.target.value)}
          className="w-full p-3 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
        />
        {dtInput && (
          <div className="space-y-2">
            <ResultRow label={t('seconds')} value={dtSeconds} mono />
            <ResultRow label={t('milliseconds')} value={dtMilliseconds} mono />
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-surface-secondary border border-border rounded">
      <span className="text-xs text-text-secondary shrink-0">{label}</span>
      <span className={`text-sm text-text-primary truncate ${mono ? 'font-mono' : ''}`}>{value}</span>
      <CopyButton text={value} />
    </div>
  );
}

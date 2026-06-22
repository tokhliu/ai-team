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

// 以指定 IANA 時區格式化為 YYYY-MM-DD HH:MM:SS（24 小時制）。無效時區回傳空字串。
function formatInTimeZone(date: Date, timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
    }).formatToParts(date);
    const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
    // hour12:false 在部分環境午夜會回傳 "24"，正規化為 "00"
    const hour = get('hour') === '24' ? '00' : get('hour');
    return `${get('year')}-${get('month')}-${get('day')} ${hour}:${get('minute')}:${get('second')}`;
  } catch {
    return '';
  }
}

// 精選常用時區，按區域分組。值為 IANA id，顯示名稱走 i18n（zoneKey）。
const TZ_GROUPS: { regionKey: string; zones: { id: string; key: string }[] }[] = [
  { regionKey: 'general', zones: [
    { id: 'UTC', key: 'utc' },
  ] },
  { regionKey: 'asia', zones: [
    { id: 'Asia/Taipei', key: 'taipei' },
    { id: 'Asia/Tokyo', key: 'tokyo' },
    { id: 'Asia/Shanghai', key: 'shanghai' },
    { id: 'Asia/Hong_Kong', key: 'hongKong' },
    { id: 'Asia/Singapore', key: 'singapore' },
    { id: 'Asia/Seoul', key: 'seoul' },
    { id: 'Asia/Bangkok', key: 'bangkok' },
    { id: 'Asia/Kolkata', key: 'kolkata' },
    { id: 'Asia/Dubai', key: 'dubai' },
  ] },
  { regionKey: 'europe', zones: [
    { id: 'Europe/London', key: 'london' },
    { id: 'Europe/Paris', key: 'paris' },
    { id: 'Europe/Berlin', key: 'berlin' },
    { id: 'Europe/Moscow', key: 'moscow' },
  ] },
  { regionKey: 'america', zones: [
    { id: 'America/New_York', key: 'newYork' },
    { id: 'America/Chicago', key: 'chicago' },
    { id: 'America/Denver', key: 'denver' },
    { id: 'America/Los_Angeles', key: 'losAngeles' },
    { id: 'America/Sao_Paulo', key: 'saoPaulo' },
  ] },
  { regionKey: 'oceania', zones: [
    { id: 'Australia/Sydney', key: 'sydney' },
    { id: 'Pacific/Auckland', key: 'auckland' },
    { id: 'Pacific/Honolulu', key: 'honolulu' },
  ] },
];

// 取得指定時區在 date 當下的 UTC offset 標示（如 UTC+8、UTC-4、UTC+5:30）。DST 正確。
function tzOffsetLabel(date: Date, timeZone: string): string {
  try {
    const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
      .formatToParts(date)
      .find(p => p.type === 'timeZoneName')?.value ?? '';
    const normalized = name.replace('GMT', 'UTC');
    return normalized === 'UTC' ? 'UTC+0' : normalized;
  } catch {
    return '';
  }
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
  const [tz, setTz] = useState('UTC');

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
            <div className="flex items-center justify-between gap-3 p-3 bg-surface-secondary border border-border rounded">
              <select
                value={tz}
                onChange={e => setTz(e.target.value)}
                aria-label={t('selectedTimezone')}
                className="shrink-0 max-w-[55%] p-1.5 bg-surface-primary border border-border rounded text-xs text-text-primary focus:outline-none focus:border-accent transition-colors"
              >
                {TZ_GROUPS.map(group => (
                  <optgroup key={group.regionKey} label={t(`tz.regions.${group.regionKey}`)}>
                    {group.zones.map(z => (
                      <option key={z.id} value={z.id}>
                        {t(`tz.zones.${z.key}`)} ({tzOffsetLabel(parsed.date, z.id)})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span className="text-sm text-text-primary truncate font-mono">{formatInTimeZone(parsed.date, tz)}</span>
              <CopyButton text={formatInTimeZone(parsed.date, tz)} />
            </div>
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

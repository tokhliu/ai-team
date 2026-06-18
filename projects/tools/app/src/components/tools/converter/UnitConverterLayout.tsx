'use client';

import { useState } from 'react';
import { type UnitDef, convertUnit } from '@/lib/tools/unit-converter/conversions';
import CopyButton from '@/components/ui/CopyButton';

interface Props {
  units: UnitDef[];
  defaultUnitId?: string;
  extraControls?: React.ReactNode;  // for data-size decimal/binary toggle
}

function formatResult(value: number): string {
  if (!isFinite(value)) return '—';
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
    return value.toExponential(6);
  }
  // Show up to 10 significant digits but trim trailing zeros
  const str = parseFloat(value.toPrecision(10)).toString();
  return str;
}

export default function UnitConverterLayout({ units, defaultUnitId, extraControls }: Props) {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnitId, setFromUnitId] = useState(defaultUnitId ?? units[0]?.id ?? '');

  const numValue = parseFloat(inputValue);
  const fromUnit = units.find(u => u.id === fromUnitId) ?? units[0];
  const isValid = !isNaN(numValue);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="w-48 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
          placeholder="輸入數值"
        />
        <select
          value={fromUnitId}
          onChange={e => setFromUnitId(e.target.value)}
          className="px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent"
        >
          {units.map(u => (
            <option key={u.id} value={u.id}>{u.label} ({u.labelEn})</option>
          ))}
        </select>
        {extraControls}
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {units.filter(u => u.id !== fromUnitId).map(toUnit => {
          const result = isValid ? convertUnit(numValue, fromUnit!, toUnit) : null;
          const resultStr = result !== null ? formatResult(result) : '—';
          return (
            <div key={toUnit.id} className="flex items-center justify-between bg-surface-secondary border border-border rounded p-3">
              <div>
                <div className="text-xs text-text-muted mb-0.5">{toUnit.label} ({toUnit.labelEn})</div>
                <div className="font-mono text-text-primary text-sm">{resultStr}</div>
              </div>
              <CopyButton text={resultStr === '—' ? '' : resultStr} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

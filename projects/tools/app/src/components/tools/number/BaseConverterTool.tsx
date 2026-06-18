'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

type Base = 'bin' | 'oct' | 'dec' | 'hex';

const BASE_CONFIG: Record<Base, { label: string; radix: number; pattern: RegExp }> = {
  bin: { label: '二進制 (Binary)', radix: 2, pattern: /^-?[01]*$/ },
  oct: { label: '八進制 (Octal)', radix: 8, pattern: /^-?[0-7]*$/ },
  dec: { label: '十進制 (Decimal)', radix: 10, pattern: /^-?[0-9]*$/ },
  hex: { label: '十六進制 (Hex)', radix: 16, pattern: /^-?[0-9a-fA-F]*$/ },
};

export default function BaseConverterTool() {
  const [values, setValues] = useState<Record<Base, string>>({ bin: '', oct: '', dec: '', hex: '' });
  const [hexUppercase, setHexUppercase] = useState(true);
  const [errors, setErrors] = useState<Record<Base, boolean>>({ bin: false, oct: false, dec: false, hex: false });

  const isOverSafe = (dec: string) => {
    const n = parseInt(dec, 10);
    return !isNaN(n) && Math.abs(n) > Number.MAX_SAFE_INTEGER;
  };

  function handleChange(base: Base, input: string) {
    const cfg = BASE_CONFIG[base];
    const isValid = cfg.pattern.test(input);

    if (!isValid && input !== '') {
      setErrors(prev => ({ ...prev, [base]: true }));
      setValues(prev => ({ ...prev, [base]: input }));
      return;
    }

    setErrors({ bin: false, oct: false, dec: false, hex: false });

    if (input === '' || input === '-') {
      setValues({ bin: '', oct: '', dec: '', hex: '' });
      if (input === '-') setValues(prev => ({ ...prev, [base]: '-' }));
      return;
    }

    const decimal = parseInt(input, cfg.radix);
    if (isNaN(decimal)) {
      setErrors(prev => ({ ...prev, [base]: true }));
      setValues(prev => ({ ...prev, [base]: input }));
      return;
    }

    const hexVal = decimal.toString(16);
    setValues({
      bin: decimal.toString(2),
      oct: decimal.toString(8),
      dec: decimal.toString(10),
      hex: hexUppercase ? hexVal.toUpperCase() : hexVal.toLowerCase(),
    });
  }

  const showOverSafeWarning = values.dec && isOverSafe(values.dec);

  return (
    <div className="space-y-6">
      {showOverSafeWarning && (
        <div className="px-4 py-2 bg-amber-900/20 border border-amber-600/40 rounded text-amber-400 text-xs">
          警告：數值超過 JavaScript 安全整數範圍（±2^53 - 1），轉換結果可能不精確。
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(BASE_CONFIG) as Base[]).map(base => (
          <div key={base}>
            <label className="block text-xs text-text-muted mb-1.5">{BASE_CONFIG[base].label}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={values[base]}
                onChange={e => handleChange(base, e.target.value)}
                placeholder={base === 'hex' ? (hexUppercase ? '1A2B' : '1a2b') : undefined}
                className={`flex-1 px-3 py-2 bg-surface-primary border rounded text-sm font-mono text-text-primary focus:outline-none transition-colors ${
                  errors[base] ? 'border-red-500 focus:border-red-400' : 'border-border focus:border-accent'
                }`}
              />
              <CopyButton text={values[base]} />
            </div>
            {errors[base] && (
              <p className="text-xs text-red-400 mt-1">無效的{BASE_CONFIG[base].label.split(' ')[0]}字元</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-text-muted">十六進制格式：</span>
        <button
          onClick={() => {
            setHexUppercase(u => !u);
            setValues(prev => ({
              ...prev,
              hex: hexUppercase ? prev.hex.toLowerCase() : prev.hex.toUpperCase(),
            }));
          }}
          className="px-3 py-1.5 text-xs border border-border rounded text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
        >
          {hexUppercase ? '大寫 (A-F)' : '小寫 (a-f)'}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  hexToRgb, rgbToHex, rgbToHsl, rgbToHsv, hslToRgb, hsvToRgb,
  type RGB, type HSL, type HSV
} from '@/lib/tools/dev/color-converter';
import CopyButton from '@/components/ui/CopyButton';

const DEFAULT_HEX = '#3b82f6';

export default function ColorConverterTool() {
  const [hex, setHex] = useState(DEFAULT_HEX);
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });
  const [hsv, setHsv] = useState<HSV>({ h: 217, s: 76, v: 96 });
  const [hexError, setHexError] = useState('');

  const [hexInput, setHexInput] = useState(DEFAULT_HEX);

  function updateAll(newRgb: RGB) {
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb);
    setHex(newHex);
    setHexInput(newHex);
    setHsl(rgbToHsl(newRgb));
    setHsv(rgbToHsv(newRgb));
    setHexError('');
  }

  function handleHexBlur() {
    const val = hexInput.startsWith('#') ? hexInput : '#' + hexInput;
    const parsed = hexToRgb(val);
    if (parsed) {
      updateAll(parsed);
    } else {
      setHexError('無效的 HEX 格式（需要 6 位十六進制）');
    }
  }

  function handleRgbChange(field: keyof RGB, value: string) {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0));
    const newRgb = { ...rgb, [field]: num };
    updateAll(newRgb);
  }

  function handleHslChange(field: keyof HSL, value: string) {
    const max = field === 'h' ? 360 : 100;
    const num = Math.max(0, Math.min(max, parseInt(value) || 0));
    const newHsl = { ...hsl, [field]: num };
    setHsl(newHsl);
    updateAll(hslToRgb(newHsl));
  }

  function handleHsvChange(field: keyof HSV, value: string) {
    const max = field === 'h' ? 360 : 100;
    const num = Math.max(0, Math.min(max, parseInt(value) || 0));
    const newHsv = { ...hsv, [field]: num };
    setHsv(newHsv);
    updateAll(hsvToRgb(newHsv));
  }

  const inputClass = "w-16 p-1.5 bg-surface-primary border border-border rounded text-sm text-text-primary font-mono text-center focus:outline-none focus:border-accent transition-colors";

  return (
    <div className="space-y-6">
      {/* Color Preview + Picker */}
      <div className="flex items-center gap-4">
        <div
          className="w-24 h-24 rounded-lg border border-border shadow-inner"
          style={{ backgroundColor: hex }}
        />
        <div className="space-y-2">
          <label className="text-sm text-text-secondary block">色彩選擇器</label>
          <input
            type="color"
            value={hex}
            onChange={e => updateAll(hexToRgb(e.target.value) ?? rgb)}
            className="w-12 h-10 rounded cursor-pointer border border-border bg-surface-primary"
          />
        </div>
      </div>

      {/* HEX */}
      <div className="bg-surface-secondary border border-border rounded p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-accent uppercase">HEX</span>
          <CopyButton text={hex} />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={hexInput}
            onChange={e => setHexInput(e.target.value)}
            onBlur={handleHexBlur}
            className="flex-1 p-1.5 bg-surface-primary border border-border rounded text-sm text-text-primary font-mono focus:outline-none focus:border-accent transition-colors"
            placeholder="#rrggbb"
          />
        </div>
        {hexError && <p className="text-xs text-red-400">{hexError}</p>}
      </div>

      {/* RGB */}
      <div className="bg-surface-secondary border border-border rounded p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-accent uppercase">RGB</span>
          <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {(['r', 'g', 'b'] as const).map(field => (
            <div key={field} className="flex items-center gap-1">
              <span className="text-xs text-text-muted uppercase">{field}</span>
              <input
                type="number"
                min={0} max={255}
                value={rgb[field]}
                onChange={e => handleRgbChange(field, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
          <span className="text-sm text-text-muted font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
        </div>
      </div>

      {/* HSL */}
      <div className="bg-surface-secondary border border-border rounded p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-accent uppercase">HSL</span>
          <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {(['h', 's', 'l'] as const).map(field => (
            <div key={field} className="flex items-center gap-1">
              <span className="text-xs text-text-muted uppercase">{field}</span>
              <input
                type="number"
                min={0} max={field === 'h' ? 360 : 100}
                value={hsl[field]}
                onChange={e => handleHslChange(field, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
          <span className="text-sm text-text-muted font-mono">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
        </div>
      </div>

      {/* HSV */}
      <div className="bg-surface-secondary border border-border rounded p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-accent uppercase">HSV</span>
          <CopyButton text={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`} />
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {(['h', 's', 'v'] as const).map(field => (
            <div key={field} className="flex items-center gap-1">
              <span className="text-xs text-text-muted uppercase">{field}</span>
              <input
                type="number"
                min={0} max={field === 'h' ? 360 : 100}
                value={hsv[field]}
                onChange={e => handleHsvChange(field, e.target.value)}
                className={inputClass}
              />
            </div>
          ))}
          <span className="text-sm text-text-muted font-mono">hsv({hsv.h}, {hsv.s}%, {hsv.v}%)</span>
        </div>
      </div>
    </div>
  );
}

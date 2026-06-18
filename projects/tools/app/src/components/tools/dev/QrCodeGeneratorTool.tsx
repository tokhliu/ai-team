'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type QRSize = 128 | 256 | 512;

const SIZES: QRSize[] = [128, 256, 512];
const ERROR_LEVELS: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H'];

export default function QrCodeGeneratorTool() {
  const t = useTranslations('tools.qrcode');
  const [input, setInput] = useState('');
  const [size, setSize] = useState<QRSize>(256);
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !input.trim()) return;
    QRCode.toCanvas(canvas, input, {
      width: size,
      errorCorrectionLevel: errorLevel,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    }).catch(() => {});
  }, [input, size, errorLevel]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !input.trim()) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-text-secondary">{t('inputPlaceholder')}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('inputPlaceholder')}
          rows={3}
          className="w-full p-3 bg-surface-primary border border-border rounded text-sm text-text-primary placeholder-text-muted font-mono resize-y focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="space-y-2">
          <label className="text-sm text-text-secondary">{t('size')}</label>
          <div className="flex gap-2">
            {SIZES.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                  size === s
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-text-secondary">{t('errorLevel')}</label>
          <div className="flex gap-2">
            {ERROR_LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setErrorLevel(l)}
                className={`px-3 py-1.5 text-sm border rounded transition-colors ${
                  errorLevel === l
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="border border-border rounded p-4 bg-white flex items-center justify-center" style={{ minHeight: size, minWidth: size }}>
          {input.trim() ? (
            <canvas ref={canvasRef} />
          ) : (
            <p className="text-sm text-gray-400 text-center px-4">{t('noInput')}</p>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={!input.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          {t('download')}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import ImageDropzone from '@/components/ui/ImageDropzone';
import { Download } from 'lucide-react';

type Format = 'image/jpeg' | 'image/png' | 'image/webp';

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export default function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<Format>('image/webp');
  const [quality, setQuality] = useState(90);
  const [outputUrl, setOutputUrl] = useState('');
  const [outputSize, setOutputSize] = useState(0);
  const [converting, setConverting] = useState(false);

  const formats: { mime: Format; label: string; ext: string }[] = [
    { mime: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
    { mime: 'image/png', label: 'PNG', ext: 'png' },
    { mime: 'image/webp', label: 'WebP', ext: 'webp' },
  ];

  function convert() {
    if (!file) return;
    setConverting(true);
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objUrl);
      canvas.toBlob(blob => {
        if (blob) {
          if (outputUrl) URL.revokeObjectURL(outputUrl);
          const url = URL.createObjectURL(blob);
          setOutputUrl(url);
          setOutputSize(blob.size);
        }
        setConverting(false);
      }, targetFormat, quality / 100);
    };
    img.src = objUrl;
  }

  const currentExt = formats.find(f => f.mime === targetFormat)?.ext ?? 'jpg';

  function download() {
    if (!outputUrl || !file) return;
    const a = document.createElement('a');
    const baseName = file.name.split('.').slice(0, -1).join('.');
    a.href = outputUrl;
    a.download = `${baseName}.${currentExt}`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <ImageDropzone onFileSelect={f => { setFile(f); setOutputUrl(''); }} />
      {file && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-muted block mb-2">輸出格式</label>
            <div className="flex gap-2">
              {formats.map(f => (
                <button key={f.mime} onClick={() => setTargetFormat(f.mime)}
                  className={`px-4 py-2 text-sm rounded border transition-colors ${targetFormat === f.mime ? 'border-accent text-accent bg-accent/10' : 'border-border text-text-secondary hover:border-border-hover'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {targetFormat !== 'image/png' && (
            <div className="flex items-center gap-4">
              <label className="text-sm text-text-secondary">品質: {quality}%</label>
              <input type="range" min={1} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="flex-1 accent-[#00d4aa]" />
            </div>
          )}
          <div className="flex items-center gap-4">
            <button onClick={convert} disabled={converting}
              className="px-4 py-2 bg-accent text-surface-primary text-sm font-medium rounded hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {converting ? '轉換中...' : '轉換'}
            </button>
            {file && outputSize > 0 && (
              <p className="text-xs text-text-muted">
                {formatBytes(file.size)} → <span className="text-accent">{formatBytes(outputSize)}</span>
              </p>
            )}
          </div>
          {outputUrl && (
            <div className="flex items-start gap-4">
              <img src={outputUrl} alt="converted" className="max-h-48 max-w-xs rounded border border-border object-contain" />
              <button onClick={download} className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border text-text-secondary rounded hover:border-accent hover:text-accent transition-colors">
                <Download size={14} /> 下載 {currentExt.toUpperCase()}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

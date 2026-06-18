'use client';

import { useState } from 'react';
import ImageDropzone from '@/components/ui/ImageDropzone';
import { Lock, Unlock, Download } from 'lucide-react';

export default function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [origSize, setOrigSize] = useState({ w: 0, h: 0 });
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [locked, setLocked] = useState(true);
  const [outputUrl, setOutputUrl] = useState('');

  function handleFile(f: File) {
    setFile(f);
    setOutputUrl('');
    const img = new Image();
    const objUrl = URL.createObjectURL(f);
    img.onload = () => {
      setOrigSize({ w: img.width, h: img.height });
      setWidth(String(img.width));
      setHeight(String(img.height));
      URL.revokeObjectURL(objUrl);
    };
    img.src = objUrl;
  }

  function handleWidthChange(v: string) {
    setWidth(v);
    if (locked && origSize.w) {
      const ratio = origSize.h / origSize.w;
      setHeight(String(Math.round(Number(v) * ratio)));
    }
  }

  function handleHeightChange(v: string) {
    setHeight(v);
    if (locked && origSize.h) {
      const ratio = origSize.w / origSize.h;
      setWidth(String(Math.round(Number(v) * ratio)));
    }
  }

  function resize() {
    if (!file) return;
    const w = parseInt(width), h = parseInt(height);
    if (!w || !h) return;
    const img = new Image();
    const objUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      setOutputUrl(canvas.toDataURL(file.type));
      URL.revokeObjectURL(objUrl);
    };
    img.src = objUrl;
  }

  function download() {
    if (!outputUrl || !file) return;
    const a = document.createElement('a');
    const nameParts = file.name.split('.');
    const ext = nameParts.pop() ?? 'png';
    const name = nameParts.join('.');
    a.href = outputUrl;
    a.download = `${name}_${width}x${height}.${ext}`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <ImageDropzone onFileSelect={handleFile} />
      {file && (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">原始尺寸: {origSize.w} × {origSize.h} px</p>
          <div className="flex items-center gap-3">
            <div>
              <label className="text-xs text-text-muted block mb-1">寬度 (px)</label>
              <input type="number" value={width} onChange={e => handleWidthChange(e.target.value)} min={1}
                className="w-28 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
            <button onClick={() => setLocked(!locked)} className="mt-5 text-text-secondary hover:text-accent transition-colors">
              {locked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
            <div>
              <label className="text-xs text-text-muted block mb-1">高度 (px)</label>
              <input type="number" value={height} onChange={e => handleHeightChange(e.target.value)} min={1}
                className="w-28 px-3 py-2 bg-surface-primary border border-border rounded text-sm text-text-primary focus:outline-none focus:border-accent" />
            </div>
          </div>
          <button onClick={resize}
            className="px-4 py-2 bg-accent text-surface-primary text-sm font-medium rounded hover:bg-accent-hover transition-colors">
            調整尺寸
          </button>
          {outputUrl && (
            <div className="flex items-start gap-4">
              <img src={outputUrl} alt="resized" className="max-h-48 max-w-xs rounded border border-border object-contain" />
              <button onClick={download} className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border text-text-secondary rounded hover:border-accent hover:text-accent transition-colors">
                <Download size={14} /> 下載
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import ImageDropzone from '@/components/ui/ImageDropzone';
import { Download } from 'lucide-react';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

export default function ImageCompressorTool() {
  const [original, setOriginal] = useState<{ file: File; url: string } | null>(null);
  const [compressed, setCompressed] = useState<{ blob: Blob; url: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);

  async function handleFile(file: File) {
    if (original?.url) URL.revokeObjectURL(original.url);
    if (compressed?.url) URL.revokeObjectURL(compressed.url);
    setCompressed(null);
    setOriginal({ file, url: URL.createObjectURL(file) });
  }

  async function compress() {
    if (!original) return;
    setLoading(true);
    try {
      const compressedFile = await imageCompression(original.file, {
        maxSizeMB: 10,
        initialQuality: quality / 100,
        useWebWorker: true,
        fileType: original.file.type as 'image/jpeg' | 'image/png',
      });
      const url = URL.createObjectURL(compressedFile);
      setCompressed({ blob: compressedFile, url, size: compressedFile.size });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!compressed || !original) return;
    const a = document.createElement('a');
    a.href = compressed.url;
    a.download = `compressed_${original.file.name}`;
    a.click();
  }

  const ratio = compressed && original ? Math.round((1 - compressed.size / original.file.size) * 100) : null;

  return (
    <div className="space-y-6">
      <ImageDropzone onFileSelect={handleFile} accept="image/jpeg,image/png" maxSizeMb={10} />

      {original && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm text-text-secondary">品質: {quality}%</label>
            <input
              type="range" min={1} max={100} value={quality}
              onChange={e => setQuality(Number(e.target.value))}
              className="flex-1 accent-[#00d4aa]"
            />
          </div>

          <button
            onClick={compress} disabled={loading}
            className="px-4 py-2 bg-accent text-surface-primary text-sm font-medium rounded hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? '壓縮中...' : '壓縮'}
          </button>

          {compressed && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-secondary border border-border rounded p-4 text-sm">
                <div className="text-text-muted mb-1">原始大小</div>
                <div className="text-xl font-mono font-bold text-text-primary">{formatBytes(original.file.size)}</div>
              </div>
              <div className="bg-surface-secondary border border-border rounded p-4 text-sm">
                <div className="text-text-muted mb-1">壓縮後</div>
                <div className="text-xl font-mono font-bold text-accent">{formatBytes(compressed.size)}</div>
                {ratio !== null && <div className="text-xs text-text-muted mt-1">減少 {ratio}%</div>}
              </div>
            </div>
          )}

          {compressed && (
            <div className="flex gap-3">
              <img src={compressed.url} alt="preview" className="max-h-48 max-w-xs rounded border border-border object-contain" />
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

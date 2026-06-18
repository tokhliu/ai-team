'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onFileSelect: (file: File) => void;
  accept?: string;        // e.g. "image/jpeg,image/png,image/webp"
  maxSizeMb?: number;     // default 10
  label?: string;
}

export default function ImageDropzone({ onFileSelect, accept = 'image/*', maxSizeMb = 10, label }: Props) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('不支援的格式，請上傳圖片檔案');
      return;
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`檔案大小超過 ${maxSizeMb}MB 限制`);
      return;
    }
    onFileSelect(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded cursor-pointer transition-colors ${
          dragging ? 'border-accent bg-accent/5' : 'border-border hover:border-border-hover hover:bg-surface-hover'
        }`}
      >
        <Upload size={24} className="text-text-muted" />
        <p className="text-sm text-text-secondary">{label ?? '拖曳圖片至此，或點擊選擇'}</p>
        <p className="text-xs text-text-muted">最大 {maxSizeMb}MB</p>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onInputChange} />
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}

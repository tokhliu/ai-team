'use client';

import { useState } from 'react';
import ImageDropzone from '@/components/ui/ImageDropzone';
import CopyButton from '@/components/ui/CopyButton';

export default function ImageToBase64Tool() {
  const [dataUri, setDataUri] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  function handleFile(file: File) {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = e => setDataUri(e.target?.result as string ?? '');
    reader.readAsDataURL(file);
  }

  const base64Only = dataUri.split(',')[1] ?? '';
  const mimeType = dataUri.split(';')[0]?.split(':')[1] ?? '';
  const imgTag = dataUri ? `<img src="${dataUri}" alt="${fileName}" />` : '';
  const cssBackground = dataUri ? `background-image: url('${dataUri}');` : '';

  const formats = [
    { label: 'Data URI', value: dataUri },
    { label: 'Base64 Only', value: base64Only },
    { label: 'HTML <img>', value: imgTag },
    { label: 'CSS background-image', value: cssBackground },
  ];

  return (
    <div className="space-y-6">
      <ImageDropzone onFileSelect={handleFile} />
      {dataUri && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={dataUri} alt="preview" className="h-16 w-16 object-cover rounded border border-border" />
            <div className="text-sm text-text-secondary">
              <div>{fileName}</div>
              <div className="text-text-muted text-xs">{mimeType} · {(fileSize / 1024).toFixed(1)} KB</div>
            </div>
          </div>
          <div className="space-y-3">
            {formats.map(f => (
              <div key={f.label} className="bg-surface-secondary border border-border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted">{f.label}</span>
                  <CopyButton text={f.value} />
                </div>
                <div className="text-xs text-text-secondary font-mono truncate">{f.value.slice(0, 80)}…</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

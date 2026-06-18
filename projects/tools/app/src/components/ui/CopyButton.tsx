'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Props {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('common');

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        copied
          ? 'border-accent text-accent'
          : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
      } ${className}`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? t('copied') : t('copy')}
    </button>
  );
}

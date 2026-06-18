'use client';

import { Check } from 'lucide-react';

interface Props {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: Props) {
  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-surface-secondary border border-accent/30 rounded text-sm text-text-primary transition-all duration-200 z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Check size={14} className="text-accent" />
      {message}
    </div>
  );
}

'use client';

import { Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { useTranslations } from 'next-intl';

interface Props { toolId: string }

export default function FavoriteButton({ toolId }: Props) {
  const { isFavorite, toggle } = useFavorites(toolId);
  const t = useTranslations('common');

  return (
    <button
      onClick={toggle}
      title={isFavorite ? t('removeFavorite') : t('addFavorite')}
      className={`p-2 rounded transition-colors ${
        isFavorite ? 'text-accent' : 'text-text-muted hover:text-text-secondary'
      }`}
    >
      <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
}

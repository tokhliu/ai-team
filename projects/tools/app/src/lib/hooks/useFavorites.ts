'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'toolverse_favorites';

export function useFavorites(toolId: string) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch { setFavorites([]); }
  }, []);

  function toggle() {
    setFavorites(prev => {
      const next = prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }

  return { isFavorite: favorites.includes(toolId), toggle, favorites };
}

export function useFavoritesList() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch { setFavorites([]); }
  }, []);

  return favorites;
}

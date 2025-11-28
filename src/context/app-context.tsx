'use client';

import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import type { Attraction } from '@/components/site/attractions-section';
import type { Hotel } from '@/components/site/hotels-section';

export type FavoriteItem = (Attraction | Hotel) & { type: 'attraction' | 'hotel' };

interface AppContextType {
  favorites: FavoriteItem[];
  setFavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // При первой загрузке компонента, пытаемся загрузить избранное из localStorage
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to parse favorites from localStorage', error);
      // Если в localStorage некорректные данные, очищаем их
      localStorage.removeItem('favorites');
    }
  }, []);

  // При каждом изменении состояния `favorites`, сохраняем его в localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  }, [favorites]);

  return (
    <AppContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

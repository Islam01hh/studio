'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import type { Attraction } from '@/components/site/attractions-section';
import type { Hotel } from '@/components/site/hotels-section';

export type FavoriteItem = (Attraction | Hotel) & { type: 'attraction' | 'hotel' };


export const useFavorites = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useFavorites must be used within an AppProvider');
  }

  const { favorites, setFavorites } = context;

  const toggleFavorite = (item: Attraction | Hotel) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === item.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== item.id);
      } else {
        // Добавляем 'type' к объекту перед сохранением
        const newItem = { ...item };
        return [...prevFavorites, newItem];
      }
    });
  };

  return {
    favorites,
    toggleFavorite,
  };
};

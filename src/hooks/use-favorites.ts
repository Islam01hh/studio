'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import type { Attraction } from '@/data/attractions';
import type { Hotel } from '@/data/hotels';

export type FavoriteItem = (Attraction | Hotel);

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
        return [...prevFavorites, item];
      }
    });
  };

  return {
    favorites,
    toggleFavorite,
  };
};

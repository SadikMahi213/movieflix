'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistState {
  items: number[];
  addToWatchlist: (movieId: number) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWatchlist: (movieId: number) => {
        const { items } = get();
        if (!items.includes(movieId)) {
          set({ items: [...items, movieId] });
        }
      },
      removeFromWatchlist: (movieId: number) => {
        set({ items: get().items.filter(id => id !== movieId) });
      },
      isInWatchlist: (movieId: number) => {
        return get().items.includes(movieId);
      },
      clearWatchlist: () => set({ items: [] }),
    }),
    {
      name: 'movieflix-watchlist',
    }
  )
);

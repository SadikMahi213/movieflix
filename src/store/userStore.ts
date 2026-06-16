'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, WatchedMovie, MovieList } from '@/types/movie';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  recentlyViewed: number[];
  notifications: { id: number; title: string; message: string; read: boolean; createdAt: string }[];
  setUser: (user: User) => void;
  logout: () => void;
  addToRecentlyViewed: (movieId: number) => void;
  updateWatchProgress: (movieId: number, progress: number) => void;
  markNotificationRead: (id: number) => void;
  clearNotifications: () => void;
}

const defaultUser: User = {
  id: 1,
  name: 'Alex Morgan',
  email: 'alex@example.com',
  avatar: '/avatars/default.jpg',
  joinDate: '2024-01-15',
  preferences: {
    favoriteGenres: [1, 14, 15],
    favoriteLanguages: ['English', 'Japanese'],
    matureContent: true,
    autoplayTrailers: true,
    subtitlesEnabled: false,
    subtitleLanguage: 'English',
  },
  watchlist: [],
  watchedMovies: [],
  reviews: [],
  lists: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      isAuthenticated: true,
      recentlyViewed: [],
      notifications: [
        { id: 1, title: 'Welcome to MovieFlix!', message: 'Start exploring our vast collection of movies and TV shows.', read: false, createdAt: new Date().toISOString() },
        { id: 2, title: 'New Release Alert', message: 'The Last Horizon is now streaming in 4K HDR.', read: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: 3, title: 'Watchlist Update', message: '3 movies in your watchlist are now available.', read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
      ],
      setUser: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addToRecentlyViewed: (movieId: number) => {
        const { recentlyViewed } = get();
        const filtered = recentlyViewed.filter(id => id !== movieId);
        set({ recentlyViewed: [movieId, ...filtered].slice(0, 20) });
      },
      updateWatchProgress: (movieId: number, progress: number) => {
        const { user } = get();
        if (!user) return;
        const existing = user.watchedMovies.findIndex(w => w.movieId === movieId);
        const watchedMovies = [...user.watchedMovies];
        if (existing >= 0) {
          watchedMovies[existing] = {
            ...watchedMovies[existing],
            progress,
            watchedAt: new Date().toISOString(),
            completed: progress >= 90,
          };
        } else {
          watchedMovies.push({
            movieId,
            progress,
            watchedAt: new Date().toISOString(),
            completed: progress >= 90,
          });
        }
        set({ user: { ...user, watchedMovies } });
      },
      markNotificationRead: (id: number) => {
        set({
          notifications: get().notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        });
      },
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'movieflix-user',
    }
  )
);

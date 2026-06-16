'use client';

import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  selectedGenre: string | null;
  isMobileNavOpen: boolean;
  toggleSidebar: () => void;
  toggleSearch: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string | null) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  searchOpen: false,
  searchQuery: '',
  selectedGenre: null,
  isMobileNavOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedGenre: (genre: string | null) => set({ selectedGenre: genre }),
  setMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),
}));

export const SITE_CONFIG = {
  name: 'MovieFlix',
  description: 'Discover, explore, and experience the world of cinema like never before. Your premium destination for movie discovery, reviews, and curated collections.',
  url: 'https://movieflix.com',
  ogImage: '/images/og-image.jpg',
  creator: 'MovieFlix Team',
  keywords: 'movies, streaming, cinema, hollywood, bollywood, korean drama, anime, film reviews, movie database',
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Movies', href: '/search', icon: 'Film' },
  { label: 'Trending', href: '/search?sort=trending', icon: 'TrendingUp' },
  { label: 'Coming Soon', href: '/search?filter=coming-soon', icon: 'Calendar' },
  { label: 'Watchlist', href: '/watchlist', icon: 'Bookmark' },
] as const;

export const REGIONS = [
  { id: 'hollywood', label: 'Hollywood', flag: '🇺🇸' },
  { id: 'bollywood', label: 'Bollywood', flag: '🇮🇳' },
  { id: 'korean', label: 'Korean', flag: '🇰🇷' },
  { id: 'japanese', label: 'Japanese', flag: '🇯🇵' },
  { id: 'bangladeshi', label: 'Bangladeshi', flag: '🇧🇩' },
  { id: 'south-indian', label: 'South Indian', flag: '🇮🇳' },
] as const;

export const GENRE_COLORS: Record<string, string> = {
  Action: 'from-red-500 to-orange-500',
  Adventure: 'from-amber-500 to-yellow-500',
  Animation: 'from-purple-500 to-pink-500',
  Comedy: 'from-green-500 to-emerald-500',
  Crime: 'from-slate-600 to-gray-800',
  Documentary: 'from-blue-600 to-indigo-600',
  Drama: 'from-violet-500 to-purple-600',
  Family: 'from-teal-500 to-cyan-500',
  Fantasy: 'from-fuchsia-500 to-purple-600',
  History: 'from-amber-700 to-yellow-600',
  Horror: 'from-red-800 to-red-950',
  Music: 'from-pink-500 to-rose-500',
  Mystery: 'from-indigo-600 to-blue-800',
  Romance: 'from-rose-400 to-pink-500',
  'Science Fiction': 'from-cyan-500 to-blue-600',
  Thriller: 'from-orange-600 to-red-700',
  War: 'from-stone-600 to-zinc-800',
  Western: 'from-amber-800 to-yellow-700',
};

export const MOCK_TMDB_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3ODkwIiwic3ViIjoiMTIzNDU2Nzg5MCJ9.demo';

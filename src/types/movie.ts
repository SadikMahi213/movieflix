export interface Movie {
  id: number;
  title: string;
  slug: string;
  originalTitle?: string;
  tagline?: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  runtime: number;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genres: Genre[];
  languages: string[];
  originalLanguage: string;
  productionCompanies: ProductionCompany[];
  budget: number;
  revenue: number;
  status: string;
  homepage?: string;
  imdbId?: string;
  certification: string;
  director: CrewMember;
  cast: CastMember[];
  crew: CrewMember[];
  trailers: Trailer[];
  awards: Award[];
  reviews: Review[];
  streamingAvailability: StreamingService[];
  collection?: Collection;
  keywords: string[];
  region: Region;
  type: MovieType;
  isComingSoon: boolean;
  isTrending: boolean;
  isEditorsPick: boolean;
  isAwardWinner: boolean;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string | null;
}

export interface Trailer {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo';
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette';
  official: boolean;
}

export interface Award {
  id: number;
  name: string;
  category: string;
  year: number;
  isWinner: boolean;
}

export interface Review {
  id: number;
  author: string;
  avatarPath: string | null;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
  isCritic: boolean;
}

export interface StreamingService {
  id: number;
  name: string;
  logoPath: string;
  url: string;
  type: 'subscription' | 'rent' | 'buy' | 'free';
  price?: number;
  quality: string;
}

export interface Collection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
  parts: number[];
}

export type Region = 'hollywood' | 'bollywood' | 'korean' | 'japanese' | 'bangladeshi' | 'south-indian' | 'international';

export type MovieType = 'feature' | 'short' | 'documentary' | 'series';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  preferences: UserPreferences;
  watchlist: number[];
  watchedMovies: WatchedMovie[];
  reviews: number[];
  lists: MovieList[];
}

export interface UserPreferences {
  favoriteGenres: number[];
  favoriteLanguages: string[];
  matureContent: boolean;
  autoplayTrailers: boolean;
  subtitlesEnabled: boolean;
  subtitleLanguage: string;
}

export interface WatchedMovie {
  movieId: number;
  progress: number; // 0-100
  watchedAt: string;
  completed: boolean;
}

export interface MovieList {
  id: number;
  name: string;
  description: string;
  movieIds: number[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query: string;
  genres: number[];
  yearRange: [number, number];
  language: string;
  ratingRange: [number, number];
  region: string;
  sortBy: 'popularity' | 'rating' | 'releaseDate' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMovies: number;
  totalRevenue: number;
  totalViews: number;
  averageWatchTime: number;
  userGrowth: ChartDataPoint[];
  revenueData: ChartDataPoint[];
  viewsData: ChartDataPoint[];
  watchTimeData: ChartDataPoint[];
  trafficSources: TrafficSource[];
  topMovies: { id: number; title: string; views: number; revenue: number }[];
  userRegistrationsByDay: ChartDataPoint[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

export interface Notification {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor' | 'user';
  status: 'active' | 'suspended' | 'banned';
  joinDate: string;
  lastActive: string;
  moviesReviewed: number;
  reportsFiled: number;
}

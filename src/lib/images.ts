/**
 * Image URL utilities for the MovieFlix demo.
 * 
 * Uses picsum.photos for free, high-quality placeholder images.
 * Each movie gets a consistent seed so the same movie always shows the same image.
 * 
 * In production, replace these with TMDB image URLs (requires API key):
 *   https://image.tmdb.org/t/p/w500{poster_path}
 *   https://image.tmdb.org/t/p/original{backdrop_path}
 */

const PICSUM_BASE = 'https://picsum.photos/seed';

/**
 * Generate a poster image URL for a movie.
 * Uses a consistent seed so the same movie always gets the same image.
 */
export function getPosterUrl(movieId: number, title: string): string {
  const seed = sanitizeSeed(`movie-poster-${movieId}-${title}`);
  return `${PICSUM_BASE}/${seed}/400/600`;
}

/**
 * Generate a backdrop image URL for a movie.
 * Each movie gets a unique backdrop that's different from its poster.
 */
export function getBackdropUrl(movieId: number, title: string): string {
  const seed = sanitizeSeed(`movie-backdrop-${movieId}-${title}`);
  return `${PICSUM_BASE}/${seed}/1280/720`;
}

/**
 * Generate a cast/actor profile image URL.
 */
export function getProfileUrl(personId: number, name: string): string {
  const seed = sanitizeSeed(`actor-${personId}-${name}`);
  return `${PICSUM_BASE}/${seed}/200/200`;
}

/**
 * Generate a logo URL for a production company or streaming service.
 */
export function getLogoUrl(name: string): string {
  const seed = sanitizeSeed(`logo-${name}`);
  return `${PICSUM_BASE}/${seed}/200/100`;
}

/**
 * Generate a hero (large backdrop) image URL.
 */
export function getHeroUrl(movieId: number, title: string): string {
  const seed = sanitizeSeed(`movie-hero-${movieId}-${title}`);
  return `${PICSUM_BASE}/${seed}/1920/1080`;
}

/**
 * Sanitize a string for use as a URL seed by removing special characters
 * and replacing spaces with hyphens.
 */
function sanitizeSeed(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

/**
 * CSS gradient backgrounds for fallback when images are loading or fail.
 * These provide a premium placeholder look similar to streaming services.
 */
export const POSTER_FALLBACK_GRADIENTS = [
  'from-red-900/80 via-red-800/40 to-black',
  'from-blue-900/80 via-purple-800/40 to-black',
  'from-green-900/80 via-emerald-800/40 to-black',
  'from-purple-900/80 via-pink-800/40 to-black',
  'from-orange-900/80 via-amber-800/40 to-black',
  'from-teal-900/80 via-cyan-800/40 to-black',
  'from-indigo-900/80 via-violet-800/40 to-black',
  'from-rose-900/80 via-pink-800/40 to-black',
  'from-sky-900/80 via-blue-800/40 to-black',
  'from-lime-900/80 via-green-800/40 to-black',
];

export const BACKDROP_FALLBACK_GRADIENTS = [
  'from-slate-900 via-red-900/30 to-slate-900',
  'from-slate-900 via-blue-900/30 to-slate-900',
  'from-slate-900 via-purple-900/30 to-slate-900',
  'from-slate-900 via-green-900/30 to-slate-900',
  'from-slate-900 via-orange-900/30 to-slate-900',
];

/**
 * Get a deterministic fallback gradient based on the movie ID.
 */
export function getPosterFallbackGradient(movieId: number): string {
  return POSTER_FALLBACK_GRADIENTS[movieId % POSTER_FALLBACK_GRADIENTS.length];
}

export function getBackdropFallbackGradient(movieId: number): string {
  return BACKDROP_FALLBACK_GRADIENTS[movieId % BACKDROP_FALLBACK_GRADIENTS.length];
}

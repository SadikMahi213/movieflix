import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { movies, genres } from '@/data/movies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/watchlist`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.5 },
    { url: `${baseUrl}/profile`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.3 },
  ];

  const moviePages = movies.map((movie) => ({
    url: `${baseUrl}/movies/${movie.slug}`,
    lastModified: new Date(movie.releaseDate),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const genrePages = genres.map((genre) => ({
    url: `${baseUrl}/search?genre=${genre.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...moviePages, ...genrePages];
}

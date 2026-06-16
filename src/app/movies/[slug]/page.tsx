import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieBySlug, getSimilarMovies } from '@/data/movies';
import { MovieDetailClient } from './MovieDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = getMovieBySlug(params.slug);
  if (!movie) return { title: 'Movie Not Found' };

  return {
    title: movie.title,
    description: movie.overview.slice(0, 160),
    openGraph: {
      title: movie.title,
      description: movie.overview.slice(0, 160),
      images: [{ url: movie.backdropPath, width: 1920, height: 1080 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview.slice(0, 160),
    },
  };
}

export default function MoviePage({ params }: Props) {
  const movie = getMovieBySlug(params.slug);

  if (!movie) {
    notFound();
  }

  const similarMovies = getSimilarMovies(movie);

  return <MovieDetailClient movie={movie} similarMovies={similarMovies} />;
}

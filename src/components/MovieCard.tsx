'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '@/types/movie';
import { useWatchlistStore } from '@/store/watchlistStore';
import { OptimizedImage } from './OptimizedImage';
import { getPosterUrl, getPosterFallbackGradient } from '@/lib/images';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(movie.id);

  const year = new Date(movie.releaseDate).getFullYear();
  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex-shrink-0 w-[180px] md:w-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${movie.slug}`} className="block">
        {/* Poster Container */}
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted card-hover">
          <OptimizedImage
            src={getPosterUrl(movie.id, movie.title)}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 180px, 200px"
            className="object-cover"
            fallbackGradient={getPosterFallbackGradient(movie.id)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Genre Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white/90">
              {movie.genres[0]?.name || 'General'}
            </span>
          </div>

          {/* Rating Badge */}
          {movie.voteAverage > 0 && (
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-white">{movie.voteAverage.toFixed(1)}</span>
            </div>
          )}

          {/* Hover Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              className="w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Info Section */}
        <div className="mt-2.5 px-0.5">
          <h3 className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>{year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400/70 text-yellow-400/70" />
              <span>{movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : 'NR'}</span>
            </div>
            {movie.runtime > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{hours}h {mins}m</span>
                </div>
              </>
            )}
          </div>

          {/* Genre Tags */}
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-muted-foreground"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Watchlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id);
        }}
        className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm hover:bg-black/80"
      >
        {inWatchlist ? (
          <BookmarkCheck className="w-4 h-4 text-primary" />
        ) : (
          <Bookmark className="w-4 h-4 text-white" />
        )}
      </button>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Bookmark, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useWatchlistStore } from '@/store/watchlistStore';
import { MovieCard } from '@/components/MovieCard';
import { movies } from '@/data/movies';

export default function WatchlistPage() {
  const { items, clearWatchlist } = useWatchlistStore();
  const watchlistMovies = movies.filter(m => items.includes(m.id));

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Bookmark className="w-8 h-8 text-primary" />
              My Watchlist
            </h1>
            <p className="text-muted-foreground mt-1">
              {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''} saved
            </p>
          </div>

          {watchlistMovies.length > 0 && (
            <button
              onClick={clearWatchlist}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Content */}
        {watchlistMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {watchlistMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MovieCard movie={movie} index={index} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Bookmark className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start building your personal collection by adding movies you want to watch.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
            >
              <Eye className="w-4 h-4" />
              Discover Movies
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown, Star } from 'lucide-react';
import { movies, genres } from '@/data/movies';
import { MovieCard } from '@/components/MovieCard';
import { REGIONS } from '@/lib/constants';
import { Movie } from '@/types/movie';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialGenre = searchParams.get('genre') || '';
  const initialRegion = searchParams.get('region') || '';
  const initialSort = searchParams.get('sort') || 'popularity';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState(initialSort);
  const [showFilters, setShowFilters] = useState(false);

  const years = Array.from({ length: 30 }, (_, i) => (2026 - i).toString());

  const filteredMovies = useMemo(() => {
    let results = [...movies];

    // Text search
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.overview.toLowerCase().includes(q) ||
        m.cast.some(c => c.name.toLowerCase().includes(q)) ||
        m.genres.some(g => g.name.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenre) {
      results = results.filter(m => m.genres.some(g => g.slug === selectedGenre));
    }

    // Region filter
    if (selectedRegion) {
      results = results.filter(m => m.region === selectedRegion);
    }

    // Year filter
    if (selectedYear) {
      results = results.filter(m => m.releaseDate.startsWith(selectedYear));
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => b.voteAverage - a.voteAverage);
        break;
      case 'releaseDate':
        results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // popularity
        results.sort((a, b) => b.popularity - a.popularity);
    }

    return results;
  }, [query, selectedGenre, selectedRegion, selectedYear, sortBy]);

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Movies</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, actor, genre..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-base transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        <motion.div
          initial={false}
          animate={{
            height: showFilters ? 'auto' : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 mb-8 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Genre Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Genre
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.slug}>{genre.name}</option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="">All Regions</option>
                  {REGIONS.map((region) => (
                    <option key={region.id} value={region.id}>{region.flag} {region.label}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
        </p>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <MovieCard movie={movie} index={index} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

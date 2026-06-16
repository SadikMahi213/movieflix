'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ChevronLeft, ChevronRight, Star, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Movie } from '@/types/movie';
import { getTrendingMovies } from '@/data/movies';
import { useWatchlistStore } from '@/store/watchlistStore';
import { getHeroUrl, getBackdropFallbackGradient } from '@/lib/images';
import { OptimizedImage } from './OptimizedImage';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const featuredMovies = getTrendingMovies().slice(0, 5);
  const current = featuredMovies[currentIndex];
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const inWatchlist = current ? isInWatchlist(current.id) : false;

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  }, [featuredMovies.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  }, [featuredMovies.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!current) return null;

  const year = new Date(current.releaseDate).getFullYear();
  const hours = Math.floor(current.runtime / 60);
  const mins = current.runtime % 60;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <OptimizedImage
            src={getHeroUrl(current.id, current.title)}
            alt={current.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            fallbackGradient={getBackdropFallbackGradient(current.id)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl">
            {/* Genre Badges */}
            <motion.div
              key={`genres-${current.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex gap-2 mb-4"
            >
              {current.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 text-xs font-semibold rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-wider"
                >
                  {genre.name}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              key={`title-${current.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-balance"
            >
              {current.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              key={`meta-${current.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 text-sm text-muted-foreground mb-4"
            >
              <span className="text-white/80">{year}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              {current.certification && (
                <>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold border border-white/20 rounded">
                    {current.certification}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                </>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{hours}h {mins}m</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-semibold">{current.voteAverage.toFixed(1)}</span>
              </div>
            </motion.div>

            {/* Tagline */}
            {current.tagline && (
              <motion.p
                key={`tagline-${current.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg md:text-xl italic text-primary/80 mb-3"
              >
                &ldquo;{current.tagline}&rdquo;
              </motion.p>
            )}

            {/* Overview */}
            <motion.p
              key={`overview-${current.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 line-clamp-3 max-w-xl"
            >
              {current.overview}
            </motion.p>

            {/* CTAs */}
            <motion.div
              key={`ctas-${current.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link
                href={`/movies/${current.slug}`}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-primary/30"
              >
                <Play className="w-4 h-4" fill="white" />
                Watch Trailer
              </Link>
              <Link
                href={`/movies/${current.slug}`}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-sm transition-all border border-white/10"
              >
                <Info className="w-4 h-4" />
                More Info
              </Link>
              <button
                onClick={() => inWatchlist ? removeFromWatchlist(current.id) : addToWatchlist(current.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all border ${
                  inWatchlist
                    ? 'bg-primary/20 border-primary/50 text-primary'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                {inWatchlist ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors border border-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors border border-white/10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {featuredMovies.map((movie, index) => (
          <button
            key={movie.id}
            onClick={() => goTo(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex
                ? 'w-10 h-1.5 bg-primary'
                : 'w-2 h-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Movie Info Side */}
      <div className="absolute right-4 md:right-16 bottom-20 z-30 hidden lg:block">
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
            Now Playing
          </p>
          <p className="text-sm font-medium">
            {currentIndex + 1} / {featuredMovies.length}
          </p>
        </div>
      </div>
    </section>
  );
}

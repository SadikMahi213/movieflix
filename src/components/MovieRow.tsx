'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  viewAllHref?: string;
}

export function MovieRow({ title, subtitle, movies, viewAllHref }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkArrows = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = rowRef.current;
    if (container) {
      container.addEventListener('scroll', checkArrows);
      checkArrows();
    }
    return () => container?.removeEventListener('scroll', checkArrows);
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const container = rowRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    const target = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    setIsScrolling(true);
    container.scrollTo({ left: target, behavior: 'smooth' });
    setTimeout(() => setIsScrolling(false), 500);
  };

  if (movies.length === 0) return null;

  return (
    <section className="relative px-4 md:px-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 md:mb-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl font-bold"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Arrows */}
          <button
            onClick={() => scroll('left')}
            className={`p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all ${
              showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all ${
              showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Movie Cards Row */}
      <div className="relative">
        {/* Left Gradient */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`} />

        {/* Right Gradient */}
        <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />

        {/* Scrolling Container */}
        <div
          ref={rowRef}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-4 carousel-container"
        >
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

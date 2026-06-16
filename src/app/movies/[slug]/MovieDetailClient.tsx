'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  Calendar,
  Play,
  Bookmark,
  BookmarkCheck,
  Share2,
  ChevronLeft,
  Award,
  Building2,
  Globe,
  Film,
  User,
  ThumbsUp,
  Quote,
} from 'lucide-react';
import { Movie } from '@/types/movie';
import { useWatchlistStore } from '@/store/watchlistStore';
import { useUserStore } from '@/store/userStore';
import { MovieCard } from '@/components/MovieCard';
import { OptimizedImage } from '@/components/OptimizedImage';
import { getPosterUrl, getHeroUrl, getPosterFallbackGradient, getBackdropFallbackGradient } from '@/lib/images';

interface MovieDetailClientProps {
  movie: Movie;
  similarMovies: Movie[];
}

export function MovieDetailClient({ movie, similarMovies }: MovieDetailClientProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const { addToRecentlyViewed } = useUserStore();
  const inWatchlist = isInWatchlist(movie.id);

  // Track view
  useEffect(() => {
    addToRecentlyViewed(movie.id);
  }, [movie.id, addToRecentlyViewed]);

  const year = new Date(movie.releaseDate).getFullYear();
  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;

  const criticReviews = movie.reviews.filter(r => r.isCritic);
  const userReviews = movie.reviews.filter(r => !r.isCritic);
  const criticScore = criticReviews.length
    ? Math.round(criticReviews.reduce((a, r) => a + r.rating, 0) / criticReviews.length * 10)
    : 0;
  const userScore = movie.voteAverage * 10;

  return (
    <main className="min-h-screen">
      {/* Hero Backdrop */}
      <section className="relative h-[50vh] md:h-[70vh] min-h-[400px]">
        <OptimizedImage
          src={getHeroUrl(movie.id, movie.title)}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          fallbackGradient={getBackdropFallbackGradient(movie.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        {/* Back Button */}
        <div className="relative z-20 p-4 md:p-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors text-sm border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-16">
          <div className="container mx-auto">
            <div className="flex gap-6 md:gap-10 items-end">
              {/* Poster */}
              <div className="hidden md:block w-[200px] lg:w-[280px] shrink-0 -mb-32 relative z-30">
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-muted shadow-2xl shadow-black/50 border border-white/10">
                  <OptimizedImage
                    src={getPosterUrl(movie.id, movie.title)}
                    alt={movie.title}
                    fill
                    sizes="280px"
                    className="object-cover"
                    fallbackGradient={getPosterFallbackGradient(movie.id)}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {movie.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/search?genre=${genre.slug}`}
                      className="px-3 py-1 text-xs font-semibold rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-wider hover:bg-primary/20 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-lg md:text-xl text-primary/70 italic mb-4">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-4">
                  <span>{year}</span>
                  {movie.certification && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span className="px-1.5 py-0.5 text-[10px] font-bold border border-white/20 rounded">
                        {movie.certification}
                      </span>
                    </>
                  )}
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{hours}h {mins}m</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>{movie.languages.join(', ')}</span>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{userScore}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">User Score</p>
                      <p className="text-[10px] text-muted-foreground">{movie.voteCount.toLocaleString()} votes</p>
                    </div>
                  </div>

                  {criticScore > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{criticScore}%</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Critic Score</p>
                        <p className="text-[10px] text-muted-foreground">{criticReviews.length} reviews</p>
                      </div>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => {
                      const filled = movie.voteAverage / 2 >= i + 1;
                      const half = movie.voteAverage / 2 >= i + 0.5 && !filled;
                      return (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            filled
                              ? 'fill-yellow-400 text-yellow-400'
                              : half
                              ? 'fill-yellow-400/50 text-yellow-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-primary/30"
                  >
                    <Play className="w-4 h-4" fill="white" />
                    Watch Trailer
                  </button>
                  <button
                    onClick={() => inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all border ${
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
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                {movie.overview}
              </p>
            </motion.section>

            {/* Director & Director's info */}
            {movie.director && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xl font-bold mb-4">Director</h2>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{movie.director.name}</p>
                    <p className="text-sm text-muted-foreground">Director</p>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Cast Carousel */}
            {movie.cast.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4">Cast</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 carousel-container">
                  {movie.cast.map((cast) => (
                    <div
                      key={cast.id}
                      className="flex-shrink-0 w-[120px] text-center group cursor-pointer"
                    >
                      <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-muted mb-3 border-2 border-transparent group-hover:border-primary transition-colors">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-sm font-medium truncate">{cast.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{cast.character}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Reviews Section */}
            {movie.reviews.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-6">Reviews</h2>

                {/* Critic Reviews */}
                {criticReviews.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      Critics Reviews
                    </h3>
                    <div className="space-y-4">
                      {criticReviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                                <Quote className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{review.author}</p>
                                <p className="text-xs text-muted-foreground">Critic</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold">{review.rating}/10</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            &ldquo;{review.content}&rdquo;
                          </p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            <button className="flex items-center gap-1 hover:text-white transition-colors">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {review.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* User Reviews */}
                {userReviews.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      User Reviews
                    </h3>
                    <div className="space-y-4">
                      {userReviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-600/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{review.author}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold">{review.rating}/10</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            &ldquo;{review.content}&rdquo;
                          </p>
                          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            <button className="flex items-center gap-1 hover:text-white transition-colors">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              {review.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Movie Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Movie Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Release Date</p>
                    <p className="text-sm font-medium">
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Runtime</p>
                    <p className="text-sm font-medium">{hours}h {mins}m</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Film className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Genres</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {movie.genres.map((g) => (
                        <span key={g.id} className="text-xs px-2 py-0.5 rounded-md bg-white/10">
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Languages</p>
                    <p className="text-sm font-medium">{movie.languages.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-medium">{movie.status}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Awards Section */}
            {movie.awards.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Awards
                </h3>
                <div className="space-y-3">
                  {movie.awards.map((award) => (
                    <div key={award.id} className="flex items-start gap-3">
                      <Award className={`w-4 h-4 mt-0.5 ${award.isWinner ? 'text-yellow-400' : 'text-muted-foreground'}`} />
                      <div>
                        <p className="text-sm font-medium">{award.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {award.category} • {award.year}
                          {award.isWinner && ' • Winner'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Production Companies */}
            {movie.productionCompanies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Production
                </h3>
                <div className="space-y-3">
                  {movie.productionCompanies.map((company) => (
                    <div key={company.id} className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm">{company.name}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Streaming Availability */}
            {movie.streamingAvailability.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Available On
                </h3>
                <div className="space-y-3">
                  {movie.streamingAvailability.map((s) => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{s.type} • {s.quality}</p>
                      </div>
                      {s.price && (
                        <span className="text-sm font-bold text-primary">${s.price.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 carousel-container">
              {similarMovies.slice(0, 8).map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Keywords */}
        {movie.keywords.length > 0 && (
          <section className="mt-8 pb-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.keywords.map((keyword) => (
                <Link
                  key={keyword}
                  href={`/search?q=${encodeURIComponent(keyword)}`}
                  className="px-3 py-1.5 text-xs rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {keyword}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 aspect-video rounded-2xl overflow-hidden bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Trailer Preview</p>
              </div>
            </div>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Movie',
            name: movie.title,
            description: movie.overview,
            datePublished: movie.releaseDate,
            duration: `PT${hours}H${mins}M`,
            director: movie.director ? {
              '@type': 'Person',
              name: movie.director.name,
            } : undefined,
            actor: movie.cast.map(c => ({
              '@type': 'Person',
              name: c.name,
              characterName: c.character,
            })),
            genre: movie.genres.map(g => g.name),
            image: movie.backdropPath,
            aggregateRating: movie.voteAverage > 0 ? {
              '@type': 'AggregateRating',
              ratingValue: movie.voteAverage,
              ratingCount: movie.voteCount,
              bestRating: 10,
            } : undefined,
          }),
        }}
      />
    </main>
  );
}

import { MovieRow } from '@/components/MovieRow';
import { HeroSection } from '@/components/HeroSection';
import {
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getLatestReleases,
  getComingSoonMovies,
  getEditorsPicks,
  getAwardWinners,
  getMoviesByRegion,
} from '@/data/movies';

export default function HomePage() {
  const trending = getTrendingMovies();
  const topRated = getTopRatedMovies();
  const popular = getPopularMovies();
  const latest = getLatestReleases();
  const comingSoon = getComingSoonMovies();
  const editorsPicks = getEditorsPicks();
  const awardWinners = getAwardWinners();
  const hollywood = getMoviesByRegion('hollywood');
  const bollywood = getMoviesByRegion('bollywood');
  const korean = getMoviesByRegion('korean');
  const japanese = getMoviesByRegion('japanese');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <div className="relative -mt-20 md:-mt-32 space-y-10 md:space-y-16 pb-16">
        {/* Trending Section */}
        <section className="relative">
          <MovieRow
            title="Trending This Week"
            subtitle="Most popular movies right now"
            movies={trending}
          />
        </section>

        {/* Top Rated */}
        <MovieRow
          title="Top Rated"
          subtitle="Highest rated movies of all time"
          movies={topRated}
        />

        {/* Popular */}
        <MovieRow
          title="Popular Movies"
          subtitle="What everyone's watching"
          movies={popular}
        />

        {/* Latest Releases */}
        <MovieRow
          title="Latest Releases"
          subtitle="New movies added this month"
          movies={latest}
        />

        {/* Editor's Picks */}
        {editorsPicks.length > 0 && (
          <MovieRow
            title="Editor's Picks"
            subtitle="Handpicked by our curation team"
            movies={editorsPicks}
          />
        )}

        {/* Award Winners */}
        {awardWinners.length > 0 && (
          <MovieRow
            title="Award Winners"
            subtitle="Critically acclaimed and award-winning films"
            movies={awardWinners}
          />
        )}

        {/* Hollywood */}
        {hollywood.length > 0 && (
          <MovieRow
            title="🇺🇸 Hollywood"
            subtitle="The best of American cinema"
            movies={hollywood}
          />
        )}

        {/* Bollywood */}
        {bollywood.length > 0 && (
          <MovieRow
            title="🇮🇳 Bollywood"
            subtitle="Colorful, musical, and unforgettable"
            movies={bollywood}
          />
        )}

        {/* Korean Cinema */}
        {korean.length > 0 && (
          <MovieRow
            title="🇰🇷 Korean Cinema"
            subtitle="K-dramas, thrillers, and K-pop musicals"
            movies={korean}
          />
        )}

        {/* Japanese Cinema */}
        {japanese.length > 0 && (
          <MovieRow
            title="🇯🇵 Japanese Cinema"
            subtitle="Anime, samurai epics, and studio masterpieces"
            movies={japanese}
          />
        )}

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <MovieRow
            title="Coming Soon"
            subtitle="Most anticipated upcoming releases"
            movies={comingSoon}
          />
        )}
      </div>

      {/* Attribution */}
      <div className="px-4 md:px-8 py-8 text-center">
        <p className="text-xs text-muted-foreground">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
          All movie data is simulated for demonstration purposes.
        </p>
      </div>
    </main>
  );
}

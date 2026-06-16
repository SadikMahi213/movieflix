'use client';

import { motion } from 'framer-motion';
import { User, Settings, Film, Clock, Star, Heart, List, LogOut } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { movies } from '@/data/movies';
import { MovieCard } from '@/components/MovieCard';

export default function ProfilePage() {
  const { user, recentlyViewed } = useUserStore();
  const recentMovies = recentlyViewed
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean)
    .slice(0, 6);

  const watchedMovies = (user?.watchedMovies ?? [])
    .map(w => ({ ...w, movie: movies.find(m => m.id === w.movieId) }))
    .filter((w): w is typeof w & { movie: NonNullable<typeof w.movie> } => w.movie !== undefined)
    .slice(0, 6);

  if (!user) return null;

  const stats = [
    { label: 'Movies Watched', value: user.watchedMovies.length, icon: Film },
    { label: 'Watchlist', value: user.watchlist.length, icon: Heart },
    { label: 'Reviews', value: user.reviews.length, icon: Star },
    { label: 'Lists', value: user.lists.length, icon: List },
  ];

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-purple-600/5 to-blue-600/10 border border-white/10 overflow-hidden mb-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm">
              <Settings className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recently Viewed */}
        {recentMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recently Viewed
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 carousel-container">
              {recentMovies.map((movie, i) => (
                <MovieCard key={movie!.id} movie={movie!} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Continue Watching */}
        {watchedMovies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Film className="w-5 h-5 text-primary" />
              Continue Watching
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 carousel-container">
              {watchedMovies.map((item, i) => (
                <div key={item.movieId} className="flex-shrink-0 w-[200px]">
                  <MovieCard movie={item.movie!} index={i} />
                  {item.progress > 0 && item.progress < 90 && (
                    <div className="mt-2">
                      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{Math.round(item.progress)}% watched</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

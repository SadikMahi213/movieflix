'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Eye, MoreHorizontal, Film, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { movies } from '@/data/movies';
import { getPosterUrl, getPosterFallbackGradient } from '@/lib/images';

export default function AdminMoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMovies = movies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'published' && !m.isComingSoon) ||
      (statusFilter === 'coming-soon' && m.isComingSoon);
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-white transition-colors">Admin</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">Movies</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">Movie Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your movie catalog</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm transition-all">
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Movie</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Genre</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Rating</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Revenue</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMovies.map((movie, i) => (
                  <motion.tr
                    key={movie.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 bg-muted">
                          <img
                            src={getPosterUrl(movie.id, movie.title)}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.className = 'w-10 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-purple-600/20 shrink-0';
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{movie.title}</p>
                          <p className="text-xs text-muted-foreground">{movie.releaseDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {movie.genres.slice(0, 2).map(g => (
                          <span key={g.id} className="text-xs px-2 py-0.5 rounded-md bg-white/10">{g.name}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <Film className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-sm">{movie.voteAverage > 0 ? movie.voteAverage.toFixed(1) : 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                        movie.isComingSoon
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {movie.isComingSoon ? (
                          <><XCircle className="w-3 h-3" />Draft</>
                        ) : (
                          <><CheckCircle className="w-3 h-3" />Published</>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm">${(movie.revenue / 1000000).toFixed(1)}M</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

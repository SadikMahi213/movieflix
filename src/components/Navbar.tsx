'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Bookmark,
  ChevronDown,
  Menu,
  X,
  Home,
  Film,
  TrendingUp,
  Calendar,
  LogOut,
  User,
  Settings,
  Clapperboard,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';
import { NAV_ITEMS, REGIONS } from '@/lib/constants';
import { searchMovies } from '@/data/movies';
import { OptimizedImage } from './OptimizedImage';
import { getPosterUrl, getPosterFallbackGradient } from '@/lib/images';
import { SITE_CONFIG } from '@/lib/constants';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, setSearchQuery, isMobileNavOpen, setMobileNavOpen } = useUIStore();
  const { user, notifications } = useUserStore();
  const [searchResults, setSearchResults] = useState<typeof import('@/data/movies').movies>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchMovies(searchQuery);
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    setMobileNavOpen(false);
    setShowSearch(false);
  }, [pathname, setMobileNavOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
          {/* Left side - Logo & Nav */}
          <div className="flex items-center gap-8">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Clapperboard className="w-7 h-7 text-primary" />
                <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                <span className="text-primary">Movie</span>Flix
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href.split('?')[0]));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 md:w-96"
                  >
                    <div className="glass rounded-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                        <input
                          type="text"
                          placeholder="Search movies, actors, genres..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
                          autoFocus
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-white/10 rounded">
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {searchResults.length > 0 && (
                        <div className="max-h-80 overflow-y-auto p-2">
                          {searchResults.map((movie) => (
                            <Link
                              key={movie.id}
                              href={`/movies/${movie.slug}`}
                              onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <div className="w-10 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                                <OptimizedImage
                                  src={getPosterUrl(movie.id, movie.title)}
                                  alt={movie.title}
                                  width={40}
                                  height={56}
                                  className="object-cover w-full h-full"
                                  fallbackGradient={getPosterFallbackGradient(movie.id)}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{movie.title}</p>
                                <p className="text-xs text-muted-foreground">
                                  {movie.genres.slice(0, 2).map(g => g.name).join(', ')}
                                </p>
                              </div>
                              <span className="text-xs text-primary font-semibold">
                                {movie.voteAverage > 0 ? `${movie.voteAverage.toFixed(1)}` : 'N/A'}
                              </span>
                            </Link>
                          ))}

                          <Link
                            href={`/search?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                            className="block text-center text-sm text-primary py-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            View all results →
                          </Link>
                        </div>
                      )}

                      {searchQuery.length > 0 && searchResults.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                          No results found for &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Watchlist */}
            <Link
              href="/watchlist"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors relative hidden sm:block"
            >
              <Bookmark className="w-5 h-5" />
            </Link>

            {/* Notifications */}
            <div ref={notificationsRef} className="relative hidden sm:block">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80"
                  >
                    <div className="glass rounded-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-muted-foreground text-sm">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <button
                              key={n.id}
                              className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3 ${
                                !n.read ? 'bg-primary/5' : ''
                              }`}
                            >
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-muted-foreground/30' : 'bg-primary'}`} />
                              <div>
                                <p className="text-sm font-medium">{n.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56"
                  >
                    <div className="glass rounded-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">
                          <Settings className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors text-muted-foreground">
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-card border-r border-white/10 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-8">
                <Clapperboard className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">
                  <span className="text-primary">Movie</span>Flix
                </span>
              </div>

              <nav className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Browse by Region
                </h4>
                <div className="flex flex-col gap-1">
                  {REGIONS.map((region) => (
                    <Link
                      key={region.id}
                      href={`/search?region=${region.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                    >
                      <span className="text-base">{region.flag}</span>
                      {region.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

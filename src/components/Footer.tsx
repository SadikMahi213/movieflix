'use client';

import Link from 'next/link';
import { Clapperboard, ExternalLink, Camera, Video, Mail, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const footerLinks = [
  {
    title: 'Browse',
    links: [
      { label: 'Trending', href: '/search?sort=trending' },
      { label: 'Top Rated', href: '/search?sort=rating' },
      { label: 'Coming Soon', href: '/search?filter=coming-soon' },
      { label: 'Latest Releases', href: '/search?sort=releaseDate' },
    ],
  },
  {
    title: 'Regions',
    links: [
      { label: 'Hollywood', href: '/search?region=hollywood' },
      { label: 'Bollywood', href: '/search?region=bollywood' },
      { label: 'Korean', href: '/search?region=korean' },
      { label: 'Japanese', href: '/search?region=japanese' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'DMCA', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/50 mt-20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Clapperboard className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">
                <span className="text-primary">Movie</span>Flix
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Video className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            {' '}This is a demo prototype. All movie data is simulated for demonstration purposes.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Powered by Next.js & TMDB</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

# MovieFlix 🎬

A **premium-quality, client-ready movie streaming platform frontend prototype** built with Next.js 16, TypeScript, Tailwind CSS v4, and modern web technologies.

> **This is a DEMO/SIMULATION PROTOTYPE.** All movie data, images, and metadata are simulated for demonstration purposes. This project does not host, stream, or provide access to copyrighted content.

## ✨ Features

### 🎯 Homepage
- **Cinematic Hero Section** with auto-rotating featured movies, smooth transitions, and CTAs
- **Trending This Week** with hover effects and ratings
- **Top Rated, Popular, Latest Releases** horizontal scrolling rows
- **Coming Soon** upcoming releases section
- **Regional Cinema** (Hollywood, Bollywood, Korean, Japanese, Bangladeshi, South Indian)
- **Editor's Picks & Award Winners** curated sections

### 📽️ Movie Details (IMDb-style)
- Hero backdrop with gradient overlays
- Rating visualizations (user score, critic score, star ratings)
- Synopsis, genres, runtime, release date, certification
- Director & Cast carousel
- Awards section
- User & critic reviews with ratings
- Streaming availability simulation
- Production companies
- Similar movies recommendations
- **JSON-LD structured data** for SEO

### 🔍 Search & Discovery
- Instant typeahead search
- Genre, year, region, rating filters
- Sort by popularity, rating, release date, title

### 👤 User Features
- **Watchlist** with local persistence
- **User Profile** with stats and activity
- **Continue Watching** with progress tracking
- **Recently Viewed** history

### 📊 Admin Dashboard
- Revenue, users, views, watch time metrics
- Movie management (CRUD table)
- User management with roles & permissions
- Analytics dashboard with charts
- Traffic sources & device breakdown
- Marketing readiness status

### 🌐 SEO & Performance
- Dynamic metadata & Open Graph tags
- Twitter cards
- JSON-LD structured data (Movie schema, breadcrumbs)
- Auto-generated sitemap.xml
- robots.txt configuration
- SEO-optimized URL structure
- Lazy loading, code splitting, image optimization ready

### 📈 Analytics Ready
- GA4 integration simulation
- GTM event tracking simulation
- Conversion tracking setup
- Heatmap ready architecture

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Zustand** | State management |
| **TanStack Query** | Server state management |
| **Lucide React** | Icon library |
| **shadcn/ui** | UI component primitives |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Movieflix

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard (overview, movies, users, analytics)
│   ├── movies/[slug]/      # Movie detail pages
│   ├── search/             # Search & filters page
│   ├── watchlist/          # User watchlist
│   ├── profile/            # User profile
│   ├── globals.css         # Global styles (Tailwind v4)
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # SEO robots.txt
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── loading.tsx         # Loading state
│   ├── error.tsx           # Error boundary
│   └── not-found.tsx       # 404 page
├── components/             # React components
│   ├── Navbar.tsx           # Premium navigation
│   ├── Footer.tsx           # Site footer
│   ├── HeroSection.tsx      # Homepage hero
│   ├── MovieCard.tsx        # Movie card with hover effects
│   ├── MovieRow.tsx         # Horizontal scrolling row
│   └── Providers.tsx        # React Query provider
├── data/
│   └── movies.ts           # 20+ mock movies dataset
├── store/
│   ├── watchlistStore.ts   # Zustand watchlist state
│   ├── userStore.ts        # User profile state
│   └── uiStore.ts          # UI state management
├── types/
│   └── movie.ts            # TypeScript type definitions
└── lib/
    ├── constants.ts        # Site configuration
    └── utils.ts            # Utility functions (shadcn)
```

## 🎨 Design Philosophy

The design combines the best elements of:
- **Netflix** — smooth hero transitions, content rows
- **IMDb** — detailed movie information, ratings
- **Prime Video** — premium feel, dark theme
- **Letterboxd** — clean, modern aesthetics
- **TMDB** — comprehensive metadata structure

### Theme
- **Dark first** design with deep backgrounds (#080808)
- **Red accent** (#dc2626) for primary CTAs
- **Glass morphism** effects for overlays
- **Gradient overlays** for depth
- **Subtle animations** with Framer Motion

## 🚢 Deployment

### Deploy to Vercel

The project is Vercel-optimized with a pre-configured `vercel.json`:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository directly to [Vercel](https://vercel.com).

### Environment Variables (Optional for TMDB integration)

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_tmdb_read_token
```

## 📝 Notes

- This is a **frontend-only prototype**. All data is mock data for demonstration purposes.
- Movie posters and backdrops use placeholder gradients.
- For real production use, integrate with TMDB API, OMDb API, or a custom backend.
- The project demonstrates capabilities for client presentations and investor demos.
- TMDB attribution is included as required by their terms of service.

## 📄 License

This project is for demonstration purposes only. All movie data, images, and trademarks belong to their respective owners.

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.

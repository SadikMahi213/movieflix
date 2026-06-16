import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <Clapperboard className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The scene you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the main feature.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

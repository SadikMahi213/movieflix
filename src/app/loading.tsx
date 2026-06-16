import { Clapperboard } from 'lucide-react';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background, #080808)' }}>
      <div className="text-center">
        <Clapperboard className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-primary, #dc2626)', animation: 'pulse 2s ease-in-out infinite' }} />
        <div
          className="mx-auto"
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: 'var(--color-primary, #dc2626)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  fallbackGradient?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  containerClassName,
  fallbackGradient = 'from-primary/20 via-purple-600/20 to-blue-600/20',
  priority = false,
  sizes,
  quality = 80,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'overflow-hidden bg-muted',
        fill ? 'absolute inset-0' : 'relative',
        isLoading && 'skeleton-shimmer',
        containerClassName
      )}
    >
      {/* Gradient fallback shown while loading or on error */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            fallbackGradient
          )}
        />
      )}

      {/* Actual image */}
      {!hasError && (
        <NextImage
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          quality={quality}
          className={cn(
            'transition-all duration-500',
            isLoading ? 'scale-110 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100',
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      {/* Persistent gradient fallback for errors */}
      {hasError && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br',
            fallbackGradient
          )}
        />
      )}
    </div>
  );
}

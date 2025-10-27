'use client';

import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ABVariantProps {
  children?: React.ReactNode;
  onVariantChange?: (variant: string | null) => void;
}

const VARIANT_STORAGE_KEY = 'kiwoor_variant';

/**
 * ABVariant Component
 * Handles A/B testing variant parameter from URL and persists it in localStorage
 * 
 * Usage:
 * ```tsx
 * <ABVariant onVariantChange={(variant) => console.log(variant)} />
 * ```
 * 
 * URL: /campaign/diaspora?variant=test-a
 * - Stores 'test-a' in localStorage as 'kiwoor_variant'
 * - Tracks 'variant_shown' event with analytics
 * - Persists across page reloads
 */
export default function ABVariant({ children, onVariantChange }: ABVariantProps) {
  const [variant, setVariant] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get variant from URL using window.location (client-side only)
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariant = urlParams.get('variant');
    
    // Get stored variant from localStorage
    const storedVariant = typeof window !== 'undefined' 
      ? localStorage.getItem(VARIANT_STORAGE_KEY)
      : null;

    let activeVariant: string | null = null;

    // Priority: URL variant > Stored variant
    if (urlVariant) {
      activeVariant = urlVariant;
      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(VARIANT_STORAGE_KEY, urlVariant);
      }
    } else if (storedVariant) {
      activeVariant = storedVariant;
    }

    // Update state
    setVariant(activeVariant);
    setIsInitialized(true);

    // Track variant shown
    if (activeVariant) {
      trackEvent('variant_shown', {
        variant: activeVariant,
        source: urlVariant ? 'url' : 'stored',
        page: window.location.pathname,
      });
    }

    // Callback to parent component
    if (onVariantChange) {
      onVariantChange(activeVariant);
    }
  }, [onVariantChange]);

  // Don't render children until initialized to avoid hydration mismatch
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Hook to get current variant
 * 
 * Usage:
 * ```tsx
 * const variant = useABVariant();
 * console.log(variant); // 'test-a' or null
 * ```
 */
export function useABVariant(): string | null {
  const [variant, setVariant] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(VARIANT_STORAGE_KEY);
      setVariant(stored);
    }
  }, []);

  return variant;
}

/**
 * Clear stored variant
 * Useful for testing or resetting user's variant assignment
 */
export function clearABVariant(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(VARIANT_STORAGE_KEY);
  }
}

/**
 * Get variant value synchronously (client-side only)
 * Returns null on server or if not set
 */
export function getABVariant(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(VARIANT_STORAGE_KEY);
}


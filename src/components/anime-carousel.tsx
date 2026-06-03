'use client';

import { useRef } from 'react';
import { Anime } from '@/types/anime';
import { AnimeCard } from './anime-card';
import { SkeletonCard } from './skeleton-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface AnimeCarouselProps {
  title: string;
  animes: Anime[];
  isLoading?: boolean;
  viewAllLink?: string;
}

export function AnimeCarousel({ title, animes, isLoading, viewAllLink }: AnimeCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 relative group/carousel">
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-2xl font-bold text-foreground">
          {title}
          <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Ver Todo
          </Link>
        )}
      </div>

      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-xl bg-black/60 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:bg-primary hover:text-white group-hover/carousel:opacity-100 disabled:opacity-0 md:left-2 md:rounded-xl"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-4 pb-4 pt-2 scrollbar-hide md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading 
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-[140px] flex-none md:w-[180px] lg:w-[220px]">
                  <SkeletonCard />
                </div>
              ))
            : animes.map((anime) => (
                <div key={anime.slug} className="w-[140px] flex-none md:w-[180px] lg:w-[220px]">
                  <AnimeCard anime={anime} />
                </div>
              ))
          }
          {animes.length === 0 && !isLoading && (
            <div className="flex w-full items-center justify-center py-12 text-muted-foreground">
              No hay animes disponibles.
            </div>
          )}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-xl bg-black/60 p-2 text-white opacity-0 backdrop-blur-md transition-all hover:bg-primary hover:text-white group-hover/carousel:opacity-100 disabled:opacity-0 md:right-2 md:rounded-xl"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

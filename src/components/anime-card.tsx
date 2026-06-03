import Image from 'next/image';
import Link from 'next/link';
import { Anime } from '@/types/anime';
import { Star, Play, Heart } from 'lucide-react';

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <div className="group relative flex flex-col gap-2 transition-all duration-300">
      <Link href={`/anime/${anime.slug}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={anime.cover}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <Play className="h-6 w-6 ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          <span className="rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {anime.type}
          </span>
        </div>
        
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {anime.rating}
        </div>
      </Link>
      
      <div className="flex flex-col gap-1">
        <Link href={`/anime/${anime.slug}`}>
          <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {anime.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{anime.year}</span>
          <span className="line-clamp-1 max-w-[120px]">{anime.genres[0]}</span>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Episode } from '@/types/anime';
import { Play } from 'lucide-react';

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="group flex flex-col gap-2">
      <Link href={`/anime/${episode.animeSlug}/episodio/${episode.number}`} className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {episode.thumbnail ? (
          <Image
            src={episode.thumbnail}
            alt={episode.title || `Episodio ${episode.number}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card">
            <span className="text-muted-foreground">Sin miniatura</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg backdrop-blur-md">
            <Play className="h-6 w-6 ml-1" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 rounded-md bg-black/80 px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
          EP {episode.number}
        </div>
      </Link>
      
      <div className="flex flex-col">
        <Link href={`/anime/${episode.animeSlug}`}>
          <h4 className="line-clamp-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            {episode.title}
          </h4>
        </Link>
        <Link href={`/anime/${episode.animeSlug}/episodio/${episode.number}`}>
          <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            Episodio {episode.number}
          </h3>
        </Link>
      </div>
    </div>
  );
}

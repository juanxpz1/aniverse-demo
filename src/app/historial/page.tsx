'use client';

import { useWatchHistory } from '@/hooks/use-watch-history';
import { History, Play, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HistorialPage() {
  const { history, clearHistory, removeFromHistory } = useWatchHistory();

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 mt-16 pb-20 min-h-[70vh]">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20">
            <History className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mi Historial</h1>
            <p className="text-muted-foreground">Animes que has visto recientemente</p>
          </div>
        </div>

        {history.length > 0 && (
          <button 
            onClick={() => {
              if(confirm('¿Estás seguro de que deseas borrar todo el historial?')) clearHistory()
            }}
            className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
          >
            <Trash2 className="h-4 w-4" />
            Borrar Historial
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="flex flex-col gap-4">
          {history.map((item) => (
            <div key={item.episodeSlug} className="group flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-white/5 bg-card p-4 transition-all hover:bg-white/5">
              
              <Link 
                href={`/anime/${item.animeSlug}/episodio/${item.episodeNumber}`}
                className="relative aspect-video w-full sm:w-48 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={item.coverImage}
                  alt={item.animeTitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Play className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${Math.min(100, Math.max(0, (item.timestamp / (item.duration || 1)) * 100))}%` }} 
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col gap-1 w-full">
                <Link href={`/anime/${item.animeSlug}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {item.animeTitle}
                </Link>
                <Link href={`/anime/${item.animeSlug}/episodio/${item.episodeNumber}`} className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                  Episodio {item.episodeNumber}
                </Link>
                <div className="mt-2 text-xs text-muted-foreground">
                  Visto el {new Date(item.lastWatchedAt).toLocaleDateString()}
                </div>
              </div>

              <button 
                onClick={() => removeFromHistory(item.episodeSlug)}
                className="rounded-full p-2 text-muted-foreground opacity-0 transition-all hover:bg-white/10 hover:text-red-400 group-hover:opacity-100 self-start sm:self-center"
                title="Eliminar del historial"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 py-20 text-center">
          <History className="mb-4 h-16 w-16 text-muted-foreground opacity-20" />
          <h2 className="text-2xl font-bold text-foreground">Tu historial está vacío</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Aún no has visto ningún episodio. Comienza a ver tus animes favoritos y aparecerán aquí.
          </p>
          <Link 
            href="/" 
            className="mt-6 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90"
          >
            Ir al Inicio
          </Link>
        </div>
      )}
    </div>
  );
}

// Para usar el ícono X
import { X } from 'lucide-react';

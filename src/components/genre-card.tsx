import Link from 'next/link';
import { Genre } from '@/types/anime';
import { Layers } from 'lucide-react';

export function GenreCard({ genre }: { genre: Genre }) {
  // Generamos un gradiente pseudo-aleatorio basado en el nombre para variedad visual
  const colors = [
    'from-purple-600/20 to-blue-600/20',
    'from-pink-600/20 to-rose-600/20',
    'from-emerald-600/20 to-teal-600/20',
    'from-orange-600/20 to-red-600/20',
    'from-blue-600/20 to-cyan-600/20',
  ];
  const colorIndex = genre.name.length % colors.length;

  return (
    <Link 
      href={`/generos/${genre.slug}`}
      className={`group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br ${colors[colorIndex]} p-4 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]`}
    >
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
          {genre.name}
        </h3>
        {genre.count && (
          <span className="text-xs text-muted-foreground">
            {genre.count} animes
          </span>
        )}
      </div>
      
      <div className="relative z-10 rounded-full bg-white/5 p-2 transition-transform duration-300 group-hover:rotate-12 group-hover:bg-primary/20">
        <Layers className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
      </div>

      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}

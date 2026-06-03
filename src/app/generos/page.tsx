import { getGenres } from '@/lib/api/client';
import { GenreCard } from '@/components/genre-card';

export const revalidate = 3600;

export default async function GenresPage() {
  const genres = await getGenres();

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 mt-16 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Explorar Géneros
          <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </h1>
        <p className="mt-4 text-muted-foreground">
          Descubre nuevos animes según tus categorías favoritas. Desde acción trepidante hasta romances conmovedores.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {genres.map((genre) => (
          <GenreCard key={genre.slug} genre={genre} />
        ))}
      </div>
    </div>
  );
}

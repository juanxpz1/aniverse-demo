import { HeroSection } from '@/components/hero-section';
import { AnimeCarousel } from '@/components/anime-carousel';
import { EpisodeCard } from '@/components/episode-card';
import { GenreCard } from '@/components/genre-card';
import { 
  getPopularAnime, 
  getLatestEpisodes, 
  getGenres, 
  getAnimeDetails 
} from '@/lib/api/client';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const [popularAnimes, latestEpisodes, genres, featuredAnime] = await Promise.all([
    getPopularAnime(),
    getLatestEpisodes(),
    getGenres(),
    getAnimeDetails('solo-leveling') // Destacado fijo o puede ser aleatorio
  ]);

  return (
    <div className="flex flex-col pb-20">
      {/* Hero Section */}
      {featuredAnime && <HeroSection featured={featuredAnime} />}

      <div className="container mx-auto mt-8 flex flex-col gap-12 px-4 md:px-8">
        
        {/* Tendencias */}
        <section>
          <AnimeCarousel 
            title="Tendencias" 
            animes={popularAnimes} 
            viewAllLink="/tendencias" 
          />
        </section>

        {/* Últimos Episodios */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Últimos Episodios
              <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.slug} episode={episode} />
            ))}
          </div>
        </section>

        {/* Más Valorados */}
        <section>
          <AnimeCarousel 
            title="Más Valorados" 
            animes={[...popularAnimes].sort((a, b) => b.rating - a.rating)} 
            viewAllLink="/explorar?sort=rating" 
          />
        </section>

        {/* Géneros */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Explorar Géneros
              <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {genres.slice(0, 12).map((genre) => (
              <GenreCard key={genre.slug} genre={genre} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

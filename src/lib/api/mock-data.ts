import { Anime, Episode, Genre } from '@/types/anime';

export const MOCK_GENRES: Genre[] = [
  { name: 'Acción', slug: 'accion', count: 1240 },
  { name: 'Aventura', slug: 'aventura', count: 980 },
  { name: 'Comedia', slug: 'comedia', count: 1500 },
  { name: 'Drama', slug: 'drama', count: 850 },
  { name: 'Fantasía', slug: 'fantasia', count: 1100 },
  { name: 'Isekai', slug: 'isekai', count: 420 },
  { name: 'Mecha', slug: 'mecha', count: 350 },
  { name: 'Romance', slug: 'romance', count: 920 },
  { name: 'Sci-Fi', slug: 'sci-fi', count: 680 },
  { name: 'Shounen', slug: 'shounen', count: 1050 },
  { name: 'Slice of Life', slug: 'slice-of-life', count: 730 },
  { name: 'Spokon', slug: 'spokon', count: 210 },
];

export const MOCK_ANIMES: Anime[] = [
  {
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    alternativeTitle: 'Ore dake Level Up na Ken',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-m1gX3iqITmI6.png',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-1kF0wN8J6v1E.jpg',
    synopsis: 'Hace más de una década, aparecieron de repente unas misteriosas puertas que conectan el mundo humano con un reino de magia y monstruos...',
    genres: ['Acción', 'Aventura', 'Fantasía'],
    status: 'Emisión',
    type: 'TV',
    year: 2024,
    rating: 4.8,
    totalEpisodes: 12
  },
  {
    slug: 'jujutsu-kaisen-2',
    title: 'Jujutsu Kaisen 2nd Season',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-zB0A4Yg8W2A2.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/145064-1kF0wN8J6v1E.jpg',
    synopsis: 'La segunda temporada de Jujutsu Kaisen que adapta el arco de Shibuya.',
    genres: ['Acción', 'Fantasía', 'Sobrenatural'],
    status: 'Finalizado',
    type: 'TV',
    year: 2023,
    rating: 4.9,
    totalEpisodes: 23
  },
  {
    slug: 'frieren',
    title: 'Sousou no Frieren',
    alternativeTitle: 'Frieren: Beyond Journey\'s End',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1bJUH1PzI9G.jpg',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-1kF0wN8J6v1E.jpg',
    synopsis: 'La maga elfa Frieren y sus valientes compañeros aventureros han derrotado al Rey Demonio y traído la paz a la tierra.',
    genres: ['Aventura', 'Drama', 'Fantasía'],
    status: 'Finalizado',
    type: 'TV',
    year: 2023,
    rating: 4.9,
    totalEpisodes: 28
  },
  {
    slug: 'mashle-2',
    title: 'MASHLE: MAGIC AND MUSCLES Season 2',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx166610-8bJ3N2m2r0yB.jpg',
    synopsis: 'Mash Burnedead es un joven sin magia que vive en un mundo donde esta lo es todo.',
    genres: ['Acción', 'Comedia', 'Fantasía'],
    status: 'Emisión',
    type: 'TV',
    year: 2024,
    rating: 4.6,
    totalEpisodes: 12
  },
  {
    slug: 'ninja-kamui',
    title: 'Ninja Kamui',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153188-uXvO1nZ1oG2K.jpg',
    synopsis: 'Un antiguo ninja escapa de su clan y debe esconderse con su familia en América de quienes intentan matarlo.',
    genres: ['Acción', 'Thriller'],
    status: 'Emisión',
    type: 'TV',
    year: 2024,
    rating: 4.7,
    totalEpisodes: 12
  }
];

export const MOCK_LATEST_EPISODES: Episode[] = [
  {
    number: 8,
    slug: 'solo-leveling-8',
    animeSlug: 'solo-leveling',
    title: 'Solo Leveling Episodio 8',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-m1gX3iqITmI6.png'
  },
  {
    number: 7,
    slug: 'mashle-2-7',
    animeSlug: 'mashle-2',
    title: 'MASHLE Season 2 Episodio 7',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx166610-8bJ3N2m2r0yB.jpg'
  },
  {
    number: 4,
    slug: 'ninja-kamui-4',
    animeSlug: 'ninja-kamui',
    title: 'Ninja Kamui Episodio 4',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153188-uXvO1nZ1oG2K.jpg'
  },
  {
    number: 25,
    slug: 'frieren-25',
    animeSlug: 'frieren',
    title: 'Sousou no Frieren Episodio 25',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-n1bJUH1PzI9G.jpg'
  }
];

export const MOCK_EPISODES: Record<string, Episode[]> = {
  'solo-leveling': Array.from({ length: 8 }, (_, i) => ({
    number: i + 1,
    slug: `solo-leveling-${i + 1}`,
    animeSlug: 'solo-leveling',
    title: `Episodio ${i + 1}`,
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-m1gX3iqITmI6.png'
  })),
  'jujutsu-kaisen-2': Array.from({ length: 23 }, (_, i) => ({
    number: i + 1,
    slug: `jujutsu-kaisen-2-${i + 1}`,
    animeSlug: 'jujutsu-kaisen-2',
    title: `Episodio ${i + 1}`
  })),
  'frieren': Array.from({ length: 25 }, (_, i) => ({
    number: i + 1,
    slug: `frieren-${i + 1}`,
    animeSlug: 'frieren',
    title: `Episodio ${i + 1}`
  }))
};

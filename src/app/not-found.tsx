import Link from 'next/link';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center mt-16">
      <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/30">
          <span className="font-outfit text-5xl font-black text-white">404</span>
        </div>
      </div>
      
      <h1 className="mb-2 text-3xl font-bold md:text-5xl">Página no encontrada</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Parece que te has perdido en otra dimensión. La página que buscas no existe o ha sido movida.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90"
        >
          <Home className="h-5 w-5" />
          Volver al Inicio
        </Link>
        <Link 
          href="/explorar"
          className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-3 font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-md"
        >
          <Search className="h-5 w-5" />
          Explorar Animes
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Play, Github, Twitter, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-background relative overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-4 lg:gap-12">
          
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Ani<span className="text-gradient">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Tu plataforma definitiva para explorar y disfrutar del mejor anime. Diseño premium, experiencia fluida y totalmente gratis.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="https://github.com/FxxMorgan/anime1v-api" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Navegación</h4>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
            <Link href="/explorar" className="text-sm text-muted-foreground hover:text-primary transition-colors">Explorar</Link>
            <Link href="/tendencias" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tendencias</Link>
            <Link href="/generos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Géneros</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Legal & API</h4>
            <Link href="/dmca" className="text-sm text-muted-foreground hover:text-primary transition-colors">DMCA</Link>
            <Link href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Términos de Uso</Link>
            <div className="mt-2 rounded-lg bg-white/5 p-3 border border-white/5">
              <p className="text-xs text-muted-foreground">
                Powered by <a href="https://github.com/FxxMorgan/anime1v-api" target="_blank" rel="noreferrer" className="text-primary hover:underline">Anime1V API</a> by FxxMorgan.
              </p>
            </div>
          </div>

        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AniVerse. Ningún archivo está alojado en nuestros servidores.
          </p>
        </div>
      </div>
    </footer>
  );
}

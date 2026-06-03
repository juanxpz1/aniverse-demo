'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/app-store';
import { Home, Compass, TrendingUp, Layers, Heart, History, X } from 'lucide-react';
import { useEffect } from 'react';

const NAV_LINKS = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Explorar', href: '/explorar', icon: Compass },
  { name: 'Tendencias', href: '/tendencias', icon: TrendingUp },
  { name: 'Géneros', href: '/generos', icon: Layers },
];

const USER_LINKS = [
  { name: 'Favoritos', href: '/favoritos', icon: Heart },
  { name: 'Historial', href: '/historial', icon: History },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppStore();

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-card shadow-2xl transition-transform animate-in slide-in-from-right">
        <div className="flex h-16 items-center justify-end px-4">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Menú Principal
            </h4>
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Mi Espacio
            </h4>
            {USER_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/80 hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

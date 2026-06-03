'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Play } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Explorar', href: '/explorar' },
  { name: 'Tendencias', href: '/tendencias' },
  { name: 'Géneros', href: '/generos' },
];

export function Navbar() {
  const pathname = usePathname();
  const { setSearchModalOpen, isMobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
            <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Ani<span className="text-gradient">Verse</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSearchModalOpen(true)}
            className="flex h-9 items-center justify-between rounded-full bg-white/5 px-3 text-sm text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground md:w-64 md:border md:border-white/10"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Buscar animes...</span>
            </div>
            <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-foreground/60 md:inline-block">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Toggle */}
          <button 
            className="p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}

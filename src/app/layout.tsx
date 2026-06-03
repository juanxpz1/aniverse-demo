import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchModal } from '@/components/search-modal';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AniVerse | Tu portal de anime definitivo',
  description: 'Explora y mira el mejor anime en HD, sin publicidad invasiva. Una experiencia premium de streaming.',
  keywords: 'anime, streaming, ver anime, aniverse, anime online, hd',
  openGraph: {
    title: 'AniVerse | Tu portal de anime definitivo',
    description: 'Explora y mira el mejor anime en HD.',
    type: 'website',
    locale: 'es_LA',
    siteName: 'AniVerse',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AniVerse | Tu portal de anime definitivo',
    description: 'Explora y mira el mejor anime en HD.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/30 selection:text-white">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <MobileNav />
          <SearchModal />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

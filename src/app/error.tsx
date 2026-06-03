'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center mt-16">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <AlertTriangle className="h-12 w-12" />
      </div>
      
      <h2 className="mb-2 text-2xl font-bold">¡Ups! Algo salió mal</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Ha ocurrido un error inesperado al cargar esta página. Por favor, intenta de nuevo.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90"
        >
          <RefreshCcw className="h-4 w-4" />
          Reintentar
        </button>
        <Link 
          href="/"
          className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-md"
        >
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
}

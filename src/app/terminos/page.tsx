import Link from 'next/link';

export const metadata = {
  title: 'Términos de Uso - Aniverse',
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 mt-16 pb-20">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Términos de Uso</h1>
        <p className="text-muted-foreground">
          Bienvenido a Aniverse. Al utilizar este sitio aceptas nuestros términos y condiciones.
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/5">
          <h2 className="text-2xl font-semibold text-foreground">Uso del servicio</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            El contenido que se muestra aquí es solo para fines de demostración y entretenimiento. No almacenamos archivos de vídeo en este sitio.
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            No debes utilizar este servicio para distribuir material protegido sin autorización. Respeta las leyes de propiedad intelectual.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}

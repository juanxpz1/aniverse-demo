import Link from 'next/link';

export const metadata = {
  title: 'DMCA - Aniverse',
};

export default function DmcaPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 mt-16 pb-20">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold text-foreground">DMCA</h1>
        <p className="text-muted-foreground">
          Esta página está dedicada a la política de derechos de autor y el procedimiento de notificación de DMCA para Aniverse.
        </p>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/5">
          <h2 className="text-2xl font-semibold text-foreground">Notificación de infracción</h2>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            Si considera que algún contenido del sitio infringe sus derechos de autor, por favor póngase en contacto con nosotros describiendo la obra protegida y su ubicación exacta en el sitio.
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground/80">
            Incluya sus datos de contacto y una declaración de buena fe. Responderemos lo antes posible y retiraremos el contenido si procede.
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

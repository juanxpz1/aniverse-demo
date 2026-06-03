'use client';

import { useState, useRef, useEffect } from 'react';
import { VideoServer } from '@/types/anime';
import { Loader2, MonitorPlay } from 'lucide-react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  servers: VideoServer[];
  poster?: string;
}

export function VideoPlayer({ servers, poster }: VideoPlayerProps) {
  const [activeServer, setActiveServer] = useState<VideoServer | null>(servers[0] || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize HLS for native streams
  useEffect(() => {
    if (!activeServer || activeServer.type === 'iframe') {
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (activeServer.type === 'hls' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(activeServer.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });
      hls.on(Hls.Events.ERROR, () => {
        setError(true);
        setIsLoading(false);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = activeServer.url;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
      });
    } else if (activeServer.type === 'mp4') {
      video.src = activeServer.url;
      setIsLoading(false);
    }
  }, [activeServer]);

  if (!servers.length) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center bg-black/80 rounded-xl border border-white/10">
        <MonitorPlay className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No hay servidores disponibles</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Player Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/90">
            <p className="text-red-400">Error al cargar el video.</p>
            <button 
              onClick={() => setError(false)}
              className="text-sm text-primary hover:underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {activeServer?.type === 'iframe' ? (
          <iframe
            src={activeServer.url}
            className="h-full w-full border-0"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full"
            controls
            poster={poster}
            onPlaying={() => setIsLoading(false)}
            onError={() => setError(true)}
          >
            Tu navegador no soporta el elemento de video.
          </video>
        )}
      </div>

      {/* Server Selection */}
      <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/5 p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Opciones de Servidor</h3>
        <div className="flex flex-wrap gap-2">
          {servers.map((server, idx) => (
            <button
              key={`${server.name}-${idx}`}
              onClick={() => {
                setIsLoading(true);
                setError(false);
                setActiveServer(server);
              }}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeServer?.name === server.name
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
              }`}
            >
              {server.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

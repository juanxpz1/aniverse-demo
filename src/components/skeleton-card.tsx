export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
        <div className="h-full w-full animate-pulse bg-white/5" />
      </div>
      <div className="flex flex-col gap-2 py-1">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="flex justify-between">
          <div className="h-3 w-8 animate-pulse rounded bg-white/5" />
          <div className="h-3 w-16 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

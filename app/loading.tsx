export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex items-center gap-2 text-muted-foreground" aria-live="polite" aria-busy="true">
        <span className="inline-block h-3 w-3 rounded-full bg-primary animate-pulse" />
        <span className="inline-block h-3 w-3 rounded-full bg-primary/70 animate-pulse [animation-delay:150ms]" />
        <span className="inline-block h-3 w-3 rounded-full bg-primary/50 animate-pulse [animation-delay:300ms]" />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  )
}

export default function TagPill({ children, icon = '✦' }) {
  return (
    <span className="inline-flex items-center gap-2 bg-blush text-pink text-[11px] font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
      <span className="text-pink/80">{icon}</span>
      {children}
    </span>
  );
}
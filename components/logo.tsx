export function Logo({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  const fg = light ? "#fff" : "#0B0F19";
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="sulab-lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="2" y="6" width="12" height="20" rx="3" fill="url(#sulab-lg)" />
        <rect x="12" y="2" width="12" height="24" rx="3" fill={light ? "rgba(255,255,255,0.85)" : "#0B0F19"} />
        <rect x="20" y="10" width="10" height="16" rx="3" fill="#7C3AED" opacity="0.95" />
      </svg>
      <span className="font-display font-bold text-[19px] tracking-tight" style={{ color: fg }}>
        sulab
      </span>
    </div>
  );
}

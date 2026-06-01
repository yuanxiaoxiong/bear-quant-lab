export function BearLogo({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-[oklch(0.55_0.22_265)] ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.22 }}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-30">
        {[18, 30, 42].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} stroke="white" strokeWidth="0.6" fill="none" />
        ))}
        {[0, 45, 90, 135].map((a) => (
          <line
            key={a}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((a * Math.PI) / 180)}
            y2={50 + 45 * Math.sin((a * Math.PI) / 180)}
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>
      {/* Bear head */}
      <svg viewBox="0 0 64 64" className="relative h-[62%] w-[62%]" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="6.5" />
        <circle cx="46" cy="18" r="6.5" />
        <path d="M12 36 C12 50, 52 50, 52 36 C52 26, 42 22, 32 22 C22 22, 12 26, 12 36 Z" />
        <circle cx="25" cy="35" r="1.6" fill="white" />
        <circle cx="39" cy="35" r="1.6" fill="white" />
        <path d="M30 42 Q32 44 34 42" />
      </svg>
    </div>
  );
}

import { ChevronLeft } from "lucide-react";

export function NavBar({
  title,
  largeTitle,
  scrolled,
  trailing,
}: {
  title: string;
  largeTitle?: string;
  scrolled: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-40">
      <div
        className={`backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-card/80 border-b border-border/60"
            : "bg-card/0 border-b border-transparent"
        }`}
      >
        <div className="flex h-11 items-center justify-between px-4">
          <button className="ios-press flex items-center text-primary -ml-1">
            <ChevronLeft size={22} strokeWidth={1.8} />
          </button>
          <span
            className={`text-[15px] font-semibold transition-opacity duration-200 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </span>
          <div className="flex items-center gap-1.5 text-primary">{trailing}</div>
        </div>
        {largeTitle !== undefined && (
          <div
            className={`overflow-hidden px-4 transition-all duration-300 ${
              scrolled ? "max-h-0 opacity-0" : "max-h-16 pb-2 opacity-100"
            }`}
          >
            <h1 className="text-[30px] font-bold tracking-tight">{largeTitle ?? title}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

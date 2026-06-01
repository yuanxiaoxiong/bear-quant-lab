import { LayoutGrid, LineChart, FlaskConical, User } from "lucide-react";

export type TabKey = "strategies" | "markets" | "backtest" | "me";

const TABS: { key: TabKey; label: string; icon: React.ComponentType<any>; badge?: boolean }[] = [
  { key: "strategies", label: "策略", icon: LayoutGrid, badge: true },
  { key: "markets", label: "行情", icon: LineChart },
  { key: "backtest", label: "沙盒", icon: FlaskConical },
  { key: "me", label: "我的", icon: User },
];

export function TabBar({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border/60 bg-card/85 backdrop-blur-xl">
      <div className="grid grid-cols-4">
        {TABS.map((t) => {
          const Icon = t.icon;
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className="ios-press flex flex-col items-center gap-0.5 py-1.5"
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 1.9 : 1.5}
                  className={isActive ? "text-primary" : "text-muted-foreground"}
                />
                {t.badge && (
                  <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 rounded-full bg-danger ring-2 ring-card" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* iOS Home indicator */}
      <div className="flex justify-center pb-1.5 pt-1">
        <div className="h-[5px] w-[134px] rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}

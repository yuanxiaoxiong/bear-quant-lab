import { useState } from "react";
import { ChevronRight, Activity } from "lucide-react";
import { StrategyCard, type Strategy } from "../StrategyCard";
import { LiveLogConsole } from "../LiveLogConsole";
import { initialStrategies } from "../../../lib/bear/data";

export function StrategiesTab() {
  const [strategies, setStrategies] = useState<Strategy[]>(initialStrategies);
  const toggle = (id: string) =>
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === "running" ? "paused" : "running" } : s
      )
    );

  const running = strategies.filter((s) => s.status === "running").length;

  const groups = [
    { key: "网格策略", items: strategies.filter((s) => s.name.includes("网格")) },
    { key: "趋势 / 均线", items: strategies.filter((s) => s.name.includes("均线") || s.name.includes("趋势")) },
    { key: "小熊闪电", items: strategies.filter((s) => s.name.includes("闪电")) },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="px-4 pb-4">
      {/* Header / portfolio */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5">
        <div className="absolute inset-0 bg-tf-radial opacity-60" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="text-[12px] font-medium text-muted-foreground">总资产 (USDT)</div>
            <div className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10.5px] text-muted-foreground">
              <Activity size={11} strokeWidth={1.5} /> {running} 策略运行中
            </div>
          </div>
          <div className="mt-1 font-mono text-[34px] font-semibold leading-tight tracking-tight">
            128,452.<span className="text-muted-foreground">31</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-md bg-[oklch(0.94_0.08_145)] px-1.5 py-0.5 font-mono text-[12px] font-semibold text-[oklch(0.55_0.18_145)]">
              ↑ +1.24%
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">+ 1,562.40 今日</span>
          </div>
        </div>
      </div>

      {/* Groups */}
      {groups.map((g) => (
        <div key={g.key} className="mt-5">
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.key}
            </h2>
            <button className="ios-press flex items-center text-[12px] text-primary">
              全部 <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </div>
          <div className="space-y-2.5">
            {g.items.map((s) => (
              <StrategyCard key={s.id} strategy={s} onToggle={toggle} />
            ))}
          </div>
        </div>
      ))}

      {/* Live console */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
            活动控制台
          </h2>
          <span className="font-mono text-[10.5px] text-muted-foreground">stream · v1.0</span>
        </div>
        <LiveLogConsole running />
      </div>
    </div>
  );
}

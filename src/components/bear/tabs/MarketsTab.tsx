import { useMemo, useState } from "react";
import { Search, Star } from "lucide-react";
import { initialMarkets, type MarketItem } from "../../../lib/bear/data";
import { SegmentedControl } from "../SegmentedControl";
import { Sparkline } from "../Sparkline";
import { BacktestSheet } from "../BacktestSheet";

export function MarketsTab() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState<"watch" | "all">("watch");
  const [selected, setSelected] = useState<MarketItem | null>(null);

  const list = useMemo(() => {
    const base = scope === "watch" ? initialMarkets.slice(0, 4) : initialMarkets;
    if (!q) return base;
    return base.filter(
      (m) =>
        m.symbol.toLowerCase().includes(q.toLowerCase()) ||
        m.name.toLowerCase().includes(q.toLowerCase())
    );
  }, [q, scope]);

  return (
    <div className="px-4 pb-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索标的 / 策略代码"
          className="h-10 w-full rounded-xl border border-transparent bg-secondary pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
        />
      </div>

      <div className="mt-3">
        <SegmentedControl
          value={scope}
          onChange={setScope}
          options={[
            { value: "watch", label: "自选" },
            { value: "all", label: "全部" },
          ]}
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card">
        {list.map((m, i) => {
          const positive = m.change >= 0;
          return (
            <button
              key={m.symbol}
              onClick={() => setSelected(m)}
              className={`ios-press flex w-full items-center gap-3 px-3.5 py-3 text-left ${
                i !== list.length - 1 ? "border-b border-border/60" : ""
              }`}
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
                <Star size={15} strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14.5px] font-semibold">{m.symbol}</div>
                <div className="truncate text-[11px] text-muted-foreground">{m.name}</div>
              </div>
              <Sparkline
                data={m.spark}
                width={56}
                height={22}
                color={positive ? "oklch(0.7 0.18 145)" : "oklch(0.66 0.22 25)"}
              />
              <div className="ml-1 flex flex-col items-end">
                <span className="font-mono text-[13.5px] font-semibold">{m.price}</span>
                <span
                  className={`mt-0.5 rounded-md px-1.5 py-[1px] font-mono text-[11px] font-semibold ${
                    positive
                      ? "bg-[oklch(0.94_0.08_145)] text-[oklch(0.5_0.18_145)]"
                      : "bg-[oklch(0.95_0.07_25)] text-[oklch(0.55_0.22_25)]"
                  }`}
                >
                  {positive ? "+" : ""}
                  {m.change.toFixed(2)}%
                </span>
              </div>
            </button>
          );
        })}
        {list.length === 0 && (
          <div className="p-8 text-center text-[12px] text-muted-foreground">未找到匹配的标的</div>
        )}
      </div>

      <BacktestSheet item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

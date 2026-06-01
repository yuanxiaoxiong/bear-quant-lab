import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { MarketItem } from "../../lib/bear/data";
import { Sparkline } from "./Sparkline";
import { SegmentedControl } from "./SegmentedControl";

export function BacktestSheet({ item, onClose }: { item: MarketItem | null; onClose: () => void }) {
  const [period, setPeriod] = useState<"1W" | "1M" | "3M" | "1Y">("1M");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!item) {
      setDone(false);
      setLoading(false);
    }
  }, [item]);

  if (!item) return null;

  const run = () => {
    setDone(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  const positive = item.change >= 0;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end fade-in">
      <button className="flex-1 bg-black/30" onClick={onClose} aria-label="close" />
      <div className="sheet-up rounded-t-[28px] border-t border-border bg-card pb-8 shadow-2xl">
        <div className="mx-auto mt-2 h-1 w-9 rounded-full bg-border" />
        <div className="flex items-center justify-between px-5 pt-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">回测沙盒</div>
            <h2 className="text-[20px] font-semibold">{item.symbol}</h2>
          </div>
          <button
            onClick={onClose}
            className="ios-press grid h-8 w-8 place-items-center rounded-full bg-secondary text-muted-foreground"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-2 flex items-baseline gap-2 px-5">
          <span className="font-mono text-2xl font-semibold">{item.price}</span>
          <span
            className={`font-mono text-sm font-semibold ${
              positive ? "text-[oklch(0.65_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"
            }`}
          >
            {positive ? "+" : ""}
            {item.change.toFixed(2)}%
          </span>
        </div>

        <div className="mt-3 px-3">
          <Sparkline
            data={item.spark}
            width={380}
            height={90}
            color={positive ? "oklch(0.7 0.18 145)" : "oklch(0.66 0.22 25)"}
            className="w-full"
          />
        </div>

        <div className="px-5 pt-2">
          <SegmentedControl
            value={period}
            onChange={setPeriod}
            options={[
              { value: "1W", label: "1周" },
              { value: "1M", label: "1月" },
              { value: "3M", label: "3月" },
              { value: "1Y", label: "1年" },
            ]}
          />
        </div>

        <button
          onClick={run}
          disabled={loading}
          className="ios-press mx-5 mt-4 flex w-[calc(100%-2.5rem)] items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground"
        >
          {loading ? (
            <>
              <span className="spin-ios inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
              回测计算中…
            </>
          ) : done ? (
            "重新回测"
          ) : (
            "一键回测"
          )}
        </button>

        {done && (
          <div className="mx-5 mt-3 grid grid-cols-3 gap-2 fade-in">
            {[
              { k: "夏普", v: "2.18" },
              { k: "回撤", v: "-8.4%" },
              { k: "胜率", v: "63%" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl bg-secondary p-2.5 text-center">
                <div className="text-[10px] uppercase text-muted-foreground">{m.k}</div>
                <div className="mt-0.5 font-mono text-[15px] font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

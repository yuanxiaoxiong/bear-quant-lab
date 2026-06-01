import { useState } from "react";
import { Calendar, Zap } from "lucide-react";
import { SegmentedControl } from "../SegmentedControl";
import { backtestCurves } from "../../../lib/bear/data";

function DualLineChart({ a, b, width = 360, height = 160 }: { a: number[]; b: number[]; width?: number; height?: number }) {
  const all = [...a, ...b];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const stepX = width / (a.length - 1);
  const toPath = (arr: number[]) =>
    arr
      .map((v, i) => {
        const x = i * stepX;
        const y = height - ((v - min) / range) * (height - 12) - 6;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="bt-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* faint gridlines */}
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" y1={height * p} x2={width} y2={height * p} stroke="var(--color-border)" strokeDasharray="2 4" />
      ))}
      <path d={`${toPath(a)} L ${width} ${height} L 0 ${height} Z`} fill="url(#bt-grad)" />
      <path d={toPath(b)} fill="none" stroke="var(--color-muted-foreground)" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d={toPath(a)} fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BacktestTab() {
  const [capital, setCapital] = useState(10000);
  const [lev, setLev] = useState<"1x" | "3x" | "5x" | "10x">("3x");
  const [loading, setLoading] = useState(false);
  const [hasResult, setHasResult] = useState(true);

  const run = () => {
    setLoading(true);
    setHasResult(false);
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
    }, 1800);
  };

  return (
    <div className="px-4 pb-4">
      <div className="rounded-3xl border border-border/60 bg-card p-4">
        <h2 className="text-[15px] font-semibold">回测配置</h2>
        <p className="mt-0.5 text-[11.5px] text-muted-foreground">沙盒模式下不影响实盘账户</p>

        {/* Period */}
        <div className="mt-4 rounded-2xl bg-secondary p-3">
          <div className="flex items-center justify-between text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={1.5} /> 回测区间
            </span>
            <span className="font-mono text-foreground">2024-01-01 → 2024-12-31</span>
          </div>
        </div>

        {/* Capital slider */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-muted-foreground">初始资金</span>
            <span className="font-mono font-semibold">{capital.toLocaleString()} USDT</span>
          </div>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-primary)]"
          />
        </div>

        {/* Leverage */}
        <div className="mt-4">
          <div className="mb-1.5 text-[12px] text-muted-foreground">杠杆倍数</div>
          <SegmentedControl
            value={lev}
            onChange={setLev}
            options={[
              { value: "1x", label: "1x" },
              { value: "3x", label: "3x" },
              { value: "5x", label: "5x" },
              { value: "10x", label: "10x" },
            ]}
          />
        </div>

        <button
          onClick={run}
          disabled={loading}
          className="ios-press mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground"
        >
          {loading ? (
            <>
              <span className="spin-ios inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
              引擎正在加载…
            </>
          ) : (
            <>
              <Zap size={15} strokeWidth={2} /> 一键回测
            </>
          )}
        </button>
      </div>

      {hasResult && (
        <div className="mt-5 fade-in rounded-3xl border border-border/60 bg-card p-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[15px] font-semibold">回测结果</h2>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-[24px] font-semibold text-[oklch(0.55_0.18_145)]">+42.18%</span>
                <span className="text-[11px] text-muted-foreground">vs 基准 +11.2%</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-0.5 text-[10.5px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 bg-primary" /> 策略</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-3 border-t border-dashed border-muted-foreground" /> 基准</span>
            </div>
          </div>

          <div className="mt-3 -mx-1">
            <DualLineChart a={backtestCurves.strategy} b={backtestCurves.benchmark} />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              { k: "夏普", v: "2.18" },
              { k: "回撤", v: "-8.4%" },
              { k: "胜率", v: "63%" },
              { k: "交易", v: "412" },
            ].map((m) => (
              <div key={m.k} className="rounded-xl bg-secondary p-2 text-center">
                <div className="text-[9.5px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
                <div className="mt-0.5 font-mono text-[13.5px] font-semibold">{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

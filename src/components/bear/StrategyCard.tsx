import { BearLogo } from "./BearLogo";
import { Sparkline } from "./Sparkline";

export type Strategy = {
  id: string;
  name: string;
  build: string;
  status: "running" | "paused" | "testing";
  desc: string;
  pnl: number; // %
  spark: number[];
};

type Props = {
  strategy: Strategy;
  onToggle: (id: string) => void;
};

export function StrategyCard({ strategy, onToggle }: Props) {
  const isOn = strategy.status === "running";
  const isTesting = strategy.status === "testing";
  const positive = strategy.pnl >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-3.5">
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-[14px] bg-tf-grid opacity-50" />
          <BearLogo size={52} className="relative" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold text-foreground">{strategy.name}</h3>
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            {isOn && <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />}
            <span className="font-mono">
              {isOn ? "运行中" : isTesting ? "测试中" : "已暂停"} · Build {strategy.build}
            </span>
          </div>
          <p className="mt-1 line-clamp-1 text-[11.5px] leading-snug text-muted-foreground">{strategy.desc}</p>
        </div>

        <button
          onClick={() => onToggle(strategy.id)}
          className={`ios-press shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold tracking-wide ${
            isOn
              ? "bg-secondary text-primary"
              : "bg-primary text-primary-foreground"
          }`}
        >
          {isOn ? "暂停" : "运行"}
        </button>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">收益</div>
          <div
            className={`font-mono text-[17px] font-semibold ${
              positive ? "text-[oklch(0.65_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"
            }`}
          >
            {positive ? "+" : ""}
            {strategy.pnl.toFixed(2)}%
          </div>
        </div>
        <Sparkline
          data={strategy.spark}
          width={140}
          height={40}
          color={positive ? "oklch(0.7 0.18 145)" : "oklch(0.66 0.22 25)"}
        />
      </div>
    </div>
  );
}

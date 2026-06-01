import { useEffect, useRef, useState } from "react";

const SAMPLE_LOGS = [
  { t: "BUY", s: "BTC/USDT", p: "67,432.10", q: "0.025" },
  { t: "SELL", s: "ETH/USDT", p: "3,521.40", q: "0.5" },
  { t: "BUY", s: "AAPL", p: "228.55", q: "10" },
  { t: "GRID", s: "SOL/USDT", p: "164.22", q: "1.2" },
  { t: "SELL", s: "BTC/USDT", p: "67,510.00", q: "0.015" },
  { t: "BUY", s: "TSLA", p: "352.40", q: "5" },
  { t: "ALERT", s: "MA(5,20)", p: "金叉触发", q: "—" },
  { t: "BUY", s: "ETH/USDT", p: "3,510.20", q: "0.8" },
  { t: "SELL", s: "SOL/USDT", p: "165.10", q: "0.6" },
];

type Line = { id: number; ts: string; t: string; s: string; p: string; q: string };

export function LiveLogConsole({ running = true, height = 168 }: { running?: boolean; height?: number }) {
  const [lines, setLines] = useState<Line[]>([]);
  const idRef = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;
    const push = () => {
      const sample = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      const now = new Date();
      const ts = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      setLines((prev) => {
        const next = [...prev, { id: idRef.current++, ts, ...sample }];
        return next.slice(-40);
      });
    };
    push();
    const id = setInterval(push, 1400);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  const colorOf = (t: string) => {
    if (t === "BUY") return "text-[oklch(0.78_0.18_145)]";
    if (t === "SELL") return "text-[oklch(0.72_0.22_25)]";
    if (t === "ALERT") return "text-[oklch(0.8_0.16_85)]";
    return "text-primary";
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.16_0.01_250)] p-3 font-mono text-[10.5px] leading-relaxed text-neutral-300 shadow-inner"
      style={{ height }}
    >
      <div className="absolute right-3 top-2 flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-neutral-500">
        <span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-success pulse-dot" : "bg-neutral-600"}`} />
        LIVE LOG
      </div>
      <div className="mt-4 h-[calc(100%-1rem)] overflow-y-auto no-scrollbar">
        {lines.map((l) => (
          <div key={l.id} className="log-line flex gap-2 whitespace-nowrap">
            <span className="text-neutral-500">{l.ts}</span>
            <span className={`w-10 font-semibold ${colorOf(l.t)}`}>{l.t}</span>
            <span className="text-neutral-200">{l.s}</span>
            <span className="ml-auto text-neutral-400">@{l.p}</span>
            <span className="w-12 text-right text-neutral-500">×{l.q}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}

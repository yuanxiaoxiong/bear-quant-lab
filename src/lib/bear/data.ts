import type { Strategy } from "../components/bear/StrategyCard";

function gen(seed: number, n = 24, drift = 0.1) {
  let v = 50;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    v += Math.sin((i + seed) * 0.7) * 3 + (Math.cos((i + seed) * 0.31) - 0.4) * 2 + drift;
    out.push(v);
  }
  return out;
}

export const initialStrategies: Strategy[] = [
  {
    id: "s1",
    name: "BTC 网格套利",
    build: "1.04",
    status: "running",
    desc: "策略目标：高频网格套利，预计周转率 200%",
    pnl: 4.82,
    spark: gen(1, 30, 0.3),
  },
  {
    id: "s2",
    name: "双均线 · ETH",
    build: "0.92",
    status: "testing",
    desc: "MA(5) 与 MA(20) 金叉买入，死叉卖出",
    pnl: 1.34,
    spark: gen(7, 30, 0.15),
  },
  {
    id: "s3",
    name: "小熊闪电策略",
    build: "2.01",
    status: "paused",
    desc: "动量突破 + 风险预算，自动跟踪止损",
    pnl: -0.76,
    spark: gen(13, 30, -0.2),
  },
  {
    id: "s4",
    name: "AAPL 趋势跟随",
    build: "1.10",
    status: "running",
    desc: "日线趋势识别，仓位金字塔加码",
    pnl: 2.14,
    spark: gen(21, 30, 0.18),
  },
];

export type MarketItem = {
  symbol: string;
  name: string;
  price: string;
  change: number;
  spark: number[];
};

export const initialMarkets: MarketItem[] = [
  { symbol: "BTC/USDT", name: "Bitcoin", price: "67,432.10", change: 2.41, spark: gen(3) },
  { symbol: "ETH/USDT", name: "Ethereum", price: "3,521.40", change: 1.18, spark: gen(5) },
  { symbol: "SOL/USDT", name: "Solana", price: "164.22", change: -1.24, spark: gen(8, 24, -0.3) },
  { symbol: "AAPL", name: "Apple Inc.", price: "228.55", change: 0.62, spark: gen(11) },
  { symbol: "TSLA", name: "Tesla", price: "352.40", change: -2.86, spark: gen(15, 24, -0.4) },
  { symbol: "NVDA", name: "NVIDIA", price: "142.07", change: 3.42, spark: gen(19, 24, 0.5) },
];

// Backtest result curves
export const backtestCurves = {
  strategy: gen(2, 60, 0.6),
  benchmark: gen(9, 60, 0.18),
};

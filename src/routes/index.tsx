import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bell, Plus, MoreHorizontal } from "lucide-react";
import { StatusBar } from "../components/bear/StatusBar";
import { NavBar } from "../components/bear/NavBar";
import { TabBar, type TabKey } from "../components/bear/TabBar";
import { StrategiesTab } from "../components/bear/tabs/StrategiesTab";
import { MarketsTab } from "../components/bear/tabs/MarketsTab";
import { BacktestTab } from "../components/bear/tabs/BacktestTab";
import { SettingsTab } from "../components/bear/tabs/SettingsTab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "小熊量化 · Bear Quant" },
      { name: "description", content: "TestFlight 风格的量化交易与策略回测沙盒 — 小熊量化" },
      { property: "og:title", content: "小熊量化 · Bear Quant" },
      { property: "og:description", content: "极简 iOS 风格量化交易工作台，策略回测一站完成。" },
    ],
  }),
  component: BearApp,
});

const TAB_META: Record<TabKey, { title: string; large: string; trailing?: React.ReactNode }> = {
  strategies: { title: "策略", large: "策略", trailing: <Plus size={20} strokeWidth={1.8} /> },
  markets: { title: "行情", large: "行情", trailing: <Bell size={19} strokeWidth={1.6} /> },
  backtest: { title: "沙盒", large: "回测沙盒", trailing: <MoreHorizontal size={20} strokeWidth={1.8} /> },
  me: { title: "我的", large: "我的", trailing: <MoreHorizontal size={20} strokeWidth={1.8} /> },
};

function BearApp() {
  const [tab, setTab] = useState<TabKey>("strategies");
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setScrolled(false);
  }, [tab]);

  const meta = TAB_META[tab];

  return (
    <div className="flex min-h-screen w-full justify-center bg-[oklch(0.93_0.008_240)] dark:bg-[oklch(0.08_0.005_250)] sm:py-8">
      {/* Phone shell */}
      <div className="relative mx-auto flex w-full max-w-[412px] flex-col overflow-hidden bg-background shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] sm:rounded-[44px] sm:border-[10px] sm:border-neutral-800/90 sm:max-h-[860px] sm:min-h-[820px]">
        <div
          ref={scrollRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 12)}
          className="relative flex-1 overflow-y-auto no-scrollbar"
        >
          <StatusBar />
          <NavBar
            title={meta.title}
            largeTitle={meta.large}
            scrolled={scrolled}
            trailing={meta.trailing}
          />
          <main className="pb-4">
            {tab === "strategies" && <StrategiesTab />}
            {tab === "markets" && <MarketsTab />}
            {tab === "backtest" && <BacktestTab />}
            {tab === "me" && <SettingsTab />}
          </main>
        </div>
        <TabBar active={tab} onChange={setTab} />
      </div>
    </div>
  );
}

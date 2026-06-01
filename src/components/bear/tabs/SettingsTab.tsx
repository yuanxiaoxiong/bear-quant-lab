import { useState } from "react";
import { ChevronRight, Eye, EyeOff, Trash2, Info, KeyRound, ShieldCheck } from "lucide-react";
import { BearLogo } from "../BearLogo";

function Row({
  icon,
  label,
  value,
  onClick,
  right,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="ios-press flex w-full items-center gap-3 px-3.5 py-3 text-left"
    >
      {icon && <div className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-primary">{icon}</div>}
      <span className="flex-1 text-[14px] text-foreground">{label}</span>
      {value && <span className="font-mono text-[12.5px] text-muted-foreground">{value}</span>}
      {right ?? <ChevronRight size={16} strokeWidth={1.5} className="text-muted-foreground" />}
    </button>
  );
}

function Group({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      {title && (
        <div className="mb-1.5 px-2 text-[11.5px] uppercase tracking-wider text-muted-foreground">{title}</div>
      )}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
        {children}
      </div>
    </div>
  );
}

function Switch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-[28px] w-[46px] rounded-full transition-colors ${on ? "bg-success" : "bg-border"}`}
    >
      <span
        className={`absolute top-[2px] h-[24px] w-[24px] rounded-full bg-white shadow transition-all ${
          on ? "left-[20px]" : "left-[2px]"
        }`}
      />
    </button>
  );
}

export function SettingsTab() {
  const [reveal, setReveal] = useState(false);
  const [sandbox, setSandbox] = useState(true);
  const apiKey = "sk_live_8Z2k...9aQpLm";

  return (
    <div className="px-4 pb-4">
      {/* Profile card */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-4">
        <div className="absolute inset-0 bg-tf-grid opacity-50" />
        <div className="relative flex items-center gap-3">
          <BearLogo size={60} />
          <div className="flex-1">
            <div className="text-[16px] font-semibold">小熊首席量化员</div>
            <div className="text-[11.5px] text-muted-foreground">bear.quant · 开发者模式已启用</div>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-medium text-primary">
              <ShieldCheck size={11} strokeWidth={1.5} /> TestFlight Pro
            </div>
          </div>
        </div>
      </div>

      <Group title="API 设置">
        <Row icon={<KeyRound size={14} strokeWidth={1.5} />} label="模拟账户 API" value="已连接" />
        <div className="flex w-full items-center gap-3 px-3.5 py-3">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-primary">
            <KeyRound size={14} strokeWidth={1.5} />
          </div>
          <span className="flex-1 text-[14px] text-foreground">实盘 API Key</span>
          <span className="font-mono text-[12.5px] text-muted-foreground">
            {reveal ? apiKey : "••••••••••••"}
          </span>
          <button onClick={() => setReveal((v) => !v)} className="ios-press text-muted-foreground">
            {reveal ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
          </button>
        </div>
      </Group>

      <Group title="测试环境偏好">
        <Row
          label="模拟沙盒模式"
          right={<Switch on={sandbox} onChange={setSandbox} />}
        />
        <Row label="自动恢复策略" right={<Switch on={false} onChange={() => {}} />} />
        <Row label="行情数据源" value="Binance · Live" />
      </Group>

      <Group title="关于">
        <Row icon={<Trash2 size={14} strokeWidth={1.5} />} label="清理系统缓存" value="14.2 MB" />
        <Row icon={<Info size={14} strokeWidth={1.5} />} label="版本说明" value="v1.0.0-build.2026" />
      </Group>

      <div className="mt-6 text-center font-mono text-[10.5px] text-muted-foreground">
        BEAR QUANT · TESTFLIGHT EDITION
      </div>
    </div>
  );
}

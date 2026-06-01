import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(`${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-11 items-center justify-between px-6 pt-1 text-[15px] font-semibold text-foreground">
      <span className="tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <div className="flex items-end gap-[2px]">
          {[3, 5, 7, 9].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-foreground" style={{ height: h }} />
          ))}
        </div>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 10.5a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
          <path d="M3.5 6.5a6 6 0 019 0M1 4a9.5 9.5 0 0114 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        {/* battery */}
        <div className="ml-1 flex h-[12px] w-[24px] items-center rounded-[3px] border border-foreground/60 p-[1.5px]">
          <div className="h-full w-[78%] rounded-[1.5px] bg-foreground" />
        </div>
      </div>
    </div>
  );
}

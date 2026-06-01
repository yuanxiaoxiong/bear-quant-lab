type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, className = "" }: Props<T>) {
  const activeIdx = options.findIndex((o) => o.value === value);
  return (
    <div className={`relative inline-flex w-full rounded-[10px] bg-secondary p-[2px] ${className}`}>
      <div
        className="absolute top-[2px] bottom-[2px] rounded-[8px] bg-card shadow-sm transition-all duration-300"
        style={{
          width: `calc((100% - 4px) / ${options.length})`,
          left: `calc(2px + (100% - 4px) / ${options.length} * ${activeIdx})`,
        }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`relative z-10 flex-1 rounded-[8px] py-1.5 text-[13px] font-medium transition-colors ${
            o.value === value ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

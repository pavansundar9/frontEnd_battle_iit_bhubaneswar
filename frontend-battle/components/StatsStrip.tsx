import { ArrowTrendingUp, ArrowPath, ChartPie, Cog8Tooth } from "./icons";

const stats = [
  { value: "11ms", label: "Median agent latency", Icon: ArrowPath },
  { value: "9×", label: "Faster workflow shipping", Icon: ArrowTrendingUp },
  { value: "87%", label: "Reduction in manual errors", Icon: ChartPie },
  { value: "99.99%", label: "Uptime SLA on Enterprise", Icon: Cog8Tooth },
] as const;

export default function StatsStrip() {
  return (
    <section
      aria-label="Platform statistics"
      className="relative bg-nocturnal/40 border-b border-powder/6 py-20 lg:py-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(217,232,226,0.03) 0px, rgba(217,232,226,0.03) 1px, transparent 1px, transparent 80px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 fade-up fade-up-2">
        <p className="section-label text-center mb-10">// BY THE NUMBERS</p>

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-powder/10">
          {stats.map(({ value, label, Icon }) => (
            <div
              key={value}
              className="flex flex-col items-center text-center gap-3 bg-noir px-6 py-10"
            >
              <span className="text-forsythia">
                <Icon className="w-4 h-4" />
              </span>
              <dt className="font-mono font-bold text-4xl lg:text-5xl text-powder tracking-tight">
                {value}
              </dt>
              <dd className="font-sans text-xs text-powder/45 uppercase tracking-widest leading-snug max-w-[120px]">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
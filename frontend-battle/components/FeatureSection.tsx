"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Cog8Tooth, ArrowTrendingUp, ChartPie, LinkSolid, ChevronDown } from "./icons";

const features = [
  {
    id: 0,
    label: "// ORCHESTRATION",
    title: "Agent Orchestration",
    body: "Spin up multi-step AI agents that plan, execute, and self-correct across your entire stack. Define goals — FlowMind handles the rest.",
    icon: Cog8Tooth,
    accent: "text-forsythia",
    span: "lg:col-span-2",
    stat: "11ms",
    statLabel: "median agent latency",
  },
  {
    id: 1,
    label: "// WORKFLOWS",
    title: "Branching Workflows",
    body: "Build conditional logic, parallel branches, and human-in-the-loop checkpoints — visually or in code.",
    icon: ArrowTrendingUp,
    accent: "text-saffron",
    span: "lg:col-span-1",
    stat: "9×",
    statLabel: "faster iteration",
  },
  {
    id: 2,
    label: "// ANALYTICS",
    title: "Live Analytics",
    body: "Every agent run is traced, timed, and scored. Spot bottlenecks and cost anomalies before they compound.",
    icon: ChartPie,
    accent: "text-forsythia",
    span: "lg:col-span-1",
    stat: "87%",
    statLabel: "error reduction",
  },
  {
    id: 3,
    label: "// INTEGRATIONS",
    title: "120+ Integrations",
    body: "Connect to your existing tools instantly — Slack, Notion, Stripe, Postgres, REST APIs, and more. No glue code required.",
    icon: LinkSolid,
    accent: "text-saffron",
    span: "lg:col-span-2",
    stat: "120+",
    statLabel: "native connectors",
  },
] as const;

const BREAKPOINT = 1024;

function BentoCard({
  feature,
  isActive,
  onActivate,
}: {
  feature: (typeof features)[number];
  isActive: boolean;
  onActivate: (id: number) => void;
}) {
  const Icon = feature.icon;
  return (
    <article
      className={`
        relative flex flex-col justify-between p-8 rounded-3xl border focus:outline-none
        overflow-hidden min-h-[280px] group text-powder will-change-transform
        transition-shadow transition-transform duration-200 ease-out transform-gpu
        ${isActive
          ? "bg-noir border-powder/12 shadow-[0_28px_80px_rgba(0,0,0,0.7)]"
          : "bg-nocturnal/90 border-powder/10 hover:border-powder/18 hover:scale-[1.02] hover:shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        }
        ${feature.span}
      `}
      onMouseEnter={() => onActivate(feature.id)}
      onFocus={() => onActivate(feature.id)}
      tabIndex={0}
      aria-label={feature.title}
    >
      <div>
        <p className="section-label mb-4 text-powder/40">{feature.label}</p>
        <div className={`mb-3 ${feature.accent}`}>
          <Icon className="w-4 h-4 transition-colors duration-150 ease-out group-hover:text-saffron" />
        </div>
        <h3 className="font-sans font-semibold text-lg text-powder mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-powder/60 leading-relaxed max-w-sm">
          {feature.body}
        </p>
      </div>
      <div className="mt-8 flex items-end gap-2">
        <span className={`font-mono font-bold text-3xl ${feature.accent}`}>
          {feature.stat}
        </span>
        <span className="font-mono text-xs text-powder/40 mb-1">
          {feature.statLabel}
        </span>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-forsythia transition-opacity duration-200 ease-out ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
    </article>
  );
}

function AccordionItem({
  feature,
  isOpen,
  onToggle,
  isTransitioning,
}: {
  feature: (typeof features)[number];
  isOpen: boolean;
  onToggle: (id: number) => void;
  isTransitioning: boolean;
}) {
  const Icon = feature.icon;
  return (
    <div className="border-b border-powder/6 last:border-b-0">
      <button
        onClick={() => onToggle(feature.id)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-nocturnal/18 transition-colors duration-150 ease-out"
      >
        <div className="flex items-center gap-3">
          <span className={`${feature.accent} flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </span>
          <span className="font-sans font-semibold text-powder text-sm">
            {feature.title}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-powder/50 flex-shrink-0 transition-transform ease-in-out ${
            isTransitioning ? "duration-[350ms]" : "duration-300"
          } ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] ease-in-out ${
          isTransitioning ? "duration-[350ms]" : "duration-300"
        } ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <div className="px-5 pb-5 pt-1">
            <p className="text-sm text-powder/60 leading-relaxed mb-4">
              {feature.body}
            </p>
            <div className="flex items-end gap-2">
              <span className={`font-mono font-bold text-2xl ${feature.accent}`}>
                {feature.stat}
              </span>
              <span className="font-mono text-xs text-powder/40 mb-0.5">
                {feature.statLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [crossBreakpointTransition, setCrossBreakpointTransition] = useState(false);
  const isMobileRef = useRef(
    typeof window !== "undefined" && window.innerWidth < BREAKPOINT
  );
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    const nowMobile = window.innerWidth < BREAKPOINT;
    if (nowMobile !== isMobileRef.current) {
      isMobileRef.current = nowMobile;
      setCrossBreakpointTransition(true);
      setTimeout(() => setCrossBreakpointTransition(false), 400);
    }
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(handleResize, 80);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [handleResize]);

  return (
    <section
      id="features"
      aria-label="Features"
      className="relative py-28 lg:py-36 border-b border-powder/6 fade-up fade-up-1"
    >
      <div className="grid-overlay" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <p className="section-label mb-4">// FEATURES</p>
          <h2 className="font-sans font-semibold text-3xl lg:text-5xl text-powder max-w-xl leading-tight">
            Everything your agents need to run.
          </h2>
        </div>

        {/* Desktop bento (single light breakout) */}
        <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8 lg:bg-powder/6 lg:rounded-3xl lg:px-8 lg:py-8 lg:border lg:border-powder/6 lg:shadow-sm">
          {features.map((f) => (
            <BentoCard
              key={f.id}
              feature={f}
              isActive={activeIndex === f.id}
              onActivate={setActiveIndex}
            />
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="lg:hidden bg-nocturnal/40 border border-powder/6 rounded-xl overflow-hidden">
          {features.map((f) => (
            <AccordionItem
              key={f.id}
              feature={f}
              isOpen={activeIndex === f.id}
              onToggle={(id) => setActiveIndex((prev) => (prev === id ? -1 : id))}
              isTransitioning={crossBreakpointTransition}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
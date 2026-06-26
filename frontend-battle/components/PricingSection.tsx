"use client";

import { useMemo, useState } from "react";
import {
  type Tier,
  type Cycle,
  type Currency,
  tierMeta,
  computePrice,
  formatPrice,
} from "@/lib/pricing-config";

/* ── Constants ──────────────────────────────────────────── */
const TIERS: Tier[] = ["starter", "pro", "enterprise"];
const CURRENCIES: Currency[] = ["INR", "USD", "EUR"];
const currencyLabels: Record<Currency, string> = {
  INR: "₹ INR",
  USD: "$ USD",
  EUR: "€ EUR",
};

/* ── Checkmark icon (inline, no import needed) ──────────── */
function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 flex-shrink-0 text-forsythia"
      aria-hidden
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Pricing card ───────────────────────────────────────── */
function PricingCard({
  tier,
  price,
  cycle,
  highlighted,
}: {
  tier: Tier;
  price: string;
  cycle: Cycle;
  highlighted?: boolean;
}) {
  const meta = tierMeta[tier];
  const unit = cycle === "annual" ? "/yr" : "/mo";

  return (
    <article
      className={`
        relative flex flex-col rounded-xl border p-6 lg:p-8 transform-gpu will-change-transform
        transition-shadow transition-transform duration-200 ease-out
        ${
          highlighted
            ? "bg-nocturnal border-forsythia/60 shadow-[0_18px_60px_rgba(255,200,1,0.07)] hover:shadow-[0_24px_80px_rgba(255,200,1,0.09)] hover:scale-[1.01]"
            : "bg-nocturnal/40 border-powder/10 hover:shadow-[0_12px_40px_rgba(17,76,90,0.14)] hover:scale-[1.01]"
        }
      `}
    >
      {/* Popular badge */}
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="font-mono text-xs font-semibold bg-forsythia text-noir px-3 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier label */}
      <p className="section-label mb-1">{`// ${meta.label.toUpperCase()}`}</p>

      {/* Price node — react-driven pricing state */}
      <div className="mt-4 mb-1 flex items-baseline gap-2">
        <span
          className="font-mono font-bold text-4xl text-powder"
          aria-live="polite"
          aria-label={`${meta.label} plan price`}
        >
          {price}
        </span>
        <span className="font-mono text-xs text-powder/40">{unit}</span>
      </div>

      {/* Tagline */}
      <p className="text-sm text-powder/55 leading-snug mb-6">
        {meta.tagline}
      </p>

      {/* Divider */}
      <hr className="hairline mb-6" />

      {/* Feature list */}
      <ul className="flex flex-col gap-3 flex-1" role="list">
        {meta.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check />
            <span className="text-sm text-powder/70 leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={tier === "enterprise" ? "mailto:sales@flowmind.ai" : "#"}
        className={`
          mt-8 block text-center font-mono font-semibold text-sm py-3 rounded-md
          transition-colors duration-150 ease-out
          ${
            highlighted
              ? "bg-forsythia text-noir hover:bg-saffron"
              : "border border-powder/20 text-powder/80 hover:border-powder/40 hover:text-powder"
          }
        `}
      >
        {meta.cta}
      </a>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function PricingSection() {
  // Only these two drive the toggle UI — never touch the card tree
  const [cycle, setCycleState] = useState<Cycle>("monthly");
  const [currency, setCurrencyState] = useState<Currency>("INR");

  const prices = useMemo(() => {
    return TIERS.reduce((acc, tier) => {
      acc[tier] = formatPrice(computePrice(tier, cycle, currency), currency);
      return acc;
    }, {} as Record<Tier, string>);
  }, [cycle, currency]);

  const handleCycleToggle = (next: Cycle) => {
    setCycleState(next);
  };

  const handleCurrencyChange = (next: Currency) => {
    setCurrencyState(next);
  };

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="relative py-28 lg:py-36 border-b border-powder/6 fade-up fade-up-1"
    >
      <div className="grid-overlay" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <p className="section-label">// PRICING</p>
          <h2 className="font-sans font-semibold text-3xl lg:text-5xl text-powder max-w-xl leading-tight">
            Simple pricing. No surprises.
          </h2>
          <p className="text-powder/55 max-w-md leading-relaxed">
            Start free, scale as you grow. Every plan includes a 14-day trial
            with full feature access.
          </p>
        </div>

        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
          {/* Billing cycle toggle */}
          <div
            role="group"
            aria-label="Billing cycle"
            className="flex items-center bg-nocturnal/60 border border-powder/6 rounded-lg p-1 gap-1"
          >
            {(["monthly", "annual"] as Cycle[]).map((c) => (
              <button
                key={c}
                onClick={() => handleCycleToggle(c)}
                aria-pressed={cycle === c}
                aria-current={cycle === c ? "true" : undefined}
                className={`
                  font-mono text-xs px-4 py-2 rounded-md transition-colors duration-150 ease-out capitalize
                  ${
                    cycle === c
                      ? "bg-forsythia text-noir font-semibold"
                      : "text-powder/60 hover:text-powder"
                  }
                `}
              >
                {c}
                {c === "annual" && (
                  <span
                    className={`ml-1.5 text-[10px] font-semibold ${
                      cycle === "annual" ? "text-noir/70" : "text-forsythia"
                    }`}
                  >
                    −20%
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Currency selector */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
              aria-label="Select currency"
              className="font-mono text-xs appearance-none bg-nocturnal/60 border border-powder/6 rounded-lg px-4 py-2.5 pr-8 text-powder/80 hover:border-powder/20 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-1 focus:ring-forsythia/50"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c} className="bg-noir">
                  {currencyLabels[c]}
                </option>
              ))}
            </select>
            {/* Chevron */}
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-powder/40">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden>
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier}
              tier={tier}
              cycle={cycle}
              price={prices[tier]}
              highlighted={tierMeta[tier].highlighted}
            />
          ))}
        </div>

        {/* Fine print */}
        <p className="mt-8 text-center font-mono text-xs text-powder/30">
          All prices exclude applicable taxes. Annual plans billed as a single
          payment.
        </p>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { ArrowTrendingUp, ArrowPath, LinkSolid } from "./icons";

// Simulated social proof logos — text-based wordmarks, no image deps
const logoStrip = [
  "Vercel",
  "Linear",
  "Notion",
  "Stripe",
  "Supabase",
  "Resend",
];

const stats = [
  { icon: ArrowPath, text: "11ms median latency" },
  { icon: ArrowTrendingUp, text: "9x faster shipping" },
  { icon: LinkSolid, text: "120+ native integrations" },
];

export default function Hero() {
  return (
    <>
      {/* Hero */}
      <section
        aria-label="Hero"
        className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-16"
      >
        {/* Decorative grid overlay — thin hairlines, structural not ornamental */}
        <div className="grid-overlay" aria-hidden />

        {/* Radial glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(17,76,90,0.55) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-28 lg:py-32 w-full text-center">
          {/* Section label — JetBrains Mono, used only where precision matters */}
          <p className="section-label fade-up fade-up-1 mb-6 text-center">
            // AI Automation Platform
          </p>

          {/* Heading */}
          <h1 className="fade-up fade-up-2 font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto text-powder">
            Automate anything.{" "}
            <span className="text-forsythia">Ship faster.</span>
            <br />
            Scale without limits.
          </h1>

          {/* Subheading */}
          <p className="fade-up fade-up-3 mt-6 text-lg lg:text-xl text-powder/65 max-w-2xl mx-auto leading-relaxed">
            FlowMind orchestrates AI agents that handle your most repetitive,
            critical workflows — from data pipelines to customer automations —
            so your team ships what matters.
          </p>

          {/* CTA Buttons */}
          <div className="fade-up fade-up-4 mt-12 flex flex-wrap justify-center gap-5 items-center">
            <Link
              href="#pricing"
              className="font-sans font-semibold tracking-wide bg-forsythia text-noir px-8 py-4 rounded-full hover:bg-saffron transition-colors duration-150 ease-out text-sm"
            >
              Start building free
            </Link>

            <Link
              href="#features"
              className="font-sans font-semibold tracking-wide text-sm text-powder/70 border border-powder/20 px-8 py-4 rounded-full hover:border-powder/40 hover:text-powder transition-colors duration-150 ease-out inline-flex items-center gap-2"
            >
              See how it works
              <ArrowTrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-up fade-up-5 mt-14 flex flex-wrap justify-center gap-3">
            {stats.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 font-sans text-xs text-powder/60 bg-nocturnal/60 border border-powder/10 rounded-full px-3 py-1.5"
              >
                <Icon className="w-3.5 h-3.5 text-forsythia shrink-0" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom divider */}
        <hr className="hairline" />
      </section>

      {/* Social Proof */}
      <section
        aria-label="Used by teams at"
        className="relative bg-nocturnal/30 border-b border-powder/6"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <p className="section-label text-center mb-6 !text-powder/40">
            // Trusted by teams shipping with
          </p>

          <ul
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
            role="list"
          >
            {logoStrip.map((name) => (
              <li key={name}>
                <span className="font-mono font-semibold text-powder/30 hover:text-powder/55 transition-colors duration-150 ease-out text-sm tracking-widest uppercase">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="hairline" />
      </section>
    </>
  );
}
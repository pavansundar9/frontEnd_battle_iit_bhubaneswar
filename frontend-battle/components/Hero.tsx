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

export default function Hero() {
  return (
    <>
      {/* Hero */}
      <section
        aria-label="Hero"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      >
        {/* Decorative grid overlay */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          {/* Section label */}
          <p className="section-label fade-up fade-up-1 mb-6">
            // AI Automation Platform
          </p>

          {/* Heading */}
          <h1 className="fade-up fade-up-2 font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">
            Automate anything.{" "}
            <span className="text-forsythia">Ship faster.</span>
            <br />
            Scale without limits.
          </h1>

          {/* Subheading */}
          <p className="fade-up fade-up-3 mt-6 text-lg lg:text-xl text-powder/65 max-w-2xl leading-relaxed">
            FlowMind orchestrates AI agents that handle your most repetitive,
            critical workflows — from data pipelines to customer automations —
            so your team ships what matters.
          </p>

          {/* CTA Buttons */}
          <div className="fade-up fade-up-4 mt-10 flex flex-wrap gap-4 items-center">
            <Link
              href="#pricing"
              className="font-sans font-semibold bg-forsythia text-noir px-6 py-3 rounded-md hover:bg-saffron transition-colors duration-150 ease-out text-sm"
            >
              Start building free
            </Link>

            <Link
              href="#features"
              className="font-sans text-sm text-powder/70 border border-powder/20 px-6 py-3 rounded-md hover:border-powder/40 hover:text-powder transition-colors duration-150 ease-out flex items-center gap-2"
            >
              See how it works
              <ArrowTrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="fade-up fade-up-5 mt-14 flex flex-wrap gap-3">
            {[
              {
                icon: <ArrowPath className="w-3.5 h-3.5" />,
                text: "11ms median latency",
              },
              {
                icon: <ArrowTrendingUp className="w-3.5 h-3.5" />,
                text: "9x faster shipping",
              },
              {
                icon: <LinkSolid className="w-3.5 h-3.5" />,
                text: "120+ native integrations",
              },
            ].map((pill) => (
              <span
                key={pill.text}
                className="flex items-center gap-1.5 font-sans text-xs text-powder/60 bg-nocturnal/60 border border-powder/6 rounded-full px-3 py-1.5"
              >
                <span className="text-forsythia">{pill.icon}</span>
                {pill.text}
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
          <p className="section-label text-center mb-6 text-powder/40">
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
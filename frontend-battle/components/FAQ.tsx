"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "./icons";

const faqs = [
  {
    q: "How does the 14-day trial work?",
    a: "Every plan starts with a full 14-day trial — no credit card required. You get complete access to all features in your chosen tier. At the end of the trial, you'll be prompted to add a payment method to continue.",
  },
  {
    q: "Can I switch plans mid-cycle?",
    a: "Yes. Upgrading takes effect immediately and we prorate the difference. Downgrading takes effect at the start of your next billing cycle so you keep access to your current tier until then.",
  },
  {
    q: "What counts as a task execution?",
    a: "A task execution is a single atomic action performed by an agent — an API call, a database read/write, a transformation step, or a human-in-the-loop checkpoint. Multi-step workflows count each step individually.",
  },
  {
    q: "Is my data used to train your models?",
    a: "No. Your workflow data, agent inputs, and outputs are never used for model training. Enterprise plans additionally support fully isolated compute environments with no data egress.",
  },
  {
    q: "What does the 99.99% SLA actually mean?",
    a: "On the Enterprise plan we guarantee 99.99% monthly uptime — that's less than 5 minutes of downtime per month. Breaches are compensated via service credits applied to your next invoice automatically.",
  },
  {
    q: "Do you support on-premise or private cloud deployment?",
    a: "Enterprise plans support private cloud deployment on AWS, GCP, or Azure within your own VPC. Full on-premise is available on custom contracts — reach out to sales@flowmind.ai.",
  },
] as const;

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: (i: number) => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const triggerId = `faq-trigger-${index}`;

  return (
    <div className="border-b border-powder/10 last:border-b-0">
      <h3>
        <button
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="w-full flex items-center justify-between gap-4 px-0 py-5 text-left group"
        >
          <span className="font-mono text-sm lg:text-base font-medium text-powder group-hover:text-forsythia transition-colors duration-150 ease-out">
            {faq.q}
          </span>
          <ChevronDown
            className={`w-4 h-4 flex-shrink-0 text-powder/40 group-hover:text-powder/70 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </h3>

      {/* grid-template-rows accordion — same pattern as FeatureSection */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <p className="text-sm text-powder/60 leading-relaxed pb-5 max-w-2xl">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative py-24 lg:py-32 border-b border-powder/10"
    >
      <div className="grid-overlay" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="section-label mb-4">// FAQ</p>
            <h2 className="font-mono font-bold text-3xl lg:text-5xl text-powder leading-tight">
              Common questions,<br className="hidden lg:block" /> straight answers.
            </h2>
          </div>
          <p className="text-sm text-powder/45 max-w-xs lg:text-right leading-relaxed">
            Still have questions?{" "}
            <a
              href="mailto:hello@flowmind.ai"
              className="text-forsythia hover:text-saffron transition-colors duration-150 ease-out underline underline-offset-2"
            >
              Email us
            </a>{" "}
            and we'll get back within 24 hours.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
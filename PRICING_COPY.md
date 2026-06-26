# Pricing Copy — Ready to Paste Into Build Prompt

Use these exact tiers/copy so Claude Code doesn't improvise mid-build.
Base rates are in INR (monthly); annual = 20% off; USD/EUR derived via the
regionalTariff multipliers already defined in the build prompt.

---

## Tier 1 — Starter
**Tagline:** For solo builders shipping their first automation
**Base monthly rate (INR):** ₹999

Includes:
- Up to 3 active AI agents
- 1,000 task executions / month
- Pre-built workflow templates
- Email support (48h response)
- Community access

CTA label: "Start Building"

---

## Tier 2 — Pro  *(mark as "Most Popular")*
**Tagline:** For growing teams automating real workflows
**Base monthly rate (INR):** ₹2,999

Includes:
- Unlimited AI agents
- 50,000 task executions / month
- Custom logic & branching workflows
- Priority support (4h response)
- Full API access
- Advanced analytics dashboard

CTA label: "Go Pro"

---

## Tier 3 — Enterprise
**Tagline:** For organizations running mission-critical AI at scale
**Base monthly rate (INR):** ₹9,999

Includes:
- Unlimited agents & task executions
- Dedicated infrastructure & isolated compute
- 99.99% uptime SLA
- Custom agent development
- Dedicated account manager
- SSO & enterprise-grade security

CTA label: "Contact Sales"

---

## Config object (drop straight into pricing-config.ts)

```ts
type Tier = "starter" | "pro" | "enterprise";
type Cycle = "monthly" | "annual";
type Currency = "INR" | "USD" | "EUR";

export const tierMeta: Record<Tier, {
  label: string;
  tagline: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
}> = {
  starter: {
    label: "Starter",
    tagline: "For solo builders shipping their first automation",
    cta: "Start Building",
    features: [
      "Up to 3 active AI agents",
      "1,000 task executions / month",
      "Pre-built workflow templates",
      "Email support (48h response)",
      "Community access",
    ],
  },
  pro: {
    label: "Pro",
    tagline: "For growing teams automating real workflows",
    cta: "Go Pro",
    highlighted: true,
    features: [
      "Unlimited AI agents",
      "50,000 task executions / month",
      "Custom logic & branching workflows",
      "Priority support (4h response)",
      "Full API access",
      "Advanced analytics dashboard",
    ],
  },
  enterprise: {
    label: "Enterprise",
    tagline: "For organizations running mission-critical AI at scale",
    cta: "Contact Sales",
    features: [
      "Unlimited agents & task executions",
      "Dedicated infrastructure & isolated compute",
      "99.99% uptime SLA",
      "Custom agent development",
      "Dedicated account manager",
      "SSO & enterprise-grade security",
    ],
  },
};

export const baseMonthlyRate: Record<Tier, number> = {
  starter: 999,
  pro: 2999,
  enterprise: 9999,
};

export const regionalTariff: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
};

export const currencySymbol: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
};

export const annualDiscountMultiplier = 0.8; // flat 20% off

export function computePrice(tier: Tier, cycle: Cycle, currency: Currency): number {
  const base = baseMonthlyRate[tier] * regionalTariff[currency];
  const withCycle = cycle === "annual" ? base * annualDiscountMultiplier : base;
  return Math.round(withCycle);
}

export function formatPrice(amount: number, currency: Currency): string {
  return `${currencySymbol[currency]}${amount.toLocaleString()}`;
}
```
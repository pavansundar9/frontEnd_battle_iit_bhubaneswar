export type Tier = "starter" | "pro" | "enterprise";
export type Cycle = "monthly" | "annual";
export type Currency = "INR" | "USD" | "EUR";

export const tierMeta: Record<
  Tier,
  {
    label: string;
    tagline: string;
    cta: string;
    features: string[];
    highlighted?: boolean;
  }
> = {
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

export const annualDiscountMultiplier = 0.8;

export function computePrice(
  tier: Tier,
  cycle: Cycle,
  currency: Currency
): number {
  const base = baseMonthlyRate[tier] * regionalTariff[currency];
  const withCycle = cycle === "annual" ? base * annualDiscountMultiplier : base;
  return Math.round(withCycle);
}

export function formatPrice(amount: number, currency: Currency): string {
  return `${currencySymbol[currency]}${amount.toLocaleString()}`;
}
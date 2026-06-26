import { Cube, ArrowTrendingUp, ChartPie, Cog8Tooth, Link, LinkSolid } from "./icons";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "Status", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "SDK", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Open Source", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "DPA", href: "#" },
  ],
};

const socials = [
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-noir border-t border-powder/6 overflow-hidden">
      {/* Large wordmark treatment */}
      <div className="relative border-b border-powder/6 overflow-hidden">
        {/* Glow behind wordmark */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom, rgba(17,76,90,0.6) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 relative z-10">
          {/* Wordmark */}
          <div className="flex items-center gap-4 mb-3">
            <Cube className="w-6 h-6 text-forsythia" />
            <span className="font-sans font-semibold text-4xl sm:text-6xl lg:text-7xl text-powder/12 select-none tracking-tight">
              FlowMind
            </span>
          </div>
          <p className="font-sans text-sm text-powder/35 max-w-md leading-relaxed">
            AI automation infrastructure for teams that move fast and break
            nothing. Build, deploy, and scale agents without the ops overhead.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#pricing"
              className="font-mono text-sm bg-forsythia text-noir font-semibold px-5 py-2.5 rounded-md hover:bg-saffron transition-colors duration-150 ease-out"
            >
              Start for free
            </a>
            <a
              href="#"
              className="font-mono text-sm border border-powder/15 text-powder/60 px-5 py-2.5 rounded-md hover:border-powder/30 hover:text-powder/80 transition-colors duration-150 ease-out flex items-center gap-2"
            >
              <Link className="w-3.5 h-3.5" />
              Read the docs
            </a>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="section-label text-powder/30 mb-5">{`// ${group.toUpperCase()}`}</p>
              <ul className="flex flex-col gap-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-powder/50 hover:text-powder transition-colors duration-150 ease-out"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-powder/8 max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="font-mono text-xs text-powder/25">
          © {year} FlowMind, Inc. All rights reserved.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="p-2 text-powder/30 hover:text-powder/70 transition-colors duration-150 ease-out rounded-md hover:bg-powder/5"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Built with tag */}
        <p className="font-mono text-xs text-powder/20 flex items-center gap-1.5">
          <LinkSolid className="w-3 h-3" />
          Built with FlowMind
        </p>
      </div>
    </footer>
  );
}
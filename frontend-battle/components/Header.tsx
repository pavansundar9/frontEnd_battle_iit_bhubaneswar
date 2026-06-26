"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, XMark, Cube } from "./icons";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? "bg-noir/90 backdrop-blur-md border-b border-powder/10"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-forsythia font-bold text-lg tracking-tight"
          aria-label="FlowMind home"
        >
          <Cube />
          <span>FlowMind</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="font-mono text-sm text-powder/70 hover:text-powder transition-colors duration-150 ease-out tracking-wide"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            aria-label="Search"
            className="p-2 text-powder/60 hover:text-powder transition-colors duration-150 ease-out rounded-md hover:bg-powder/5"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link
            href="#"
            className="font-mono text-sm text-powder/70 hover:text-powder transition-colors duration-150 ease-out px-3 py-1.5"
          >
            Sign in
          </Link>

          <Link
            href="#pricing"
            className="font-mono text-sm bg-forsythia text-noir font-semibold px-4 py-2 rounded-md hover:bg-saffron transition-colors duration-150 ease-out"
          >
            Get started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="lg:hidden p-2 text-powder/80 hover:text-powder transition-colors duration-150 ease-out"
        >
          {menuOpen ? (
            <XMark className="w-5 h-5" />
          ) : (
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2 5h16M2 10h16M2 15h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`lg:hidden fixed inset-0 top-16 z-40 bg-noir/98 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="px-6 pt-8 pb-12 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-lg text-powder/80 hover:text-forsythia py-3 border-b border-powder/10 transition-colors duration-150 ease-out"
              style={{
                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="#"
              className="font-mono text-center text-powder/70 border border-powder/20 rounded-md py-3 hover:border-powder/40 transition-colors duration-150 ease-out"
            >
              Sign in
            </Link>

            <Link
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-center bg-forsythia text-noir font-semibold rounded-md py-3 hover:bg-saffron transition-colors duration-150 ease-out"
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
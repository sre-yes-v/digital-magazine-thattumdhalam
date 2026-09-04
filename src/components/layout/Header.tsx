"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="relative rounded-2xl border border-white/10 bg-[#20150A]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6">
          <div className="flex h-12 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3"
            >
              <Image
                src="/images/logo.jpeg"
                alt="തട്ടുംദളം  "
                width={48}
                height={48}
                className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
              />

              <div>
                <p className="text-lg font-bold leading-none text-[#F6F5F4]">
                  തട്ടുംദളം  
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#F6F5F4]/45">
                  Digital Magazine
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="#home"
                className="text-sm text-[#F6F5F4]/70 transition hover:text-[#EAEC02]"
              >
                Home
              </Link>

              <Link
                href="#about"
                className="text-sm text-[#F6F5F4]/70 transition hover:text-[#EAEC02]"
              >
                About
              </Link>

              <Link
                href="#preview"
                className="text-sm text-[#F6F5F4]/70 transition hover:text-[#EAEC02]"
              >
                Magazine Preview
              </Link>

              <Link
                href="#editorial"
                className="text-sm text-[#F6F5F4]/70 transition hover:text-[#EAEC02]"
              >
                Editorial
              </Link>

              <Link
                href="#publisher"
                className="text-sm text-[#F6F5F4]/70 transition hover:text-[#EAEC02]"
              >
                Publisher
              </Link>

              <Link
                href="/magazine/latest"
                className="rounded-full bg-[#EAEC02] px-5 py-2.5 text-sm font-bold text-[#20150A] transition duration-300 hover:scale-105"
              >
                Read ₹100
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#F6F5F4] transition hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`overflow-hidden transition-all duration-300 md:hidden ${
              menuOpen
                ? "max-h-[400px] pt-4 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-white/10 pt-3">
              <div className="flex flex-col gap-1">

                <Link
                  href="#home"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm text-[#F6F5F4]/75 transition hover:bg-white/5 hover:text-[#EAEC02]"
                >
                  Home
                </Link>

                <Link
                  href="#about"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm text-[#F6F5F4]/75 transition hover:bg-white/5 hover:text-[#EAEC02]"
                >
                  About
                </Link>

                <Link
                  href="#editorial"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm text-[#F6F5F4]/75 transition hover:bg-white/5 hover:text-[#EAEC02]"
                >
                  Editorial
                </Link>

                <Link
                  href="#publisher"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm text-[#F6F5F4]/75 transition hover:bg-white/5 hover:text-[#EAEC02]"
                >
                  Publisher
                </Link>

                <Link
                  href="/magazine/latest"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-[#EAEC02] px-4 py-3 text-center text-sm font-black text-[#20150A]"
                >
                  Read Magazine · ₹100
                </Link>

              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
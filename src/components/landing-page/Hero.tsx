"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#661B0B] text-[#F6F5F4]"
    >
      {/* Background grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-20" />

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[450px] w-[450px] rounded-full bg-[#D11001] opacity-50 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-[-100px] h-[500px] w-[500px] rounded-full bg-[#EAEC02] opacity-[0.08] blur-[150px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-24 pt-32 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-10">

          {/* =========================================================
              LEFT SIDE
          ========================================================= */}
          <div className="relative z-10 max-w-2xl">

            {/* Small badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#20150A]/20 px-4 py-2 backdrop-blur-md">
              <Sparkles
                size={14}
                className="text-[#EAEC02]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
                പുതിയ ലക്കം
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-[3.2rem] font-black leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              കഥകളും
              <br />

              കാഴ്ചകളും
              <br />

              <span className="text-[#EAEC02]">
                കാലത്തിന്റെ
              </span>

              <br />

              താളുകളിൽ.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 lg:text-lg">
              വായനയുടെ പഴയ രസം ഡിജിറ്റൽ ലോകത്തിന്റെ
              പുതിയ അനുഭവവുമായി ചേർത്ത് ഒരുക്കിയ
              തട്ടുംദളം   ഡിജിറ്റൽ മാഗസിൻ.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">

              <Link
                href="/magazine/latest"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#EAEC02] px-5 py-3.5 text-sm font-black text-[#20150A] shadow-xl transition duration-300 hover:scale-[1.03] sm:px-6"
              >
                <BookOpen size={17} />

                വായിക്കാം · ₹49

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href="#about"
                className="rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 sm:px-6"
              >
                കൂടുതൽ അറിയാം
              </a>

            </div>

            {/* Small info */}
            <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6 sm:gap-8">

              <div>
                <p className="text-xl font-black sm:text-2xl">
                  ₹49
                </p>

                <p className="mt-1 text-[10px] text-white/40 sm:text-xs">
                  ഒരു ലക്കത്തിന്
                </p>
              </div>

              <div className="h-8 w-px bg-white/10" />

              <div>
                <p className="text-xl font-black sm:text-2xl">
                  Digital
                </p>

                <p className="mt-1 text-[10px] text-white/40 sm:text-xs">
                  Edition
                </p>
              </div>

            </div>
          </div>


          <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">

            {/* Decorative cards behind magazine */}
            <div className="absolute right-[-10px] top-10 h-[85%] w-[82%] rotate-[7deg] rounded-[28px] bg-[#D11001]/40" />

            <div className="absolute bottom-4 left-[-10px] h-[82%] w-[82%] -rotate-[6deg] rounded-[28px] bg-[#20150A]/60" />

            {/* Main magazine frame */}
            <div className="relative z-10">

              {/* Price / CTA ABOVE cover */}
              <div className="relative z-20 mb-[-25px] flex justify-center">

                <Link
                  href="/magazine/latest"
                  className="group flex items-center gap-3 rounded-full bg-[#EAEC02] px-6 py-3.5 text-sm font-black text-[#20150A] shadow-[0_15px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                >
                  <BookOpen size={17} />

                  Read for just ₹49

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

              </div>

             {/* Magazine Cover */}
<div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#20150A] p-3 shadow-2xl sm:p-4">

  <div className="relative overflow-hidden rounded-[20px]">

    <Image
      src="/magazine/cover.jpeg"
      alt="തട്ടുംതളം ഡിജിറ്റൽ മാഗസിൻ"
      width={900}
      height={1200}
      priority
      className="
        aspect-[3/4]
        w-full
        object-cover
        scale-[1.03]
        blur-[5px]
      "
    />

    {/* Very subtle blur/dark effect */}
    <div className="absolute inset-0 bg-[#20150A]/10" />

    {/* Center information */}
    <div className="absolute inset-0 flex items-center justify-center">

      <div className="rounded-2xl border border-white/20 bg-[#20150A]/65 px-6 py-5 text-center shadow-2xl backdrop-blur-md">

        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EAEC02]">
          Latest Issue
        </p>

        <p className="mt-2 text-xl font-black text-white sm:text-2xl">
          തട്ടുംതളം
        </p>

        <p className="mt-1 text-xs text-white/60">
          Digital Magazine
        </p>

      </div>

    </div>

  </div>

</div>
              {/* Bottom label */}
              <div className="mt-4 flex items-center justify-between px-2">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Latest Issue
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white/60">
                    തട്ടുംദളം   · 2026
                  </p>
                </div>

                <p className="text-[10px] text-white/30">
                  Premium Digital Edition
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 h-12 w-full overflow-hidden sm:h-16">
        <div className="absolute -bottom-[90%] left-[-10%] h-[180%] w-[120%] rounded-[50%] bg-[#F6F5F4]" />
      </div>
    </section>
  );
}
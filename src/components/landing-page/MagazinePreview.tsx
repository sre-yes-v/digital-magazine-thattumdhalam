"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const pages = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  image: `/images/${String(index + 1).padStart(1, "0")}.jpeg`,
}));

export default function MagazinePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const scrollAmount = 300;

  const scrollNext = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(
        container.scrollLeft / scrollAmount
      );

      setActiveIndex(
        Math.min(Math.max(index, 0), pages.length - 1)
      );
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="preview" className=" relative overflow-hidden bg-[#20150A] py-24">
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#661B0B]/30 blur-[140px]" />

        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#D11001]/10 blur-[120px]" />

        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] rounded-full bg-[#EAEC02]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#EAEC02]">
            Latest Issue
          </p>

          <h2 className="text-3xl font-bold text-[#F6F5F4] sm:text-4xl md:text-5xl">
            താളുകളിലൂടെ ഒരു കാഴ്ച
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#F6F5F4]/60 sm:text-base">
            വാക്കുകളും വർണങ്ങളും ചിന്തകളും ഒത്തുചേരുന്ന ഈ ലക്കത്തിലെ തിരഞ്ഞെടുത്ത താളുകളിലേക്ക് ഒരു എത്തിനോട്ടം.
          </p>

        </div>

        {/* Carousel wrapper */}
        <div className="relative">

          {/* Left button */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous pages"
            className="
              absolute
              left-0
              top-1/2
              z-20
              flex
              h-11
              w-11
              -translate-x-2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#F6F5F4]/20
              bg-[#20150A]/90
              text-[#F6F5F4]
              shadow-xl
              backdrop-blur-md
              transition
              hover:border-[#EAEC02]
              hover:bg-[#661B0B]
              hover:text-[#EAEC02]
              sm:-translate-x-5
            "
          >
            <ChevronLeft size={22} />
          </button>

          {/* Images */}
          <div
            ref={scrollRef}
            className="
              magazine-preview-scroll
              flex
              gap-5
              overflow-x-auto
              scroll-smooth
              px-8
              pb-6
              pt-3
              sm:gap-6
              sm:px-12
            "
          >

            {pages.map((page, index) => (
              <div
                key={page.id}
                className="
                  group
                  relative
                  w-[220px]
                  shrink-0
                  sm:w-[250px]
                  md:w-[270px]
                "
              >

                {/* Page */}
                <div
                  className="
                    relative
                    aspect-[3/4]
                    overflow-hidden
                    rounded-sm
                    bg-[#F6F5F4]
                    shadow-[0_20px_50px_rgba(0,0,0,0.4)]
                    transition-all
                    duration-500
                    group-hover:-translate-y-3
                    group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)]
                  "
                >

                  <Image
                    src={page.image}
                    alt={`Magazine page ${page.id}`}
                    fill
                    loading="lazy"
                    sizes="
                      (max-width: 640px) 220px,
                      (max-width: 1024px) 250px,
                      270px
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-[1.03]
                    "
                    
                  />

                  {/* Hover overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/60
                      via-transparent
                      to-transparent
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Page number */}
                  <div
                    className="
                      absolute
                      bottom-4
                      left-4
                      rounded-full
                      bg-[#20150A]/80
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-[#F6F5F4]
                      opacity-0
                      backdrop-blur-sm
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    Page {String(page.id).padStart(2, "0")}
                  </div>

                </div>

                {/* Number below */}
                <p className="mt-3 text-center text-xs font-medium tracking-widest text-[#F6F5F4]/40">
                  {String(page.id).padStart(2, "0")}
                </p>

              </div>
            ))}

          </div>

          {/* Right button */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next pages"
            className="
              absolute
              right-0
              top-1/2
              z-20
              flex
              h-11
              w-11
              translate-x-2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#F6F5F4]/20
              bg-[#20150A]/90
              text-[#F6F5F4]
              shadow-xl
              backdrop-blur-md
              transition
              hover:border-[#EAEC02]
              hover:bg-[#661B0B]
              hover:text-[#EAEC02]
              sm:translate-x-5
            "
          >
            <ChevronRight size={22} />
          </button>

        </div>

        {/* Progress indicators */}
        <div className="mt-8 flex justify-center gap-2">

          {Array.from({
            length: Math.min(8, pages.length),
          }).map((_, index) => (
            <span
              key={index}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300
                ${
                  Math.floor(activeIndex / 4) === index
                    ? "w-8 bg-[#EAEC02]"
                    : "w-1.5 bg-[#F6F5F4]/20"
                }
              `}
            />
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">

          <p className="mb-5 text-sm text-[#F6F5F4]/50">
            See the complete issue and discover every story.
          </p>

          <Link
            href="/magazine/latest"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#EAEC02]
              px-7
              py-3.5
              text-sm
              font-bold
              text-[#20150A]
              transition
              hover:-translate-y-0.5
              hover:bg-[#F6F5F4]
              hover:shadow-lg
            "
          >
            Read the Full Magazine
            <ChevronRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}
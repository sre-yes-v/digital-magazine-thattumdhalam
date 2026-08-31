"use client";

import HTMLFlipBook from "react-pageflip";
import {
  ArrowLeft,
  Images,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { magazine } from "@/app/magazine/data/magazine";

import MagazineLoader from "./MagazineLoader";
import MagazinePage from "./MagazinePage";
import MagazineToolbar from "./MagazineToolbar";
import MagazineThumbnails from "./MagazineThumbnails";

type FlipBookRef = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
  };
};

export default function MagazineReader() {
  const bookRef = useRef<FlipBookRef | null>(null);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  const [soundEnabled, setSoundEnabled] = useState(true);

  const [showThumbnails, setShowThumbnails] = useState(false);

  const [zoom, setZoom] = useState(1);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const soundRef = useRef<HTMLAudioElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  checkMobile();

  window.addEventListener("resize", checkMobile);

  return () => {
    window.removeEventListener("resize", checkMobile);
  };
}, []);


  useEffect(() => {
    const preload = async () => {
      const firstPages = magazine.pages.slice(0, 3);

      await Promise.all(
        firstPages.map(
          (src) =>
            new Promise<void>((resolve) => {
              const image = new Image();

              image.src = src;

              image.onload = () => resolve();

              image.onerror = () => resolve();
            })
        )
      );

      setTimeout(() => {
        setLoading(false);
      }, 600);
    };

    preload();
  }, []);

  /*
   * Create page flip sound.
   */
  useEffect(() => {
    soundRef.current = new Audio("/sounds/page-flip.mp3");

    soundRef.current.volume = 0.35;

    return () => {
      soundRef.current?.pause();
      soundRef.current = null;
    };
  }, []);

  /*
   * Play flip sound.
   */
  const playFlipSound = () => {
    if (!soundEnabled) return;

    const audio = soundRef.current;

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {
      // Browser blocked playback.
      // User can enable it after interacting with reader.
    });
  };

  /*
   * Preload pages around current page.
   */
  useEffect(() => {
    if (loading) return;

    const nearbyPages = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
      currentPage + 3,
    ];

    nearbyPages.forEach((index) => {
      if (index < 0 || index >= magazine.pages.length) {
        return;
      }

      const image = new Image();

      image.src = magazine.pages[index];
    });
  }, [currentPage, loading]);

  /*
   * Flip next.
   */
  const nextPage = () => {
    playFlipSound();

    bookRef.current?.pageFlip().flipNext();
  };

  /*
   * Flip previous.
   */
  const previousPage = () => {
    playFlipSound();

    bookRef.current?.pageFlip().flipPrev();
  };

  /*
   * Called by react-pageflip.
   */
  const handleFlip = (event: {
    data: number;
  }) => {
    setCurrentPage(event.data);

    playFlipSound();
  };

  /*
   * Zoom
   */
  const zoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 1.5));
  };

  const zoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 0.8));
  };

  /*
   * Reader fullscreen
   */
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();

        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  /*
   * Escape / keyboard navigation
   */
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        previousPage();
      }

      if (event.key === "Escape" && !document.fullscreenElement) {
        window.history.back();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  });

  if (loading) {
    return <MagazineLoader />;
  }

  return (
    <div className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#20150A]">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="relative z-[100] flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#20150A]/95 px-4 backdrop-blur-xl sm:h-16 sm:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => window.history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">
              {magazine.title}
            </p>

            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
              {magazine.subtitle}
            </p>
          </div>

        </div>


        {/* Center */}
        <div className="absolute left-1/2 -translate-x-1/2">

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">

            <span className="text-[#EAEC02]">
              {currentPage + 1}
            </span>

            <span className="mx-1.5 text-white/20">
              /
            </span>

            {magazine.pages.length}

          </div>

        </div>


        {/* Right */}
        <button
          onClick={() => setShowThumbnails(true)}
          className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <Images size={15} />

          <span className="hidden sm:block">
            Pages
          </span>
        </button>

      </header>


      {/* =====================================================
          BOOK AREA
      ===================================================== */}

      <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#661B0B]/20 blur-[100px]" />


        {/* Book */}
        <div
          className="relative z-10 flex items-center justify-center transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
          }}
        >

          <HTMLFlipBook
  ref={bookRef}
  width={isMobile ? 340 : 500}
  height={isMobile ? 500 : 680}

  size="stretch"

  minWidth={280}
  maxWidth={600}

  minHeight={400}
  maxHeight={800}

  showCover={true}

  usePortrait={isMobile}

  startPage={0}

  drawShadow={true}
  maxShadowOpacity={0.65}

  flippingTime={650}

  mobileScrollSupport={true}
  swipeDistance={30}

  useMouseEvents={true}
  showPageCorners={true}
  clickEventForward={true}
  disableFlipByClick={false}

  autoSize={true}

  className="magazine-flipbook"

  style={{}}

  startZIndex={0}

  onFlip={handleFlip}
>

            {magazine.pages.map((page, index) => (
              <MagazinePage
                key={page}
                src={page}
                pageNumber={index + 1}
              />
            ))}

          </HTMLFlipBook>

        </div>


        {/* Left navigation */}
        <button
          onClick={previousPage}
          disabled={currentPage <= 0}
          className="
            absolute
            left-3
            top-1/2
            z-50
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#20150A]/80
            text-white/60
            backdrop-blur-md
            transition
            hover:bg-[#661B0B]
            hover:text-white
            disabled:pointer-events-none
            disabled:opacity-20
            sm:left-6
            sm:h-12
            sm:w-12
          "
        >
          <ArrowLeft size={19} />
        </button>


        {/* Right navigation */}
        <button
          onClick={nextPage}
          disabled={currentPage >= magazine.pages.length - 1}
          className="
            absolute
            right-3
            top-1/2
            z-50
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#20150A]/80
            text-white/60
            backdrop-blur-md
            transition
            hover:bg-[#661B0B]
            hover:text-white
            disabled:pointer-events-none
            disabled:opacity-20
            sm:right-6
            sm:h-12
            sm:w-12
          "
        >
          <ArrowLeft
            size={19}
            className="rotate-180"
          />
        </button>

      </main>


      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <MagazineToolbar
        currentPage={currentPage}
        totalPages={magazine.pages.length}
        zoom={zoom}
        soundEnabled={soundEnabled}
        onPrevious={previousPage}
        onNext={nextPage}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onSoundToggle={() =>
          setSoundEnabled((value) => !value)
        }
        onFullscreen={toggleFullscreen}
      />


      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      {showThumbnails && (
        <MagazineThumbnails
          pages={magazine.pages}
          currentPage={currentPage}
          onSelect={(page) => {
            bookRef.current
              ?.pageFlip()
              .turnToPage(page);

            setCurrentPage(page);

            setShowThumbnails(false);
          }}
          onClose={() => setShowThumbnails(false)}
        />
      )}

    </div>
  );
}
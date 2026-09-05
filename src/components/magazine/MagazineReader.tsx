"use client";

import HTMLFlipBook from "react-pageflip";
import { ArrowLeft, Images } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

const WINDOW_AHEAD = 5; // pages to prefetch ahead of current
const WINDOW_BEHIND = 2; // pages to keep behind current

export default function MagazineReader() {
  const bookRef = useRef<FlipBookRef | null>(null);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [magazineMeta, setMagazineMeta] = useState<{
    title: string;
    subtitle: string;
    totalPages: number;
  }>({ title: "Magazine", subtitle: "Edition", totalPages: 0 });

  // page number (1-indexed) -> resolved signed URL, or null if not yet fetched
  const [pageUrlMap, setPageUrlMap] = useState<Record<number, string>>({});
  const fetchingRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch metadata only on mount — no page URLs yet
  useEffect(() => {
    async function initMeta() {
      try {
        setLoading(true);
        const res = await fetch("/api/magazine/issue?id=current");
        if (!res.ok) throw new Error("Failed to load magazine info");
        const data = await res.json();
        setMagazineMeta({
          title: data.title || "തട്ടുംദളം മാഗസിൻ",
          subtitle: data.subtitle || "Digital Edition",
          totalPages: data.totalPages || 310,
        });
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    initMeta();
  }, []);

  // Fetch a batch of page URLs for pages not yet resolved/in-flight
  const fetchPages = useCallback(
    async (pageNumbers: number[]) => {
      const toFetch = pageNumbers.filter(
        (p) =>
          p >= 1 &&
          p <= magazineMeta.totalPages &&
          !pageUrlMap[p] &&
          !fetchingRef.current.has(p)
      );
      if (toFetch.length === 0) return;

      toFetch.forEach((p) => fetchingRef.current.add(p));

      try {
        const res = await fetch(
          `/api/magazine/page?issue=current&pages=${toFetch.join(",")}`
        );
        if (!res.ok) throw new Error("Failed to fetch page batch");
        const data: { pages: { page: number; url: string }[] } = await res.json();

        setPageUrlMap((prev) => {
          const next = { ...prev };
          data.pages.forEach(({ page, url }) => {
            next[page] = url;
          });
          return next;
        });
      } catch (err) {
        console.error("Batch page fetch error:", err);
      } finally {
        toFetch.forEach((p) => fetchingRef.current.delete(p));
      }
    },
    [magazineMeta.totalPages, pageUrlMap]
  );

  // Initial window once we know totalPages
  useEffect(() => {
    if (magazineMeta.totalPages > 0) {
      const initial = Array.from(
        { length: WINDOW_AHEAD + 1 },
        (_, i) => i + 1
      );
      fetchPages(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magazineMeta.totalPages]);

  // Expand window as the reader flips
  useEffect(() => {
    if (magazineMeta.totalPages === 0) return;
    const current1Indexed = currentPage + 1;
    const start = Math.max(1, current1Indexed - WINDOW_BEHIND);
    const end = Math.min(magazineMeta.totalPages, current1Indexed + WINDOW_AHEAD);
    const window = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    fetchPages(window);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, magazineMeta.totalPages]);

  const soundRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    soundRef.current = new Audio("/sounds/page-flip.mp3");
    soundRef.current.volume = 0.35;
    return () => {
      soundRef.current?.pause();
      soundRef.current = null;
    };
  }, []);

  const playFlipSound = () => {
    if (!soundEnabled) return;
    const audio = soundRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const nextPage = () => {
    playFlipSound();
    bookRef.current?.pageFlip().flipNext();
  };

  const previousPage = () => {
    playFlipSound();
    bookRef.current?.pageFlip().flipPrev();
  };

  const handleFlip = (event: { data: number }) => {
    setCurrentPage(event.data);
    playFlipSound();
  };

  const zoomIn = () => setZoom((v) => Math.min(v + 0.1, 1.6));
  const zoomOut = () => setZoom((v) => Math.max(v - 0.1, 0.8));

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

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextPage();
      if (event.key === "ArrowLeft") previousPage();
      if (event.key === "Escape" && !document.fullscreenElement) {
        window.history.back();
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  });

  if (loading || magazineMeta.totalPages === 0) {
    return <MagazineLoader />;
  }

  const totalPages = magazineMeta.totalPages;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[90] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#20150A]">
      <header className="relative z-[100] flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#20150A]/95 px-4 backdrop-blur-xl sm:h-16 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={17} />
          </button>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">{magazineMeta.title}</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">{magazineMeta.subtitle}</p>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
            <span className="text-[#EAEC02]">{currentPage + 1}</span>
            <span className="mx-1.5 text-white/20">/</span>
            {totalPages}
          </div>
        </div>

        <button
          onClick={() => setShowThumbnails(true)}
          className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <Images size={15} />
          <span className="hidden sm:block">Pages</span>
        </button>
      </header>

      <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#661B0B]/20 blur-[100px]" />

        <div
          className="relative z-10 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
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
            {pageNumbers.map((pageNum) => (
              <MagazinePage
                key={pageNum}
                src={pageUrlMap[pageNum] ?? ""}
                pageNumber={pageNum}
              />
            ))}
          </HTMLFlipBook>
        </div>

        <button
          onClick={previousPage}
          disabled={currentPage <= 0}
          className="absolute left-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#20150A]/80 text-white/60 backdrop-blur-md transition hover:bg-[#661B0B] hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:left-6 sm:h-12 sm:w-12"
        >
          <ArrowLeft size={19} />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className="absolute right-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#20150A]/80 text-white/60 backdrop-blur-md transition hover:bg-[#661B0B] hover:text-white disabled:pointer-events-none disabled:opacity-20 sm:right-6 sm:h-12 sm:w-12"
        >
          <ArrowLeft size={19} className="rotate-180" />
        </button>
      </main>

      <MagazineToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        zoom={zoom}
        soundEnabled={soundEnabled}
        onPrevious={previousPage}
        onNext={nextPage}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onSoundToggle={() => setSoundEnabled((v) => !v)}
        onFullscreen={toggleFullscreen}
      />

      {showThumbnails && (
        <MagazineThumbnails
          pages={pageNumbers.map((p) => pageUrlMap[p] ?? "")}
          currentPage={currentPage}
          onSelect={(page) => {
            bookRef.current?.pageFlip().turnToPage(page);
            setCurrentPage(page);
            setShowThumbnails(false);
          }}
          onClose={() => setShowThumbnails(false)}
        />
      )}
    </div>
  );
}
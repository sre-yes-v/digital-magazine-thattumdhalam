"use client";

import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minus,
  Plus,
  Volume2,
  VolumeX,
} from "lucide-react";

interface MagazineToolbarProps {
  currentPage: number;
  totalPages: number;
  zoom: number;
  soundEnabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSoundToggle: () => void;
  onFullscreen: () => void;
}

export default function MagazineToolbar({
  currentPage,
  totalPages,
  zoom,
  soundEnabled,
  onPrevious,
  onNext,
  onZoomIn,
  onZoomOut,
  onSoundToggle,
  onFullscreen,
}: MagazineToolbarProps) {
  return (
    <div className="fixed bottom-5 left-1/2 z-[200] -translate-x-1/2">

      <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#20150A]/95 p-1.5 shadow-2xl backdrop-blur-xl">

        {/* Previous */}
        <button
          onClick={onPrevious}
          disabled={currentPage <= 0}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
          aria-label="Previous page"
        >
          <ChevronLeft size={17} />
        </button>

        {/* Page number */}
        <div className="flex h-9 min-w-[78px] items-center justify-center px-2 text-xs text-white/70">
          <span className="text-[#EAEC02]">
            {currentPage + 1}
          </span>

          <span className="mx-1.5 text-white/20">
            /
          </span>

          <span>
            {totalPages}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-20"
          aria-label="Next page"
        >
          <ChevronRight size={17} />
        </button>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Zoom out */}
        <button
          onClick={onZoomOut}
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white sm:flex"
          aria-label="Zoom out"
        >
          <Minus size={15} />
        </button>

        {/* Zoom */}
        <span className="hidden min-w-[50px] text-center text-[10px] text-white/40 sm:block">
          {Math.round(zoom * 100)}%
        </span>

        {/* Zoom in */}
        <button
          onClick={onZoomIn}
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white sm:flex"
          aria-label="Zoom in"
        >
          <Plus size={15} />
        </button>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Sound */}
        <button
          onClick={onSoundToggle}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
            soundEnabled
              ? "text-[#EAEC02]"
              : "text-white/40"
          } hover:bg-white/10`}
          aria-label="Toggle page sound"
        >
          {soundEnabled ? (
            <Volume2 size={16} />
          ) : (
            <VolumeX size={16} />
          )}
        </button>

        {/* Reader fullscreen */}
        <button
          onClick={onFullscreen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
          aria-label="Fullscreen reader"
        >
          <Maximize size={15} />
        </button>

      </div>

    </div>
  );
}
"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface MagazineThumbnailsProps {
  pages: string[];
  currentPage: number;
  onSelect: (page: number) => void;
  onClose: () => void;
}

export default function MagazineThumbnails({
  pages,
  currentPage,
  onSelect,
  onClose,
}: MagazineThumbnailsProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-[300] w-[280px] border-r border-white/10 bg-[#20150A]/98 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">

        <div>
          <p className="text-xs font-semibold text-white">
            Pages
          </p>

          <p className="text-[9px] text-white/30">
            {pages.length} pages
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

      </div>

      {/* Pages */}
      <div className="h-[calc(100%-56px)] overflow-y-auto p-4">

        <div className="grid grid-cols-2 gap-3">

          {pages.map((src, index) => (
            <button
              key={src}
              onClick={() => onSelect(index)}
              className={`group overflow-hidden rounded-md border transition ${
                currentPage === index
                  ? "border-[#EAEC02]"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="relative aspect-[3/4] bg-[#F6F5F4]">

                <Image
                  src={src}
                  alt={`Page ${index + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />

              </div>

              <div className="bg-[#20150A] py-1 text-[9px] text-white/40">
                {index + 1}
              </div>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}
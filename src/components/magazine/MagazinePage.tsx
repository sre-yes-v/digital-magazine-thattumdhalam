// src/components/magazine/MagazinePage.tsx
"use client";

import { forwardRef } from "react";

interface MagazinePageProps {
  src: string;
  pageNumber: number;
}

const MagazinePage = forwardRef<HTMLDivElement, MagazinePageProps>(
  ({ src, pageNumber }, ref) => {
    return (
      <div
        ref={ref}
        className="relative h-full w-full overflow-hidden bg-[#F6F5F4]"
      >
        {src ? (
          <img
            src={src}
            alt={`Magazine page ${pageNumber}`}
            className="absolute inset-0 h-full w-full select-none object-cover"
            draggable={false}
            onLoad={() => {
              console.log(`✅ Magazine page ${pageNumber} loaded`);
            }}
            onError={(e) => {
              console.error(`❌ Magazine page ${pageNumber} failed`, src, e);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F6F5F4]">
            <div className="h-6 w-6 animate-pulse rounded-full bg-black/10" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-y-0 right-0 w-[1px] bg-black/10" />

        <div className="pointer-events-none absolute bottom-2 left-0 right-0 text-center">
          <span className="text-[8px] text-black/20">{pageNumber}</span>
        </div>
      </div>
    );
  }
);

MagazinePage.displayName = "MagazinePage";

export default MagazinePage;
"use client";

import Image from "next/image";
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
        <Image
          src={src}
          alt={`Magazine page ${pageNumber}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="select-none object-cover"
          draggable={false}
          priority={pageNumber <= 2}
        />

        {/* Very subtle page edge */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[1px] bg-black/10" />

        {/* Page number */}
        <div className="pointer-events-none absolute bottom-2 left-0 right-0 text-center">
          <span className="text-[8px] text-black/20">
            {pageNumber}
          </span>
        </div>
      </div>
    );
  }
);

MagazinePage.displayName = "MagazinePage";

export default MagazinePage;
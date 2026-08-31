"use client";

import Image from "next/image";

export default function MagazineLoader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#20150A]">
      <div className="flex flex-col items-center">

        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <Image
            src="/images/logo.jpeg"
            alt="തട്ടുംദളം"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="mt-8 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#EAEC02]" />

        <p className="mt-5 text-sm text-white/60">
          മാഗസിൻ തയ്യാറാക്കുന്നു...
        </p>

        <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/25">
          Digital Edition
        </p>

      </div>
    </div>
  );
}
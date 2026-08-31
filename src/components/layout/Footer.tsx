import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#20150A] text-[#F6F5F4]">

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">

        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr_1fr]">

          {/* Brand */}
          <div>

            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/images/logo.jpeg"
                alt="തട്ടുംദളം  "
                width={55}
                height={55}
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <p className="text-xl font-black">
                  തട്ടുംദളം  
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">
                  Digital Magazine
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              കഥകളും കാഴ്ചകളും ആശയങ്ങളും
              വായനക്കാരിലേക്ക് എത്തിക്കുന്ന
              ഒരു പുതിയ ഡിജിറ്റൽ മാഗസിൻ അനുഭവം.
            </p>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-sm font-bold">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                href="#home"
                className="text-sm text-white/40 transition hover:text-[#EAEC02]"
              >
                Home
              </Link>

              <Link
                href="#about"
                className="text-sm text-white/40 transition hover:text-[#EAEC02]"
              >
                About
              </Link>

              <Link
                href="#editorial"
                className="text-sm text-white/40 transition hover:text-[#EAEC02]"
              >
                Editorial
              </Link>

              <Link
                href="#publisher"
                className="text-sm text-white/40 transition hover:text-[#EAEC02]"
              >
                Publisher
              </Link>

            </div>

          </div>

          {/* CTA */}
          <div>

            <h3 className="text-sm font-bold">
              പുതിയ ലക്കം വായിക്കൂ
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
              ഏറ്റവും പുതിയ ലക്കം ₹49 ന്
              ഡിജിറ്റലായി വായിക്കാം.
            </p>

            <Link
              href="/magazine/latest"
              className="mt-5 inline-flex rounded-full bg-[#EAEC02] px-5 py-3 text-xs font-black text-[#20150A] transition hover:scale-105"
            >
              Read Magazine · ₹49
            </Link>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">

          <div className="flex flex-col gap-2 text-[10px] text-white/25 sm:flex-row sm:items-center sm:justify-between sm:text-xs">

            <p>
              © 2026 Thattumdhalam. All rights reserved.
            </p>

            <p>
              Published by RRD News+
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}
import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function Publisher() {
  return (
    <section
      id="publisher"
      className="border-y border-[#20150A]/10 bg-white px-5 py-24 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">

          {/* Logo */}
          <div className="flex justify-center lg:justify-start">

            <div className="relative overflow-hidden rounded-[30px] border border-[#20150A]/10 bg-[#F6F5F4] p-6 shadow-xl sm:p-8">

              <Image
                src="/images/rrd-news.jpeg"
                alt="RRD News+"
                width={500}
                height={350}
                className="h-auto w-[280px] object-contain sm:w-[340px]"
              />

            </div>
          </div>

          {/* Content */}
          <div>

            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#D11001] sm:text-xs">
              Published By
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-tight text-[#20150A] sm:text-5xl">
              വാർത്തകളും
              <br />
              കഥകളും.
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#20150A]/55 sm:text-base">
              RRD News+ ന്റെ നേതൃത്വത്തിൽ പ്രസിദ്ധീകരിക്കുന്ന
              തട്ടുംദളം   ഡിജിറ്റൽ മാഗസിൻ, നിലവാരമുള്ള ഉള്ളടക്കവും
              വായനക്കാരോടുള്ള ഉത്തരവാദിത്തവും മുൻനിർത്തുന്നു.
            </p>

            {/* Trust */}
            <div className="mt-7 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D11001]/10 text-[#D11001]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#20150A]">
                  ഉത്തരവാദിത്തമുള്ള പ്രസിദ്ധീകരണം
                </p>

                <p className="mt-1 text-xs text-[#20150A]/40">
                  Reporting the news as it is
                </p>
              </div>

            </div>

            <a
              href="#home"
              className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#D11001]"
            >
              മുകളിലേക്ക്
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
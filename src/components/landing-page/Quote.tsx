import { Quote as QuoteIcon } from "lucide-react";

export default function Quote() {
  return (
    <section className="relative overflow-hidden bg-[#D11001] px-5 py-24 text-center text-[#F6F5F4] sm:px-8 sm:py-32">

      {/* Decorative Circle */}
      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full border border-white/10" />

      <div className="pointer-events-none absolute bottom-[-150px] right-[-100px] h-80 w-80 rounded-full border border-[#EAEC02]/10" />

      <div className="relative mx-auto max-w-4xl">

        <QuoteIcon
          size={38}
          className="mx-auto mb-8 text-[#EAEC02]"
        />

        <blockquote className="text-2xl font-black leading-relaxed tracking-tight sm:text-4xl lg:text-5xl">
          വായന അവസാനിക്കുന്നിടത്ത്
          <br />

          <span className="text-[#EAEC02]">
            ചിന്ത തുടങ്ങുന്നു.
          </span>
        </blockquote>

        <div className="mx-auto mt-8 h-px w-12 bg-white/30" />

        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/45">
          Thattumdhalam Digital Magazine
        </p>

      </div>
    </section>
  );
}
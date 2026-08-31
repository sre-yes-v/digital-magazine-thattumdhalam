import {
  BookOpen,
  Eye,
  Feather,
} from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#F6F5F4] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          <div>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#D11001] sm:text-xs">
              About The Magazine
            </p>

            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-[#20150A] sm:text-5xl lg:text-6xl">
              ഒരു മാഗസിൻ.
              <br />
              ഒരു വായനാനുഭവം.
            </h2>
          </div>

          <div className="lg:pt-8">
            <p className="text-base leading-8 text-[#20150A]/70 sm:text-lg sm:leading-9">
              തട്ടുംദളം   ഒരു ഡിജിറ്റൽ മാഗസിൻ മാത്രമല്ല.
              മനുഷ്യരെയും കഥകളെയും ആശയങ്ങളെയും
              അടുത്തറിയാനുള്ള ഒരു പുതിയ വായനാ വേദിയാണ്.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#20150A]/50 sm:text-base sm:leading-8">
              സമൂഹം, സംസ്കാരം, വ്യക്തിത്വങ്ങൾ, ജീവിതം,
              കല, അറിവ് തുടങ്ങിയ വിവിധ മേഖലകളിൽ നിന്നുള്ള
              തിരഞ്ഞെടുക്കപ്പെട്ട ഉള്ളടക്കങ്ങൾ ഒരു മനോഹരമായ
              ഡിജിറ്റൽ അനുഭവത്തിലൂടെ വായനക്കാരിലേക്ക് എത്തിക്കുന്നു.
            </p>
          </div>

        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">

          <div className="rounded-3xl border border-[#20150A]/10 bg-white p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D11001]/10 text-[#D11001]">
              <BookOpen size={20} />
            </div>

            <h3 className="mt-6 text-lg font-black text-[#20150A]">
              മികച്ച വായന
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#20150A]/50">
              കഥകളും ലേഖനങ്ങളും അഭിമുഖങ്ങളും
              ലളിതവും മനോഹരവുമായ രീതിയിൽ.
            </p>
          </div>

          <div className="rounded-3xl border border-[#20150A]/10 bg-white p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAEC02]/40 text-[#20150A]">
              <Eye size={20} />
            </div>

            <h3 className="mt-6 text-lg font-black text-[#20150A]">
              പുതിയ കാഴ്ചപ്പാട്
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#20150A]/50">
              പരിചിതമായ കാര്യങ്ങളെ പോലും
              പുതിയൊരു കാഴ്ചപ്പാടിലൂടെ കാണാൻ.
            </p>
          </div>

          <div className="rounded-3xl border border-[#20150A]/10 bg-white p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#661B0B]/10 text-[#661B0B]">
              <Feather size={20} />
            </div>

            <h3 className="mt-6 text-lg font-black text-[#20150A]">
              സ്വന്തം ശൈലി
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#20150A]/50">
              മലയാളം വായനയുടെ സ്വാഭാവികത
              ഡിജിറ്റൽ ലോകത്ത് നിലനിർത്തുന്നു.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
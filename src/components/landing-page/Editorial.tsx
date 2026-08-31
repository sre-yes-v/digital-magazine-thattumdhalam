import Image from "next/image";

export default function Editorial() {
  return (
    <section
      id="editorial"
      className="bg-[#F6F5F4] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.25em] text-[#D11001] sm:text-xs">
            Editorial Team
          </p>

          <h2 className="text-4xl font-black tracking-tight text-[#20150A] sm:text-5xl lg:text-6xl">
            പിന്നിലെ മുഖങ്ങൾ.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#20150A]/50 sm:text-base">
            ഓരോ കഥയ്ക്കും പിന്നിൽ അതിനെ തിരഞ്ഞെടുത്തും
            രൂപപ്പെടുത്തിയുമിരിക്കുന്ന ഒരു എഡിറ്റോറിയൽ ടീം.
          </p>
        </div>

        {/* Team */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Chief Editor */}
          <article className="group overflow-hidden rounded-[28px] bg-[#661B0B] text-[#F6F5F4]">

            <div className="grid sm:grid-cols-[0.9fr_1fr]">

              <div className="relative min-h-[390px] overflow-hidden sm:min-h-[450px]">
                <Image
                  src="/images/chief-editor.jpeg"
                  alt="Chief Editor"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#20150A]/50 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-end p-7 sm:p-9">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EAEC02]">
                  Chief Editor
                </p>

                <h3 className="mt-3 text-2xl font-black">
                  ചീഫ് എഡിറ്റർ
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  മാഗസിന്റെ എഡിറ്റോറിയൽ ദിശയും
                  ഉള്ളടക്കത്തിന്റെ നിലവാരവും നയിക്കുന്ന
                  പ്രധാന എഡിറ്റോറിയൽ നേതൃത്വം.
                </p>

              </div>

            </div>
          </article>

          {/* Editor */}
          <article className="group overflow-hidden rounded-[28px] bg-[#D11001] text-[#F6F5F4]">

            <div className="grid sm:grid-cols-[0.9fr_1fr]">

              <div className="relative min-h-[390px] overflow-hidden sm:min-h-[450px]">
                <Image
                  src="/images/editor.jpeg"
                  alt="Editor"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#20150A]/40 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col justify-end p-7 sm:p-9">

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#EAEC02]">
                  Editor
                </p>

                <h3 className="mt-3 text-2xl font-black">
                  എഡിറ്റർ
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  ഉള്ളടക്കത്തെ തിരഞ്ഞെടുത്ത്,
                  ക്രമപ്പെടുത്തി, വായനക്കാരിലേക്ക്
                  മികച്ച രീതിയിൽ എത്തിക്കുന്ന എഡിറ്റോറിയൽ ടീം.
                </p>

              </div>

            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
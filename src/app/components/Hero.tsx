import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 bg-gradient-to-b from-[var(--color-gray-light)] to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-navy)] leading-tight mb-6">
          Stop Losing Great Techs to Your Competitors
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-navy-light)] mb-8 max-w-2xl mx-auto">
          HVAC companies trust Hire Dimensions to find employees who fit their
          culture and stay.
        </p>
        <a
          href="https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block text-lg md:text-xl px-8 py-4"
        >
          Book Your Free Consultation
        </a>

        {/* Hero Image */}
        <div className="mt-12 md:mt-16">
          <div className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-handshake.png"
              alt="Professional handshake representing successful hiring partnership"
              width={800}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 md:mt-16">
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">
            Trusted By:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            <div className="h-10 md:h-12 flex items-center">
              <Image
                src="/carrier-logo.png"
                alt="Carrier"
                width={120}
                height={48}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="h-10 md:h-12 flex items-center">
              <Image
                src="/service-nation-logo.png"
                alt="Service Nation"
                width={140}
                height={48}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="h-10 md:h-12 flex items-center">
              <Image
                src="/certain-path-logo.png"
                alt="Certain Path"
                width={130}
                height={48}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

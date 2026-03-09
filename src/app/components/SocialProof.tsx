import Image from "next/image";

export default function SocialProof() {
  return (
    <section className="section-padding bg-[var(--color-gray-light)]">
      <div className="max-w-4xl mx-auto">
        {/* Testimonial */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
          <svg
            className="w-12 h-12 text-[var(--color-orange)] mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-xl md:text-2xl text-[var(--color-navy)] mb-6 leading-relaxed">
            Easy to navigate. Customized to our needs. Hire Dimensions
            understands the unique challenges of HVAC hiring.
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-navy)] flex items-center justify-center text-white font-bold">
              CW
            </div>
            <div>
              <div className="font-bold text-[var(--color-navy)]">
                Christopher W.
              </div>
              <div className="text-gray-500 text-sm">HVAC Company Owner</div>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">
            Trusted By:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            <div className="h-12 md:h-14 flex items-center">
              <Image
                src="/carrier-logo.png"
                alt="Carrier"
                width={140}
                height={56}
                className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="h-12 md:h-14 flex items-center">
              <Image
                src="/service-nation-logo.png"
                alt="Service Nation"
                width={160}
                height={56}
                className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="h-12 md:h-14 flex items-center">
              <Image
                src="/certain-path-logo.png"
                alt="Certain Path"
                width={150}
                height={56}
                className="h-10 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

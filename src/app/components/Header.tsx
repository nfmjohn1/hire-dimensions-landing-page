import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Hire Dimensions"
            width={180}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </div>
        <a
          href="https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
        >
          Book Free Consultation
        </a>
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-light)] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Hire Dimensions"
              width={150}
              height={35}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://bookme.name/johnvishnesky/lite/hire-dimensions-call-with-john-vishnesky"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hire Dimensions. All rights
            reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            30+ years helping HVAC companies build teams that stay.
          </p>
        </div>
      </div>
    </footer>
  );
}

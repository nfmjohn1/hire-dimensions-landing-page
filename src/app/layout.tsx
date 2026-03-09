import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire Dimensions | HVAC Recruiting That Finds Techs Who Stay",
  description:
    "Stop losing great techs to your competitors. Hire Dimensions helps HVAC companies find employees who fit their culture and stay. 30+ years of industry experience.",
  keywords: [
    "HVAC recruiting",
    "HVAC hiring",
    "HVAC technician jobs",
    "culture fit hiring",
    "HVAC staffing",
  ],
  openGraph: {
    title: "Hire Dimensions | HVAC Recruiting That Finds Techs Who Stay",
    description:
      "Stop losing great techs to your competitors. Hire Dimensions helps HVAC companies find employees who fit their culture and stay.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire Dimensions | HVAC Recruiting That Finds Techs Who Stay",
    description:
      "Stop losing great techs to your competitors. Hire Dimensions helps HVAC companies find employees who fit their culture and stay.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

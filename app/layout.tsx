import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

// Typefaces from the client-approved mockup: an editorial serif for headings, a clean sans for text.
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Home - Barbados Maritime Ship Registry",
  description:
    "Barbados Maritime Ship Registry offers the discerning ship operator a first-class personal service in all aspects of ship registration.",
};

export const viewport: Viewport = {
  themeColor: "#000f23",
};

/*
 * Runs before first paint. Adds `motion` to <html> so elements that animate in
 * start hidden (no flash of content), unless the visitor prefers reduced motion.
 * If the animation script hasn't started within 4s, content is shown anyway.
 */
const motionBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__bmsrMotion)d.classList.remove('motion')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${instrument.variable} ${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}

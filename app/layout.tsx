import type { Metadata, Viewport } from "next";
import { Nunito, Quicksand } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

// Same typefaces as the existing site: Quicksand for headings, Nunito for text.
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Home - Barbados Maritime Ship Registry",
  description:
    "Barbados Maritime Ship Registry offers the discerning ship operator a first-class personal service in all aspects of ship registration.",
};

export const viewport: Viewport = {
  themeColor: "#3d7cc8",
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
      className={`${quicksand.variable} ${nunito.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UtilityBar } from "@/components/layout/TopBars";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Bulletins } from "@/components/sections/Bulletins";
import { EmergencyDesk } from "@/components/sections/EmergencyDesk";
import { Enquiry } from "@/components/sections/Enquiry";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { IslandStats } from "@/components/sections/IslandStats";
import { Notices } from "@/components/sections/Notices";
import { Organisations } from "@/components/sections/Organisations";
import { Process } from "@/components/sections/Process";
import { BarbadosBanner, QuickLinks } from "@/components/sections/QuickLinks";
import { Services } from "@/components/sections/Services";
import { Ticker } from "@/components/sections/Ticker";
import { WhoWeAre } from "@/components/sections/WhoWeAre";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollEffects />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:font-semibold focus:text-abyss"
      >
        Skip to content
      </a>
      <UtilityBar />
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <WhoWeAre />
        <Services />
        <Notices />
        <Process />
        <QuickLinks />
        <BarbadosBanner />
        <Organisations />
        <IslandStats />
        <Bulletins />
        <Faq />
        <Enquiry />
        <EmergencyDesk />
      </main>
      <Footer />
    </>
  );
}

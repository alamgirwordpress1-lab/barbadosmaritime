import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NoticeBar, TopBar } from "@/components/layout/TopBars";
import { ScrollEffects } from "@/components/motion/ScrollEffects";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { GuidanceAndLinkedIn, PressStatement } from "@/components/sections/Advisories";
import { Bulletins } from "@/components/sections/Bulletins";
import { Hero } from "@/components/sections/Hero";
import { IslandStats } from "@/components/sections/IslandStats";
import { Organisations } from "@/components/sections/Organisations";
import { BarbadosBanner, QuickLinks } from "@/components/sections/QuickLinks";
import { Services } from "@/components/sections/Services";
import { StayConnected } from "@/components/sections/StayConnected";
import { WhoWeAre } from "@/components/sections/WhoWeAre";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollEffects />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <TopBar />
      <NoticeBar />
      <Header />
      <main id="main">
        <Hero />
        <WhoWeAre />
        <PressStatement />
        <GuidanceAndLinkedIn />
        <Services />
        <QuickLinks />
        <BarbadosBanner />
        <Organisations />
        <IslandStats />
        <Bulletins />
        <StayConnected />
      </main>
      <Footer />
    </>
  );
}

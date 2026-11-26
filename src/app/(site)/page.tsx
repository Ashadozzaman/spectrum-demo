import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Clients from "@/components/home/Clients";
import Cta from "@/components/home/Cta";
import HomeEffects from "@/components/home/HomeEffects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <Process />
      <Clients />
      <Cta />
      <HomeEffects />
    </>
  );
}

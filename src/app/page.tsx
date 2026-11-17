import Header from "@/components/home/Header";
import MobileMenu from "@/components/home/MobileMenu";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import Process from "@/components/home/Process";
import Clients from "@/components/home/Clients";
import Cta from "@/components/home/Cta";
import Footer from "@/components/home/Footer";
import HomeEffects from "@/components/home/HomeEffects";

export default function Home() {
  return (
    <div className="page">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <MobileMenu />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Process />
        <Clients />
        <Cta />
      </main>
      <Footer />
      <HomeEffects />
    </div>
  );
}

import Header from "@/components/site/Header";
import MobileMenu from "@/components/site/MobileMenu";
import Footer from "@/components/site/Footer";
import SiteEffects from "@/components/site/SiteEffects";

/** Shared chrome for every public page: header, mobile menu, footer. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="page">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <MobileMenu />
      <main id="main">{children}</main>
      <Footer />
      <SiteEffects />
    </div>
  );
}

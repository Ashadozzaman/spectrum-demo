import type { Metadata } from "next";
import { DetailHero, seoMetadata } from "@/components/detail/DetailParts";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalPage } from "@/lib/data";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getLegalPage("terms");
  return seoMetadata(seo, routes.terms);
}

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  return (
    <>
      <DetailHero hero={page.hero} title="Terms of Use" trail={[]} />
      <LegalDocument page={page} />
    </>
  );
}

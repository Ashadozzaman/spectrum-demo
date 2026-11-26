import type { Metadata } from "next";
import { DetailHero, seoMetadata } from "@/components/detail/DetailParts";
import LegalDocument from "@/components/legal/LegalDocument";
import { getLegalPage } from "@/lib/data";
import { routes } from "@/lib/routes";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getLegalPage("privacy-policy");
  return seoMetadata(seo, routes.privacy);
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage("privacy-policy");
  return (
    <>
      <DetailHero hero={page.hero} title="Privacy Policy" trail={[]} />
      <LegalDocument page={page} />
    </>
  );
}

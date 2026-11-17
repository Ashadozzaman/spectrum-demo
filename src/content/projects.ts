import {
  CalendarCheck, Clock, FileText, Gavel, Headset, IdCard, Landmark, Printer, ShieldCheck, Ticket,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/lib/routes";

/* Content for /projects. Ported from the old site's projects.html. */

export type ProjectCategory = "identity" | "governance" | "portal";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "identity", label: "Identity & Cards" },
  { id: "governance", label: "Government" },
  { id: "portal", label: "Portals and Apps" },
];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  icon: LucideIcon;
  badge: string;
  client: string;
  description: string;
  tags: string[];
  caseStudy: { label: string; href: string };
  secondary: { label: string; href: string; external?: boolean };
  /** Larger, highlighted card. */
  flagship?: boolean;
  /** Kept in the data but not shown. */
  hidden?: boolean;
};

export const projects: Project[] = [
  {
    slug: "tcb-smart-card",
    title: "TCB Smart Card",
    category: "identity",
    icon: IdCard,
    badge: "Social Safety Net",
    client: "Trading Corporation of Bangladesh (TCB)",
    description:
      "Smart cards for more than 10 million families, checked by dealers in the TCB Card Sheba app before every sale.",
    tags: ["NID Check", "Smart Cards", "TCB Card Sheba App", "Live Tracking"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.tcb },
    secondary: { label: "Live portal", href: "https://digital.tcbsheba.com/", external: true },
    flagship: true,
  },
  {
    slug: "tcb-ai-contact-center",
    title: "TCB AI Contact Center",
    category: "governance",
    icon: Headset,
    badge: "AI Contact Center",
    client: "Trading Corporation of Bangladesh (TCB)",
    description:
      "An AI voice agent, chat and WhatsApp that answer dealers and beneficiaries 24/7, with every complaint ticketed, reported and followed up.",
    tags: ["AI Voice Agent", "WhatsApp", "Auto Tickets", "Call Analytics"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.tcbContactCenter },
    secondary: { label: "How it works", href: routes.service.aiContactCenter },
  },
  {
    slug: "e-licensing",
    title: "National e-Licensing",
    category: "governance",
    icon: FileText,
    badge: "Government Licensing",
    client: "Government Regulatory Authorities",
    description:
      "One online portal to apply for, pay for and receive government licences, each with a QR code anyone can check.",
    tags: ["Apply Online", "e-Challan", "QR Check", "Audit Trail"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.eLicensing },
    secondary: { label: "Live portal", href: "https://licence.gov.bd/", external: true },
  },
  {
    slug: "gcc-e-revenue",
    title: "Gazipur City Corporation e-Revenue",
    category: "governance",
    icon: Landmark,
    badge: "City Corporation",
    client: "Gazipur City Corporation",
    description:
      "Holding tax and trade licences online: a citizen portal, a tax calculator for every zone, and the My GCC app.",
    tags: ["Online Portal", "Tax Calculator", "My GCC App", "Dashboards"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.gcc },
    secondary: {
      label: "Get the app",
      href: "https://play.google.com/store/apps/details?id=com.spectrum.gcc_portal",
      external: true,
    },
  },
  {
    slug: "presence-feedback",
    title: "Automated Presence & Feedback",
    category: "governance",
    icon: Clock,
    badge: "Government Workplaces",
    client: "6 government bodies",
    description:
      "Attendance by location and photo, leave and feedback on the phone, used by the Ministry of Land, Ministry of Agriculture and more.",
    tags: ["Location Check-In", "Leave", "Feedback", "Android and iOS"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.apfs },
    secondary: {
      label: "Get the app",
      href: "https://play.google.com/store/apps/details?id=com.spectrumit.afs",
      external: true,
    },
  },
  {
    slug: "smart-card-issuance",
    title: "Smart Card Issuance",
    category: "identity",
    icon: Printer,
    badge: "Secure Cards",
    client: "National Transport Authorities",
    description:
      "Driving licences and transport cards printed, encoded and issued in large numbers, with chip keys kept in secure hardware.",
    tags: ["Chip Cards", "Laser Engraving", "Secure Keys", "Handheld Checks"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.smartCard },
    secondary: { label: "Card tech", href: routes.service.smartCards },
  },
  {
    slug: "officers-club-dhaka",
    title: "Officers’ Club Dhaka",
    category: "portal",
    icon: CalendarCheck,
    badge: "Members’ Club",
    client: "Officers’ Club Dhaka",
    description:
      "The club website, member portal and Android and iOS apps, where members book and pay for halls, guest house rooms and the salon.",
    tags: ["Member Portal", "Booking Calendars", "Online Payment", "Android and iOS"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.ocd },
    secondary: { label: "Live portal", href: "https://ocd.org.bd/", external: true },
  },
  {
    slug: "novotheatre-eticket",
    title: "Novotheatre eTicket",
    category: "portal",
    icon: Ticket,
    badge: "Online Ticketing",
    client: "Novotheatre",
    description:
      "Online tickets for Novotheatre on the web and in the Novotheatre eTicket Android app (500+ downloads), with barcode entry at the gates.",
    tags: ["Online Booking", "Android App", "Barcode Gates", "Sales Reports"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.novotheatre },
    secondary: { label: "Live portal", href: "https://novo.spectrum.com.bd/", external: true },
  },
  {
    slug: "upokari",
    title: "Upokari",
    category: "portal",
    icon: ShieldCheck,
    badge: "Our Own Product",
    client: "Spectrum IT Solutions",
    description:
      "AI that catches forged land records, TCB cards and NIDs, plus the Upokari app (10K+ downloads) for signed notices and a secure document vault.",
    tags: ["AI Verification", "Document Vault", "Android and iOS", "eCom Seller App"],
    caseStudy: { label: "See Upokari", href: routes.upokari },
    secondary: { label: "upokari.ai", href: "https://upokari.ai/", external: true },
  },
  {
    // Hidden while ecourt.gov.bd is offline (not deleted). Remove `hidden` to show it again.
    slug: "industrial-e-court",
    title: "Industrial e-Court",
    category: "governance",
    icon: Gavel,
    badge: "Courts and Justice",
    client: "Ministry of Labour and Employment",
    description:
      "Labour court cases filed, scheduled and followed online, with the daily cause list published automatically and SMS alerts for hearing dates.",
    tags: ["Online Filing", "Digital Signatures", "Cause Lists", "SMS Alerts"],
    caseStudy: { label: "Read case study", href: routes.caseStudy.eCourt },
    secondary: { label: "Live portal", href: "http://www.ecourt.gov.bd/", external: true },
    hidden: true,
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);

export const projectStats = [
  { value: "10M+", label: "Families on TCB cards", accent: true },
  { value: "64", label: "Districts covered" },
  { value: "100,000+", label: "Licences issued online" },
  { value: "15,000+", label: "Smart cards a day" },
];

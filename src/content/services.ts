import {
  Building, ChartLine, Code, Clock, FingerprintPattern, Headset, MapPin, Pointer, ShieldCheck,
  Smartphone, UserLock, Video, Award, Cog,
  type LucideIcon,
} from "lucide-react";
import { routes, contactFor } from "@/lib/routes";

/* Content for /services. Ported from the old site's services.html. */

export type ServiceLink = {
  title: string;
  description: string;
  href: string;
  more?: string;
  /** Existing home-page PNG icon (same look as `icon`), preferred when present. */
  image?: string;
  icon?: LucideIcon;
};

export const coreServices: ServiceLink[] = [
  {
    title: "Digital Identity & Security",
    description: "Check that people and documents are real, from NID checks to face matching.",
    href: routes.service.digitalIdentity,
    image: "/assets/ic-identity.png",
  },
  {
    title: "Smart Card Technologies",
    description: "Design, print and manage secure ID, staff and service cards.",
    href: routes.service.smartCards,
    image: "/assets/ic-card.png",
  },
  {
    title: "Artificial Intelligence",
    description: "Practical AI that reads documents, matches faces and flags fraud.",
    href: routes.service.ai,
    image: "/assets/ic-ai.png",
  },
  {
    title: "Blockchain Technology",
    description: "Records and certificates that cannot be secretly changed later.",
    href: routes.service.blockchain,
    image: "/assets/ic-chain.png",
  },
  {
    title: "Anti-Counterfeit Solutions",
    description: "Stop fake documents, cards and certificates, and catch them in seconds.",
    href: routes.service.antiCounterfeit,
    image: "/assets/ic-anti.png",
  },
  {
    title: "Brand Protection",
    description: "Unique codes and quick checks so customers know a product is genuine.",
    href: routes.service.brandProtection,
    icon: Award,
  },
  {
    title: "Business Automation",
    description: "Turn slow, paper-based office work into online workflows.",
    href: routes.service.businessAutomation,
    icon: Cog,
  },
  {
    title: "AI Contact Center",
    description: "Calls, chats and complaints answered 24/7 on phone, WhatsApp and web.",
    href: routes.service.aiContactCenter,
    icon: Headset,
  },
  {
    title: "Mobile Apps",
    description: "Android and iOS apps: 8 published, with more than 110,000 downloads.",
    href: routes.mobileApps,
    more: "See our apps",
    icon: Smartphone,
  },
  {
    title: "Custom Software & e-Government",
    description: "Websites, portals and online public services, built to order.",
    href: routes.caseStudyIndex,
    more: "See our work",
    icon: Code,
  },
];

export const systems: ServiceLink[] = [
  {
    title: "Biometric Systems",
    description: "Fingerprint, face and iris scanners, plus software that stops one person registering twice.",
    href: `${routes.products}#id-cards`,
    icon: FingerprintPattern,
  },
  {
    title: "Access Control",
    description: "Gates, turnstiles and door locks that let in only the right people.",
    href: `${routes.products}#security-access`,
    icon: UserLock,
  },
  {
    title: "Time Attendance",
    description: "Face and fingerprint machines that record staff hours and feed payroll.",
    href: `${routes.products}#security-access`,
    icon: Clock,
  },
  {
    title: "CCTV and Alarms",
    description: "Cameras, alarms and server room sensors, with alerts when something is wrong.",
    href: `${routes.products}#security-access`,
    icon: Video,
  },
  {
    title: "Vehicle Tracking",
    description: "Live location, fuel alerts and remote engine stop for your fleet.",
    href: `${routes.products}#security-access`,
    icon: MapPin,
  },
  {
    title: "Self-Service Kiosks",
    description: "Touch screens for tokens, payments and printing, without queuing at a counter.",
    href: `${routes.products}#kiosks-displays`,
    icon: Pointer,
  },
  {
    title: "ERP Systems",
    description: "One system for accounts, purchasing, staff, payroll and stock.",
    href: `${routes.products}#business-software`,
    icon: ChartLine,
  },
  {
    title: "Smart City Systems",
    description: "One control room for street lights, traffic and environment sensors.",
    href: `${routes.products}#business-software`,
    icon: Building,
  },
  {
    title: "Cyber Security",
    description: "Security checks, penetration testing and ISO 27001 advice for your systems and network.",
    href: contactFor("Cyber Security"),
    more: "Ask us",
    icon: ShieldCheck,
  },
];

export const workSteps = [
  { title: "Understand", text: "We learn how your work is done today, and what needs to change." },
  { title: "Plan", text: "We agree what to build, the cost and the timeline, in plain words." },
  { title: "Build and test", text: "We build in stages and test with your own staff before going live." },
  { title: "Support", text: "We train your team, keep the system running and improve it over time." },
];

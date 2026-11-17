import {
  BadgeCheck, Bot, Building, ChartLine, ClipboardCheck, Code, Eye, FingerprintPattern, Headset, IdCard,
  MapPin, MessagesSquare, Pointer, ShieldCheck, Siren, Smartphone, Tv, UserCheck, UserLock, Clock,
  Video, Workflow, Wrench,
  type LucideIcon,
} from "lucide-react";
import { routes } from "@/lib/routes";

/* Content for /products. Ported from the old site's products.html. */

export type Product = {
  name: string;
  /** Small label above the name. */
  kind: string;
  icon: LucideIcon;
  description: string;
  specs: string[];
  /** "See how it works" link to the related service page. */
  learnMore?: string;
  external?: { label: string; href: string };
  highlight?: boolean;
};

export type ProductGroup = {
  /** Also the anchor id (#id-cards) linked from /services. */
  id: string;
  filter: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Half-width group on large screens (shown side by side with the next one). */
  half?: boolean;
  products: Product[];
};

export const productGroups: ProductGroup[] = [
  {
    id: "id-cards",
    filter: "id",
    title: "ID & Cards",
    description: "Print secure cards and check that people and documents are real.",
    icon: IdCard,
    products: [
      {
        name: "Smart Card Printers",
        kind: "Card printing",
        icon: IdCard,
        description:
          "Print and encode ID, staff and service cards in-house, with chips and anti-copy features built in.",
        specs: [
          "Full-colour cards, one or thousands at a time",
          "Writes chip and tap (contactless) cards",
          "Adds holograms and laminate against copying",
        ],
        learnMore: routes.service.smartCards,
      },
      {
        name: "Biometric Devices",
        kind: "Identity checks",
        icon: FingerprintPattern,
        description:
          "Fingerprint scanners, iris cameras and NID card readers that confirm a person is who they say they are.",
        specs: [
          "Spots fake or rubber fingers",
          "Fingerprint, iris and NID card reading",
          "Works with Windows, Linux and Android",
        ],
        learnMore: routes.service.digitalIdentity,
      },
      {
        name: "Spectrum e-KYC",
        kind: "Software",
        icon: UserCheck,
        description: "Check a customer’s NID and face online in seconds, with no paper forms to fill in.",
        specs: [
          "Checks NID details instantly",
          "Matches the selfie to the NID photo",
          "Catches photos of photos and masks",
        ],
        learnMore: routes.service.digitalIdentity,
      },
      {
        name: "Upokari",
        kind: "Live now",
        icon: Bot,
        description:
          "Our AI tool that spots forged documents in seconds: land records, TCB smart cards and NID cards.",
        specs: [
          "Catches fakes, photocopies and edited papers",
          "Flags photos taken of a screen",
          "Checks each document against the issuing record",
        ],
        learnMore: routes.upokari,
        external: { label: "Visit upokari.ai", href: "https://upokari.ai/" },
        highlight: true,
      },
    ],
  },
  {
    id: "security-access",
    filter: "security",
    title: "Security & Access",
    description: "Control who gets in, record who is at work, and keep an eye on sites and vehicles.",
    icon: ShieldCheck,
    products: [
      {
        name: "Access Control",
        kind: "Entry control",
        icon: UserLock,
        description: "Gates, turnstiles and door locks that let in only the right people, by card, fingerprint or face.",
        specs: [
          "Speed gates let one person through at a time",
          "Open with card, fingerprint or face",
          "Doors unlock by themselves in a fire alarm",
        ],
      },
      {
        name: "Time Attendance",
        kind: "Staff attendance",
        icon: Clock,
        description: "Face and fingerprint machines that record when staff arrive and leave, with all reports in one place.",
        specs: [
          "Check in by face or fingerprint",
          "Keeps working in a power cut",
          "Sends records to your HR or payroll software",
        ],
      },
      {
        name: "CCTV Cameras",
        kind: "Surveillance",
        icon: Video,
        description:
          "Clear day-and-night cameras for offices, factories and public places, with alerts when something looks wrong.",
        specs: [
          "Sharp 4K picture, even at night",
          "Weatherproof for outdoor use",
          "Alerts for movement in restricted areas",
        ],
      },
      {
        name: "GPS Trackers",
        kind: "Vehicle tracking",
        icon: MapPin,
        description: "See where every vehicle is right now, from your phone or computer.",
        specs: [
          "Live location on a map",
          "Stop the engine remotely if a vehicle is stolen",
          "Alerts for fuel theft and leaving set areas",
        ],
      },
      {
        name: "AI Video Analytics",
        kind: "Software",
        icon: Eye,
        description: "Software that watches camera feeds for you: it reads number plates, counts crowds and raises alarms.",
        specs: ["Reads vehicle number plates", "Counts people and queue length", "Runs on your site or in the cloud"],
        learnMore: routes.service.ai,
      },
      {
        name: "Alarm & Sensor Systems",
        kind: "Alarms",
        icon: Siren,
        description:
          "Intruder alarms and smoke, heat and water sensors for offices and server rooms, so you hear about problems early.",
        specs: [
          "Door and intruder alarms",
          "Smoke, heat and water sensors for server rooms",
          "Alerts by SMS, app or email",
        ],
      },
    ],
  },
  {
    id: "ai-contact-center",
    filter: "contact",
    title: "AI Contact Center",
    description: "Answer every call and message 24/7. Take the whole system, or only the parts you need.",
    icon: Headset,
    products: [
      {
        name: "General Call Centre",
        kind: "Call centre",
        icon: Headset,
        description:
          "Software for your agents to take, make and transfer calls, with a phone menu, a call queue, the customer record and tickets.",
        specs: [
          "Phone menu (IVR) and call queue",
          "Call history and after-hours recordings",
          "Scheduling and an admin dashboard",
        ],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "AI Voice Agent",
        kind: "Voice AI",
        icon: Bot,
        description: "Answers phone calls 24/7 with no queue, finds the answer in your FAQs and documents, and replies by voice.",
        specs: [
          "Speech to text and text to speech",
          "Answers from your FAQs and documents",
          "Hands over to a person with a summary",
        ],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "Chatbot Engine",
        kind: "Chat",
        icon: MessagesSquare,
        description: "Text chat on your website or app, with the same AI and the same customer record as the voice agent.",
        specs: [
          "Chat on your website or app",
          "Same knowledge base as the voice agent",
          "Hands over to a person when needed",
        ],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "Social Media AI Assistant",
        kind: "Social media",
        icon: Smartphone,
        description: "Answers people on WhatsApp, Messenger and Instagram, in text or voice notes.",
        specs: [
          "WhatsApp, Messenger and Instagram",
          "Text and voice notes",
          "Sends reports and updates on WhatsApp",
        ],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "AI Contact Engine",
        kind: "Routing",
        icon: Workflow,
        description:
          "The core that recognises each contact, understands what they need and sends them to the right AI flow or person.",
        specs: [
          "Routing by caller type and topic",
          "One shared history for every channel",
          "Links AI flows and human agents",
        ],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "AI Insight Engine",
        kind: "Analytics",
        icon: ChartLine,
        description: "Analyses every recorded call and shows what people ask about most.",
        specs: ["Calls grouped by topic", "Top concerns and repeat questions", "Filter by day, week or month"],
        learnMore: routes.service.aiContactCenter,
      },
      {
        name: "AI Customer Care Engine",
        kind: "Complaints",
        icon: ClipboardCheck,
        description: "Runs every complaint from ticket to report to follow-up, until it is resolved.",
        specs: [
          "A numbered ticket for every complaint",
          "PDF report sent on WhatsApp",
          "Timed follow-up and escalation",
        ],
        learnMore: routes.service.aiContactCenter,
      },
    ],
  },
  {
    id: "kiosks-displays",
    filter: "kiosk",
    title: "Kiosks & Displays",
    description: "Let people serve themselves and keep them informed, with less waiting at the counter.",
    icon: Tv,
    half: true,
    products: [
      {
        name: "Self-Service Kiosks",
        kind: "Self-service",
        icon: Pointer,
        description: "Touch-screen machines where people can take a token, print a slip or pay, without queuing at a counter.",
        specs: ["Simple touch screen", "Built-in printer and QR scanner", "Strong steel body for public places"],
      },
      {
        name: "Digital Signage",
        kind: "Screens",
        icon: Tv,
        description: "Screens that show notices, offers or queue numbers, all updated from one web dashboard.",
        specs: [
          "Bright, commercial-grade screens",
          "Update every screen from one place",
          "Split screens for video, news and tickers",
        ],
      },
    ],
  },
  {
    id: "business-software",
    filter: "business",
    title: "Business Software",
    description: "Run day-to-day operations from one system instead of many spreadsheets.",
    icon: ChartLine,
    half: true,
    products: [
      {
        name: "Enterprise ERP",
        kind: "Software",
        icon: ChartLine,
        description:
          "One system for accounts, purchasing, staff, payroll and stock, so every department works from the same numbers.",
        specs: [
          "Accounts with a full audit trail",
          "Payroll and tax worked out automatically",
          "Stock across many warehouses",
        ],
      },
      {
        name: "Smart City Platform",
        kind: "Software",
        icon: Building,
        description: "One control-room view of street lights, traffic and environment sensors, for faster response to problems.",
        specs: ["Live sensor data on a map", "Sends the right team to each incident", "Works with common IoT devices"],
      },
    ],
  },
];

export const productCount = productGroups.reduce((n, g) => n + g.products.length, 0);

export const whySpectrum: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Certified processes",
    text: "Our work follows ISO 9001:2015 for quality and ISO 27001:2022 for information security.",
    icon: BadgeCheck,
  },
  {
    title: "Local support",
    text: "A technical team in Dhaka, spare units ready, and engineers who can visit sites across Bangladesh.",
    icon: Wrench,
  },
  {
    title: "Easy to connect",
    text: "Ready tools and guides (SDKs and APIs) so devices work with the software you already have.",
    icon: Code,
  },
  {
    title: "Your data stays here",
    text: "We can set systems up on your own servers, with personal data kept inside Bangladesh.",
    icon: ShieldCheck,
  },
];

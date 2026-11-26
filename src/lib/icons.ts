import {
  Archive, Award, BadgeCheck, Banknote, Bell, Blocks, Bot, Brain, Building, CalendarCheck, Car, ChartBar,
  ChartLine, ClipboardCheck, Clock, Code, Cog, Database, Eye, Factory, FileCheck, FileSearch, FileText,
  FingerprintPattern, Gavel, Handshake, Globe, GraduationCap, HandCoins, HandHelping, Headset, Hospital, IdCard, Inbox,
  KeyRound, Landmark, Languages, LayoutDashboard, Layers, Link, Lock, Mail, MapPin, MessagesSquare, Network,
  Package, PenLine, Pill, Plug, Pointer, Printer, QrCode, ScanFace, ScanLine, Search, Server, ShieldCheck,
  Shirt, ShoppingCart, Siren, Smartphone, Sparkles, Store, Target, Ticket, Truck, Tv, UserCheck, UserLock, Users, Video,
  Wheat, Wifi, Workflow, Wrench, Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icon names that JSON files may use (`"icon": "IdCard"`).
 *
 * JSON cannot hold components, so content refers to icons by name and the
 * page looks them up here. To use a new icon: check the export exists in this
 * lucide-react version, import it above and add it to the map.
 */
const icons = {
  Archive, Award, BadgeCheck, Banknote, Bell, Blocks, Bot, Brain, Building, CalendarCheck, Car, ChartBar,
  ChartLine, ClipboardCheck, Clock, Code, Cog, Database, Eye, Factory, FileCheck, FileSearch, FileText,
  FingerprintPattern, Gavel, Handshake, Globe, GraduationCap, HandCoins, HandHelping, Headset, Hospital, IdCard, Inbox,
  KeyRound, Landmark, Languages, LayoutDashboard, Layers, Link, Lock, Mail, MapPin, MessagesSquare, Network,
  Package, PenLine, Pill, Plug, Pointer, Printer, QrCode, ScanFace, ScanLine, Search, Server, ShieldCheck,
  Shirt, ShoppingCart, Siren, Smartphone, Sparkles, Store, Target, Ticket, Truck, Tv, UserCheck, UserLock, Users, Video,
  Wheat, Wifi, Workflow, Wrench, Zap,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Look up an icon by name. Throws at build time on a typo, so it never ships broken. */
export function getIcon(name: string): LucideIcon {
  const icon = (icons as Record<string, LucideIcon>)[name];
  if (!icon) throw new Error(`Unknown icon "${name}". Add it to src/lib/icons.ts.`);
  return icon;
}

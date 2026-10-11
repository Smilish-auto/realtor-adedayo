import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Realtor Adedayo | Find Land & Homes with Confidence",
  description: "Explore land and homes in Ibadan, Lagos and selected Nigerian locations. Get clear property details and request a viewing.",
  metadataBase: new URL("https://example.vercel.app"),
  openGraph: {
    title: "Realtor Adedayo",
    description: "Find land and homes with clear information and personal guidance.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

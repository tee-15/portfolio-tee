import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: {
    default: "Temitope Williams — Product Designer & Project Manager",
    template: "%s | Temitope Williams",
  },
  description:
    "Results-driven Product Designer and Product Manager with 8+ years delivering digital products across FinTech, SaaS, enterprise, and education sectors.",
  keywords: [
    "Product Designer",
    "Product Manager",
    "Project Manager",
    "UI/UX Design",
    "FinTech",
    "SaaS",
    "Portfolio",
    "Accra",
    "Ghana",
    "Lagos",
    "Nigeria",
  ],
  authors: [{ name: "Temitope Williams" }],
  creator: "Temitope Williams",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://temitopewilliams.com",
    siteName: "Temitope Williams",
    title: "Temitope Williams — Product Designer & Product Manager",
    description:
      "Results-driven Product Designer and Product Manager with 8+ years delivering digital products across FinTech, SaaS and enterprise.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Temitope Williams — Product Designer & Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temitope Williams — Product Designer & Product Manager",
    description:
      "Results-driven Product Designer and Product Manager with 8+ years delivering digital products across FinTech, SaaS and enterprise.",
    creator: "@temitopewilliams",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://temitopewilliams.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { projects } from "@/data/archive";
import { identity } from "@/data/site";
import { origin } from "@/lib/origin";
import "./globals.css";
const sans = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--body-font",
  weight: "100 1000",
  display: "swap",
});
const mono = localFont({
  src: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
  variable: "--mono-font",
  weight: "500",
  display: "swap",
});
export const viewport: Viewport = { themeColor: "#E3FDFD" };

export const metadata: Metadata = {
  metadataBase: origin,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      ...[48, 32, 16].map((size) => ({
        url: `/favicon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
      })),
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  title: { default: identity.title, template: "%s | Adil CA" },
  description: identity.description,
  openGraph: {
    title: identity.title,
    description: identity.description,
    type: "website",
    siteName: "ADIL CA / Digital Archive",
    images: [
      {
        url: "/social.jpg",
        width: 1200,
        height: 630,
        alt: "Adil CA, The Digital Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@HUNTERMONKX",
    images: ["/social.jpg"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[sans.variable, mono.variable].join(" ")}>
      <head>
        <link
          rel="preload"
          href="/fonts/Matcha-Squishy.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header records={projects.map(({ name, slug }) => ({ name, slug }))} />
        {children}
      </body>
    </html>
  );
}

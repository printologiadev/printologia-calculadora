import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printología - Impresión Creativa Gran Formato en Monterrey | Lonas, Vinilos, Sublimación, DTF, Stickers",
  description: "Especialistas en impresión gran formato en Monterrey. Lonas publicitarias, vinilos, sublimación, DTF, stickers y más. Cotiza tu proyecto online con máquinas de hasta 160cm x 360cm. Calidad premium y entrega rápida.",
  keywords: "impresión gran formato Monterrey, lonas publicitarias Monterrey, vinilos Monterrey, sublimación Monterrey, DTF Monterrey, stickers Monterrey, impresión creativa, Printología, impresión digital Monterrey, banners publicitarios, impresión outdoor",
  authors: [{ name: "Printología" }],
  creator: "Printología",
  publisher: "Printología",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.printologia.com.mx'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Printología - Impresión Creativa Gran Formato en Monterrey",
    description: "Especialistas en impresión gran formato en Monterrey. Lonas, vinilos, sublimación, DTF, stickers. Cotiza online con calidad premium.",
    url: "https://www.printologia.com.mx",
    siteName: "Printología",
    images: [
      {
        url: "/PUBLICACION_VERTICAL_REDES_PRINTOLOGIA.jpg",
        width: 1200,
        height: 630,
        alt: "Printología - Impresión Gran Formato Monterrey",
        type: "image/jpeg",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printología - Impresión Creativa Gran Formato en Monterrey",
    description: "Especialistas en impresión gran formato en Monterrey. Lonas, vinilos, sublimación, DTF, stickers. Cotiza online.",
    images: ["/PUBLICACION_VERTICAL_REDES_PRINTOLOGIA.jpg"],
    creator: "@printologiamty",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Additional Open Graph tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Printología - Impresión Gran Formato Monterrey" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Printología" />
        <meta property="og:locale" content="es_MX" />

        {/* Additional Twitter tags */}
        <meta name="twitter:site" content="@printologiamty" />
        <meta name="twitter:creator" content="@printologiamty" />

        {/* Additional SEO tags */}
        <meta name="geo.region" content="MX-NLE" />
        <meta name="geo.placename" content="Monterrey" />
        <meta name="geo.position" content="25.6866;-100.3161" />
        <meta name="ICBM" content="25.6866, -100.3161" />

        {/* Business information */}
        <meta name="author" content="Printología" />
        <meta name="publisher" content="Printología" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Printología",
              "url": "https://www.printologia.com.mx",
              "logo": "https://www.printologia.com.mx/LOGO_DARK.svg",
              "description": "Especialistas en impresión gran formato en Monterrey. Lonas publicitarias, vinilos, sublimación, DTF, stickers y más.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Narciso Mendoza 4212",
                "addressLocality": "Niño Artillero",
                "addressRegion": "Nuevo León",
                "postalCode": "64989",
                "addressCountry": "MX"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52-814-360-3610",
                "contactType": "customer service",
                "availableLanguage": "Spanish"
              },
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61581039116908",
                "https://www.instagram.com/printologiamty/"
              ],
              "serviceType": [
                "Impresión Gran Formato",
                "Lonas Publicitarias",
                "Vinilos",
                "Sublimación",
                "DTF",
                "Stickers"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Monterrey",
                "addressRegion": "Nuevo León",
                "addressCountry": "MX"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AdminTools from "@/components/AdminTools";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono", // Using mono variable for headings for now, or just custom class
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printología - Impresión Creativa Gran Formato en Monterrey",
  description: "Especialistas en impresión gran formato en Monterrey. Lonas publicitarias, vinilos, sublimación, DTF, stickers y más. Cotiza tu proyecto online.",
  keywords: "impresión gran formato Monterrey, lonas publicitarias Monterrey, vinilos Monterrey, sublimación Monterrey, DTF Monterrey, stickers Monterrey, impresión creativa, Printología",
  authors: [{ name: "Printología" }],
  creator: "Printología",
  publisher: "Printología",
  metadataBase: new URL('https://www.printologia.com.mx'),
  openGraph: {
    title: "Printología - Impresión Creativa Gran Formato en Monterrey",
    description: "Especialistas en impresión gran formato en Monterrey. Lonas, vinilos, sublimación, DTF, stickers. Cotiza online con calidad premium.",
    url: "https://www.printologia.com.mx",
    siteName: "Printología",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printología - Impresión Creativa Gran Formato en Monterrey",
    description: "Especialistas en impresión gran formato en Monterrey. Lonas, vinilos, sublimación, DTF, stickers. Cotiza online.",
    creator: "@printologiamty",
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
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <AdminTools position="top-right" />
      </body>
    </html>
  );
}


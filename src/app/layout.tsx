import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BozoGPT - Ignorancia Artificial",
  description: "La primera IA entrenada con educación pública y televisión mexicana",
  metadataBase: new URL('https://bozogpt.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BozoGPT - Ignorancia Artificial",
    description: "La primera IA entrenada con educación pública y televisión mexicana",
    url: 'https://bozogpt.com',
    siteName: 'BozoGPT',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'BozoGPT - Ignorancia Artificial',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BozoGPT - Ignorancia Artificial",
    description: "La primera IA entrenada con educación pública y televisión mexicana",
    images: ['/og-image.svg'],
    creator: '@artmichel_eth',
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
    google: 'tu-codigo-de-verificacion-google',
    other: {
      'google-site-verification': 'tu-codigo-de-verificacion-google',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6477883622948797" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-6477883622948797" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen h-full flex flex-col bg-zinc-900 text-zinc-100`}
      >
        {/* Main content area with container queries */}
        <main className="flex-1 flex flex-col min-h-0 h-full overflow-hidden" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}

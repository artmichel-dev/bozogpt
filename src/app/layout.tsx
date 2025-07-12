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
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6477883622948797" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-6477883622948797" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100dvh] flex flex-col overflow-hidden`}
      >
        <header className="w-full border-b border-zinc-700 py-2 flex items-center bg-zinc-900/50 z-10" role="banner">
          <div className="flex items-center gap-2 w-full">
            <span className="text-xl sm:text-2xl ml-2" role="img" aria-label="Robot icon">🤖</span>
            <h1 className="hidden sm:block flex-1 text-center text-base sm:text-lg font-bold text-zinc-100 select-none truncate">Ignorancia Artificial™</h1>
            <h1 className="block sm:hidden text-base font-bold text-zinc-100 select-none ml-2">Ignorancia Artificial™</h1>
          </div>
        </header>
        <main className="flex-1 min-h-0 h-full flex items-center justify-center px-4 py-4 overflow-hidden" role="main">
          {children}
        </main>
        <footer className="w-full flex flex-col items-center gap-1 py-3 border-t border-zinc-700 bg-zinc-900/90 text-zinc-300 text-xs sm:text-sm px-4 mt-auto" role="contentinfo">
          <div className="w-full flex flex-col items-center mb-2">
            <div className="text-center text-zinc-400 text-xs sm:text-sm max-w-xl mb-3 leading-snug">
              La parodia de ChatGPT que responde mal, confunde y no sabe nada… pero con actitud. <span role="img" aria-label="Clown face">🤡</span>
            </div>
            <div className="text-center text-zinc-300 text-xs sm:text-sm mb-2">
              BozoGPT - Desarrollado por <a href="https://www.artmichel.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-100 transition-all">Art Michel</a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-3">
            <a href="https://github.com/artmichel-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline underline-offset-4 transition-all" aria-label="Visitar perfil de GitHub de Art Michel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
              <span className="hidden sm:inline">@artmichel-dev</span>
            </a>
            <a href="https://x.com/artmichel_eth" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline underline-offset-4 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="w-4 h-4"><path d="M1199.76 0H944.13L599.88 494.13 255.87 0H.24l438.6 637.5L0 1227.01h255.87l344.01-494.13 343.89 494.13h255.87L761.16 637.5z"/></svg>
              <span className="hidden sm:inline">@artmichel_eth</span>
            </a>
            <a href="https://instagram.com/artmichel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline underline-offset-4 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 186c-39.5 0-71.5-32-71.5-71.5s32-71.5 71.5-71.5 71.5 32 71.5 71.5-32 71.5-71.5 71.5zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.3-9.9-66.7-36.2-92.1S388.6 1.7 353.3.1C317.7-1.6 130.3-1.6 94.7.1 59.4 1.7 28 9.9 2.6 36.2S1.7 59.4.1 94.7C-1.6 130.3-1.6 317.7.1 353.3c1.7 35.3 9.9 66.7 36.2 92.1s56.8 34.5 92.1 36.2c35.6 1.7 223 1.7 258.6 0 35.3-1.7 66.7-9.9 92.1-36.2s34.5-56.8 36.2-92.1c1.7-35.6 1.7-223 0-258.6zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.2 9-132.3 9s-102.9 2.6-132.3-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.2-9-132.3s-2.6-102.9 9-132.3c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.2-9 132.3-9s102.9-2.6 132.3 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.2 9 132.3s2.6 102.9-9 132.3z"/></svg>
              <span className="hidden sm:inline">@artmichel</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}

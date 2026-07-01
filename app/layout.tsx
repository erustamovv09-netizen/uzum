import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Uzum Market — O'zbekistoning eng yirik internet do'koni",
  description: "Uzum Market — smartfonlar, kiyim-kechak, uy jihozlari, oziq-ovqat va minglab boshqa mahsulotlarni qulay va tez yetkazib berish bilan sotib oling.",
  keywords: "uzum, market, internet do'kon, online xarid, uzbekistan, smartfon, kiyim",
  openGraph: {
    title: "Uzum Market",
    description: "O'zbekistoning eng yirik internet do'koni",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)', fontFamily: "'Inter', system-ui, sans-serif" }}>
        <AuthProvider>
          <LanguageProvider>
            <CartProvider>
              <Header />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

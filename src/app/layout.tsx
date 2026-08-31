import type { Metadata } from "next";
import { Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const malayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  variable: "--font-malayalam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "തട്ടുംതളം | ഡിജിറ്റൽ മാഗസിൻ",
  description:
    "വായനയുടെ പഴയ രസം ഡിജിറ്റൽ ലോകത്തിന്റെ പുതിയ അനുഭവവുമായി ചേർത്ത് ഒരുക്കിയ തട്ടുംതളം ഡിജിറ്റൽ മാഗസിൻ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml">
      <body className={`${malayalam.variable} min-h-screen`}>
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
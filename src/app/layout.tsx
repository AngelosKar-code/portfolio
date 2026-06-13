import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "greek"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Angelos Karampalasis | Interactive Web Developer",
  description:
    "One-page portfolio showcase for WordPress, React, Next.js, Three.js, GSAP, e-commerce, performance, and modern web experiences.",
  keywords: ["Angelos Karampalasis", "Interactive Web Developer", "Three.js", "GSAP", "WordPress", "React", "Next.js", "WooCommerce"],
  authors: [{ name: "Angelos Karampalasis" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className={`${roboto.variable} ${geistSans.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

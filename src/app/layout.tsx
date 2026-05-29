import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Angelos Karampalasis | Web Developer & Designer",
  description: "Professional web developer specializing in WordPress custom themes, e-commerce, speed optimization, and modern React/Next.js web applications.",
  keywords: ["Angelos Karampalasis", "Web Developer", "WordPress", "WooCommerce", "React", "Next.js", "Greek Developer"],
  authors: [{ name: "Angelos Karampalasis" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              history.scrollRestoration='manual';
              window.scrollTo({top:0,left:0,behavior:'instant'});
              var _c=0,_i=setInterval(function(){
                window.scrollTo({top:0,left:0,behavior:'instant'});
                if(++_c>50){clearInterval(_i);document.documentElement.classList.add('scroll-ready')}
              },10);
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#030303] text-slate-100`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

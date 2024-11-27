import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TestPe",
  description: "Testpe provide previous year questions pepper beu aku and other university ...",
  keywords:['testpe','testpe.in','tp.in','testpe company','tp','beu exam pepper','beu university pepper'],
  icons:"/favicon.ico",
  category: ' Technology',
  alternates: {
    canonical: "https://testpe.in/",
  },
  openGraph:{
    type:'website',
    title:"testpe.in",
    description:'Testpe is private company that provides previous year questions pepper of various university and collage.',
    images:["https://res.cloudinary.com/dxgkczwho/image/upload/v1728748195/TP_1_robav7.png",
            "https://res.cloudinary.com/dxgkczwho/image/upload/v1728748274/homedesign_zk91ey.png",
            " https://res.cloudinary.com/dxgkczwho/image/upload/v1728748336/TP_pxi42w.png",
    ],
    url:"https://testpe.in/"
  },
  twitter:{
    site: "testpe.in",
    images: "https://res.cloudinary.com/dxgkczwho/image/upload/v1732715525/homed_yihpte.png",
    title: "Testpe.in",
    description: "Testpe is private company that provides previous year questions pepper of various university and collage.",
    card:"summary_large_image",
    creator: "@testpe.in"
    
  },
  metadataBase: new URL("https://testpe.in/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar/>
        <main>{children}</main>
        <Analytics/>
        <SpeedInsights/>
        <Toaster/>
        <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}

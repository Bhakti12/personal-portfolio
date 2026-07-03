import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClickEffect from "@/components/ClickEffect";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bhakti Sanghani — Backend Software Engineer",
  description: "3 years building scalable, data-intensive backend systems across healthcare, e-commerce, and IoT fleet tracking. I turn messy operational problems into reliable APIs and pipelines.",
  openGraph: {
    title: "Bhakti Sanghani — Backend Software Engineer",
    description: "3 years building scalable, data-intensive backend systems across healthcare, e-commerce, and IoT fleet tracking. I turn messy operational problems into reliable APIs and pipelines.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-dark text-gray-200 min-h-screen`}
      >
        <CustomCursor />
        <ClickEffect />
        {children}
      </body>
    </html>
  );
}

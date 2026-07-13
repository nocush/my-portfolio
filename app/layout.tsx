import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "#ffedd5"},
    {media: "(prefers-color-scheme: dark)", color: "#000000"},
  ]
}

export const metadata: Metadata = {
  title: "Mateusz Bartoszek - Portfolio",
  description: "Portfolio of Mateusz Bartoszek, a web developer and software engineer. Showcasing my skills, projects, and experience in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-orange-100 dark:bg-black text-black dark:text-white`}
    >
      <body className="h-dvh overflow-hidden flex flex-col">{children}</body>
    </html>
  );
}

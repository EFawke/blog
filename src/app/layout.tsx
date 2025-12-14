import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ted Fawke",
  description: "Some words about coding",
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
        <Theme accentColor="blue" radius="full" appearance="dark" style={{backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/0/00/Flag_of_Palestine.svg")`, backgroundRepeat: "no-repeat", backgroundPosition: "top", backgroundSize: "contain"}}>
          {children}
        </Theme>
      </body>
    </html>
  );
}

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
  title: "Poomsae SBS",
  description: "Created by Jamsheed Mistri",
  icons: {
    icon: ["/icons/icon-192x192.png"],
    apple: ["/icons/icon-192x192.png"],
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Poomsae SBS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <div className="landscape:hidden flex items-center justify-center h-screen p-6">
          <p className="text-center text-lg">
            Please rotate your device to landscape mode.
          </p>
        </div>
        <div className="landscape:block hidden">{children}</div>
      </body>
    </html>
  );
}

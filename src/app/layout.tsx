import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gynoveda Meet App",
  description:
    "Purpose of this app is to help you to appoint a date for your meeting with your doctor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-dark-300 light`}
      >
        {children}
      </body>
    </html>
  );
}

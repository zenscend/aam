import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "All American Muscle - Workshop Management System",
  description: "Workshop Management & Planning System for classic car restoration projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

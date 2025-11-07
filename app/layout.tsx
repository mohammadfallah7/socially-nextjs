import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import Navbar from "./_components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Socially",
  description: "Social media application built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import {cn} from "../lib/utils"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Insight Journal",
  description: "A journaling app with AI insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

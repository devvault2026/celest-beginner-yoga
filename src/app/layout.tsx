import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/Navigation";
import { Sparkles, Database } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoga at home with Celest for Beginners | Clinical Accessibility",
  description: "A data-driven yoga ecosystem for clinical outcomes, modular sequence mapping, and real-time AI feedback.",
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
        <ClerkProvider appearance={{
          layout: {
            hidePoweredByClerk: true,
          },
          variables: {
            colorPrimary: "#E11D48",
            colorText: "#2D2424",
            colorBackground: "#FFFFFF",
            fontFamily: "var(--font-geist-sans)",
          },
          elements: {
            rootBox: "cl-rootBox",
            userButtonPopoverCard: "shadow-2xl border border-rose/10 rounded-[2.5rem] overflow-hidden bg-white",
            userButtonPopoverFooter: "hidden",
            userButtonPopoverMain: "p-2",
            userButtonPopoverActions: "p-2",
            userButtonPopoverActionButton: "hover:bg-rose/5 transition-all rounded-2xl py-3 px-4",
            userButtonPopoverActionButtonText: "text-[#2D2424] font-black tracking-tight text-sm",
            userButtonPopoverActionButtonIcon: "text-rose w-5 h-5",
            userPreviewMainIdentifier: "font-black text-[#2D2424] tracking-tighter text-base",
            userPreviewSecondaryIdentifier: "text-sage font-bold text-xs opacity-60",
            userPreviewAvatarContainer: "border-2 border-rose/20 rounded-full",
            brandedBox: "hidden",
          }
        }}>
          <Navigation />
          {children}
          <Toaster position="top-right" expand={true} richColors />
        </ClerkProvider>
      </body>
    </html>
  );
}

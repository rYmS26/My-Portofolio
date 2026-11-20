import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { INITIAL_PROFILE_SETTINGS } from "@/lib/data/seed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${INITIAL_PROFILE_SETTINGS.full_name} — ${INITIAL_PROFILE_SETTINGS.headline}`,
    template: `%s | ${INITIAL_PROFILE_SETTINGS.full_name}`,
  },
  description: INITIAL_PROFILE_SETTINGS.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50/80 text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Navbar
          availabilityStatus={INITIAL_PROFILE_SETTINGS.availability_status}
          fullName={INITIAL_PROFILE_SETTINGS.full_name}
        />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

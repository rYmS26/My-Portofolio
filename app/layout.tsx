import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getProfileSettings } from "@/lib/data/repository";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfileSettings();
  return {
    title: {
      default: `${profile.full_name} — ${profile.headline}`,
      template: `%s | ${profile.full_name}`,
    },
    description: profile.bio,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfileSettings();

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Navbar
          availabilityStatus={profile.availability_status}
          fullName={profile.full_name}
        />
        <main className="flex-1">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}

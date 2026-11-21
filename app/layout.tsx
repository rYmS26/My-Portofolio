import { Suspense } from "react";
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

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");}}catch(e){}})();`;

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-[background-color,color] duration-150 ease-out">
        <Suspense
          fallback={
            <header className="sticky top-0 z-30 h-12 bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200/80 dark:border-zinc-800" />
          }
        >
          <Navbar
            availabilityStatus={profile.availability_status}
            fullName={profile.full_name}
          />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}

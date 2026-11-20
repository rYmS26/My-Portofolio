import type { Metadata } from "next";
import { getProfileSettings } from "@/lib/data/repository";
import { SettingsManager } from "@/components/admin/settings-manager";

export const metadata: Metadata = {
  title: "CMS Pengaturan Profil & Availability",
};

export default async function AdminSettingsPage() {
  const profile = await getProfileSettings();
  return <SettingsManager initialProfile={profile} />;
}

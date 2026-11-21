import type { Metadata } from "next";
import { getAllEducationsForAdmin } from "@/lib/data/repository";
import { EducationsManager } from "@/components/admin/educations-manager";

export const metadata: Metadata = {
  title: "CMS Pendidikan (Education)",
};

export default async function AdminEducationPage() {
  const educations = await getAllEducationsForAdmin();
  return <EducationsManager initialEducations={educations} />;
}

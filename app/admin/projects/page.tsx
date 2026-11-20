import type { Metadata } from "next";
import { getAllProjectsForAdmin } from "@/lib/data/repository";
import { ProjectsManager } from "@/components/admin/projects-manager";

export const metadata: Metadata = {
  title: "CMS Studi Kasus Proyek",
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsForAdmin();
  return <ProjectsManager initialProjects={projects} />;
}

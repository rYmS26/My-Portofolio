import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/actions/auth";
import {
  getAllInquiriesForAdmin,
  getAllProjectsForAdmin,
  getPublishedNotes,
  getWorkExperiences,
} from "@/lib/data/repository";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    redirect("/login");
  }

  const [projects, experiences, notes, inquiries] = await Promise.all([
    getAllProjectsForAdmin(),
    getWorkExperiences(),
    getPublishedNotes(),
    getAllInquiriesForAdmin(),
  ]);

  const unreadCount = inquiries.filter((inq) => inq.status === "unread").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <AdminSidebar
          adminEmail={admin.email}
          authMode={admin.authMode}
          counts={{
            projects: projects.length,
            experiences: experiences.length,
            notes: notes.length,
            unreadInquiries: unreadCount,
          }}
        />
        <div className="flex-1 w-full min-w-0">{children}</div>
      </div>
    </div>
  );
}

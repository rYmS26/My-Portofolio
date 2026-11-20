import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/actions/auth";
import {
  getAllInquiriesForAdmin,
  getAllProjectsForAdmin,
  getPublishedNotes,
  getWorkExperiences,
} from "@/lib/data/repository";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Skeleton } from "@/components/ui/ui-states";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function AdminShellSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      <div className="w-full lg:w-64 shrink-0 bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
      <div className="flex-1 w-full space-y-4">
        <Skeleton className="h-20 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}

async function AdminAuthenticatedShell({
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
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Suspense fallback={<AdminShellSkeleton />}>
        <AdminAuthenticatedShell>{children}</AdminAuthenticatedShell>
      </Suspense>
    </div>
  );
}

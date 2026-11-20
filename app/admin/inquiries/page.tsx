import type { Metadata } from "next";
import { getAllInquiriesForAdmin } from "@/lib/data/repository";
import { InquiriesManager } from "@/components/admin/inquiries-manager";

export const metadata: Metadata = {
  title: "CMS Kotak Masuk Perekrutan",
};

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiriesForAdmin();
  return <InquiriesManager initialInquiries={inquiries} />;
}

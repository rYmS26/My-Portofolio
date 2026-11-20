import type { Metadata } from "next";
import { getAllNotesForAdmin } from "@/lib/data/repository";
import { NotesManager } from "@/components/admin/notes-manager";

export const metadata: Metadata = {
  title: "CMS Catatan Teknis",
};

export default async function AdminNotesPage() {
  const notes = await getAllNotesForAdmin();
  return <NotesManager initialNotes={notes} />;
}

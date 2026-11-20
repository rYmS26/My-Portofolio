"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Inbox,
  Mail,
} from "lucide-react";
import type { HireInquiry, InquiryStatus } from "@/types/portfolio";
import { updateInquiryStatusAction } from "@/lib/actions/cms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/ui-states";
import { formatIndonesianDate } from "@/lib/utils";

export function InquiriesManager({
  initialInquiries,
}: {
  initialInquiries: HireInquiry[];
}) {
  const [inquiries, setInquiries] =
    React.useState<HireInquiry[]>(initialInquiries);
  const [filterStatus, setFilterStatus] = React.useState<"ALL" | InquiryStatus>(
    "ALL"
  );
  const [selectedId, setSelectedId] = React.useState<string | null>(
    initialInquiries[0]?.id ?? null
  );
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [feedback, setFeedback] = React.useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const filtered = React.useMemo(() => {
    if (filterStatus === "ALL") return inquiries;
    return inquiries.filter((inq) => inq.status === filterStatus);
  }, [inquiries, filterStatus]);

  const selectedInquiry =
    filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  const handleStatusChange = async (
    inquiry: HireInquiry,
    nextStatus: InquiryStatus
  ) => {
    setBusyId(inquiry.id);
    setFeedback(null);
    const res = await updateInquiryStatusAction(inquiry.id, nextStatus);
    setBusyId(null);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal memperbarui status pesan.",
      });
      return;
    }

    setInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiry.id ? { ...item, status: nextStatus } : item
      )
    );
    setFeedback({
      tone: "success",
      text: `Status tiket ${inquiry.reference_code} diperbarui menjadi "${nextStatus}".`,
    });
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Kotak Masuk Perekrutan & Klien (`public.inquiries`)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 tabular-nums">
            {inquiries.length} pesan tercatat •{" "}
            {inquiries.filter((i) => i.status === "unread").length} belum dibaca
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter status pesan"
          className="inline-flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200/80"
        >
          {(["ALL", "unread", "read", "replied", "archived"] as const).map(
            (st) => (
              <button
                key={st}
                type="button"
                role="tab"
                aria-selected={filterStatus === st}
                onClick={() => setFilterStatus(st)}
                className={`h-7 px-2.5 rounded-md text-xs font-medium capitalize transition-[color,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                  filterStatus === st
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {st === "ALL" ? "Semua" : st}
              </button>
            )
          )}
        </div>
      </div>

      {feedback && (
        <div
          role="status"
          className={`rounded-xl border p-3.5 text-xs flex items-center gap-2 ${
            feedback.tone === "success"
              ? "bg-emerald-50 border-emerald-200/60 text-emerald-800"
              : "bg-red-50 border-red-200/60 text-red-800"
          }`}
        >
          {feedback.tone === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="Tidak Ada Pesan pada Filter Ini"
          description="Semua pesan perekrutan atau konsultasi pada status yang dipilih sudah ditangani."
          actionLabel="Tampilkan Semua Pesan"
          onAction={() => setFilterStatus("ALL")}
        />
      ) : (
        <div className="space-y-5">
          <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                    Referensi
                  </th>
                  <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                    Pengirim & Perusahaan
                  </th>
                  <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                    Status
                  </th>
                  <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                    Kompensasi / Budget
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inquiry) => {
                  const active = selectedInquiry?.id === inquiry.id;
                  return (
                    <tr
                      key={inquiry.id}
                      onClick={() => setSelectedId(inquiry.id)}
                      className={`border-b border-zinc-100 last:border-0 cursor-pointer transition-colors ${
                        active ? "bg-zinc-100/80" : "hover:bg-zinc-50/60"
                      }`}
                    >
                      <td className="py-3 px-4 text-xs font-mono text-zinc-700 tabular-nums whitespace-nowrap">
                        {inquiry.reference_code}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-zinc-900">
                          {inquiry.sender_name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {inquiry.company} • {inquiry.inquiry_type}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          tone={
                            inquiry.status === "unread"
                              ? "warning"
                              : inquiry.status === "replied"
                              ? "success"
                              : "neutral"
                          }
                          withDot
                        >
                          {inquiry.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono whitespace-nowrap">
                        {inquiry.budget_or_comp}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedInquiry && (
            <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge tone="mono">{selectedInquiry.reference_code}</Badge>
                    <span className="text-xs text-zinc-500 tabular-nums">
                      Diterima {formatIndonesianDate(selectedInquiry.created_at)}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-zinc-900 mt-1.5">
                    {selectedInquiry.sender_name} — {selectedInquiry.company}
                  </h2>
                  <p className="text-xs font-mono text-zinc-500">
                    {selectedInquiry.sender_email} • {selectedInquiry.inquiry_type}
                  </p>
                </div>

                <a
                  href={`mailto:${selectedInquiry.sender_email}?subject=Re: ${selectedInquiry.reference_code} — ${selectedInquiry.inquiry_type}`}
                  className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98]"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  <span>Balas via Email</span>
                </a>
              </div>

              <p className="text-sm leading-relaxed text-zinc-700 text-pretty bg-zinc-50/80 border border-zinc-200/60 rounded-lg p-4">
                {selectedInquiry.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs font-mono text-zinc-500 tabular-nums">
                  Estimasi: {selectedInquiry.budget_or_comp}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={
                      busyId === selectedInquiry.id ||
                      selectedInquiry.status === "read"
                    }
                    onClick={() => handleStatusChange(selectedInquiry, "read")}
                  >
                    Tandai Dibaca
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={
                      busyId === selectedInquiry.id ||
                      selectedInquiry.status === "replied"
                    }
                    onClick={() =>
                      handleStatusChange(selectedInquiry, "replied")
                    }
                  >
                    Tandai Dibalas
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={
                      busyId === selectedInquiry.id ||
                      selectedInquiry.status === "archived"
                    }
                    onClick={() =>
                      handleStatusChange(selectedInquiry, "archived")
                    }
                  >
                    Arsipkan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

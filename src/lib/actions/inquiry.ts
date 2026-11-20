"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  hireInquirySchema,
  type HireInquiryFormValues,
} from "@/lib/validations/inquiry";
import type { ActionResponse, HireInquiry } from "@/types/portfolio";

export async function submitHireInquiryAction(
  values: HireInquiryFormValues
): Promise<ActionResponse<HireInquiry>> {
  const parsed = hireInquirySchema.safeParse(values);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message ?? "Formulir belum lengkap atau tidak valid.",
    };
  }

  const now = new Date();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceCode = `INQ-${now.getFullYear()}-${randomSuffix}`;

  const newInquiry: HireInquiry = {
    id: crypto.randomUUID(),
    reference_code: referenceCode,
    sender_name: parsed.data.sender_name,
    sender_email: parsed.data.sender_email,
    company: parsed.data.company,
    inquiry_type: parsed.data.inquiry_type,
    budget_or_comp: parsed.data.budget_or_comp,
    message: parsed.data.message,
    status: "unread",
    created_at: now.toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("inquiries")
        .insert({
          reference_code: newInquiry.reference_code,
          sender_name: newInquiry.sender_name,
          sender_email: newInquiry.sender_email,
          company: newInquiry.company,
          inquiry_type: newInquiry.inquiry_type,
          budget_or_comp: newInquiry.budget_or_comp,
          message: newInquiry.message,
          status: "unread",
        })
        .select("*")
        .single();

      if (error) {
        return {
          success: false,
          error: `Gagal menyimpan pesan ke database Supabase: ${error.message}`,
        };
      }

      revalidatePath("/admin");
      return {
        success: true,
        data: data as HireInquiry,
      };
    }
  }

  revalidatePath("/admin");
  return {
    success: true,
    data: newInquiry,
  };
}

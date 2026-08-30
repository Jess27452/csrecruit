"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { categories } from "@/lib/resource-data";
import { resourceSubmissionSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type FormData = z.input<typeof resourceSubmissionSchema>;

export function ResourceSubmitForm() {
  const { t, categoryName, subcategoryName } = useLanguage();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(resourceSubmissionSchema) });
  const selectedCategory = useWatch({ control, name: "category" });
  const subcategories = useMemo(() => categories.find((item) => item.name === selectedCategory)?.subcategories ?? [], [selectedCategory]);

  async function submit(values: FormData) {
    setMessage("");
    const supabase = createClient();
    if (!supabase) { setMessage("Submissions will be available when the community database is connected."); return; }
    const normalizedUrl = new URL(values.url).toString();
    const { data: duplicate } = await supabase.from("resources").select("id").eq("normalized_url", normalizedUrl).maybeSingle();
    if (duplicate) { setMessage("This resource has already been submitted."); return; }
    const { error } = await supabase.from("resources").insert({ slug: `${values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${crypto.randomUUID().slice(0, 6)}`, title: values.title, description: values.description, short_description: values.description, url: values.url, normalized_url: normalizedUrl, category: values.category, subcategory: values.subcategory, tags: values.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [], notes: values.notes || null, resource_format: "Website", visibility_status: "hidden", submitted_by: null, status: "pending" });
    if (error) { setMessage(error.code === "23505" ? "This resource has already been submitted." : "We couldn’t submit this resource. Please try again."); return; }
    setSuccess(true); reset();
  }

  if (success) return <div className="submission-success card"><span>✓</span><h2>{t("submittedThanks")}</h2><p>{t("submittedDetail")}</p><div><Link className="btn btn-primary" href="/resources">{t("browseResources")}</Link><button className="btn btn-secondary" onClick={() => setSuccess(false)}>{t("addAnother")}</button></div></div>;

  return <form className="submission-form card" onSubmit={handleSubmit(submit)}><div className="form-grid"><Field label={t("resourceName")} error={errors.title?.message}><input className="field" placeholder="e.g. NeetCode 150" {...register("title")} /></Field><Field label="URL" error={errors.url?.message}><input className="field" type="url" placeholder="https://" {...register("url")} /></Field><Field label={t("category")} error={errors.category?.message}><select className="field" {...register("category")}><option value="">{t("chooseCategory")}</option>{categories.map((item) => <option value={item.name} key={item.slug}>{categoryName(item.name)}</option>)}</select></Field><Field label={t("subcategory")} error={errors.subcategory?.message}><select className="field" {...register("subcategory")} disabled={!selectedCategory}><option value="">{t("chooseSubcategory")}</option>{subcategories.map((item) => <option value={item} key={item}>{subcategoryName(item)}</option>)}</select></Field></div><Field label={t("descriptionLabel")} error={errors.description?.message}><textarea className="field" placeholder={t("descriptionPlaceholder")} {...register("description")} /></Field><Field label={t("tags")} error={errors.tags?.message}><input className="field" placeholder={t("tagsPlaceholder")} {...register("tags")} /></Field><Field label={t("optionalNotes")} error={errors.notes?.message}><textarea className="field" placeholder={t("notesPlaceholder")} {...register("notes")} /></Field><div className="submission-note"><strong>{t("noAccountRequired")}</strong><p>{t("pendingNote")}</p></div>{message && <p role="alert" className="form-message">{message}</p>}<button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? t("submitting") : t("submitResource")}</button></form>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="field-label">{label}{children}{error && <span className="error">{error}</span>}</label>; }

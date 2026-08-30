"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function ResourceSubmitIntro() {
  const { t } = useLanguage();
  return <div className="submit-intro"><Link href="/resources"><ArrowLeft size={15} /> {t("backToResources")}</Link><span className="eyebrow">{t("communityContribution")}</span><h1>{t("shareResource")}</h1><p>{t("submitIntro")}</p></div>;
}

"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function ResourceLibraryHero() {
  const { t } = useLanguage();
  return <section className="library-hero"><div className="container"><div><span className="eyebrow">{t("communityLibrary")}</span><h1>{t("resources")}</h1><p>{t("resourceLibraryDescription")}</p></div><Link className="btn btn-primary" href="/resources/submit"><Plus size={16} /> {t("addResource")}</Link></div></section>;
}
